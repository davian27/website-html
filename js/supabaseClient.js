/**
 * Supabase Client & Helper Functions - SoftwareKatalog.id
 * Mendukung Upload Foto Hero & Sync Data Toko ke Supabase Cloud
 */

(function () {
  const STORAGE_KEY_URL = "sk_supabase_url";
  const STORAGE_KEY_ANON = "sk_supabase_anon_key";
  const STORAGE_KEY_HERO_URL = "sk_supabase_hero_url";

  // Pre-configured default credentials
  const DEFAULT_SUPABASE_URL = "https://yvtyhwpdatrenvriormq.supabase.co";
  const DEFAULT_SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dHlod3BkYXRyZW52cmlvcm1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwODI3NzcsImV4cCI6MjEwMzY1ODc3N30.ll2bJ_O1SpO8Bp71K74gh0Ad0QarosSWwVJRb2oqq4g";

  let supabaseClientInstance = null;

  function getSupabaseCredentials() {
    const url = localStorage.getItem(STORAGE_KEY_URL) || DEFAULT_SUPABASE_URL;
    const anonKey = localStorage.getItem(STORAGE_KEY_ANON) || DEFAULT_SUPABASE_ANON;
    return { url, anonKey };
  }

  function saveSupabaseCredentials(url, anonKey) {
    localStorage.setItem(STORAGE_KEY_URL, url.trim());
    localStorage.setItem(STORAGE_KEY_ANON, anonKey.trim());
    supabaseClientInstance = null;
  }

  function getSupabaseClient() {
    if (supabaseClientInstance) return supabaseClientInstance;
    
    const { url, anonKey } = getSupabaseCredentials();
    if (!url || !anonKey || typeof window.supabase === "undefined") {
      return null;
    }

    try {
      supabaseClientInstance = window.supabase.createClient(url, anonKey);
      return supabaseClientInstance;
    } catch (err) {
      console.warn("Gagal inisialisasi Supabase client:", err);
      return null;
    }
  }

  /**
   * Mendapatkan URL Hero Image aktif dari Supabase Storage Bucket ('katalog-assets')
   */
  async function getActiveHeroImageUrl() {
    const cachedUrl = localStorage.getItem(STORAGE_KEY_HERO_URL);
    const client = getSupabaseClient();

    if (!client) {
      return cachedUrl || "assets/hero.png?v=2";
    }

    try {
      // List file di bucket katalog-assets yang diurutkan berdasarkan waktu pembuatan terbaru
      const { data: fileList, error: listError } = await client.storage
        .from("katalog-assets")
        .list("", { sortBy: { column: "created_at", order: "desc" } });

      if (!listError && fileList && fileList.length > 0) {
        // Cari file gambar valid (abai folder/hidden file)
        const latestFile = fileList.find(f => f.name && !f.name.startsWith('.') && f.metadata);

        if (latestFile) {
          const { data: publicData } = client.storage
            .from("katalog-assets")
            .getPublicUrl(latestFile.name);

          if (publicData && publicData.publicUrl) {
            const timeTag = latestFile.updated_at ? new Date(latestFile.updated_at).getTime() : Date.now();
            const finalUrl = `${publicData.publicUrl}?t=${timeTag}`;
            localStorage.setItem(STORAGE_KEY_HERO_URL, finalUrl);
            return finalUrl;
          }
        }
      }
    } catch (err) {
      console.warn("Supabase storage list error, fallback to cache:", err);
    }

    return cachedUrl || "assets/hero.png?v=2";
  }

  /**
   * Kompress & resize file gambar agar pas dengan container web (max-width 1280px)
   */
  function compressImageFile(file, maxWidth = 1280, maxHeight = 800, quality = 0.85) {
    return new Promise((resolve) => {
      if (!file.type || !file.type.startsWith("image/") || file.size < 150 * 1024) {
        return resolve(file);
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], "hero-active.jpg", {
                type: "image/jpeg",
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          }, "image/jpeg", quality);
        };
        img.onerror = () => resolve(file);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Upload foto Hero baru ke Supabase Storage Bucket ('katalog-assets')
   */
  async function uploadHeroImageToSupabase(file) {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error("Supabase URL & Anon Key belum dikonfigurasi!");
    }

    // Kompress & pas-kan ukuran foto terlebih dahulu
    const fileToUpload = await compressImageFile(file);
    const ext = fileToUpload.name.split('.').pop() || 'jpg';
    const fileName = `hero-active.${ext}`;

    // Upload ke bucket 'katalog-assets' (upsert true untuk menimpa file lama)
    const { data: uploadData, error: uploadError } = await client.storage
      .from("katalog-assets")
      .upload(fileName, fileToUpload, {
        cacheControl: "0",
        upsert: true
      });

    if (uploadError) {
      console.error("Supabase Storage Upload Error:", uploadError);
      let tip = "\n\n(Pastikan Bucket 'katalog-assets' di Supabase sudah dibuat dengan centang Public Bucket)";
      if (uploadError.message && (uploadError.message.includes("row-level security") || uploadError.message.includes("policy"))) {
        tip = "\n\n(Izin Upload Supabase: Di Supabase Storage -> tab Policies -> katalog-assets, klik 'New Policy' -> pilih 'Allow All / Anonymous Upload' -> Save)";
      }
      throw new Error("Gagal mengunggah file ke Supabase Storage: " + uploadError.message + tip);
    }

    // Dapatkan Public URL
    const { data: publicUrlData } = client.storage
      .from("katalog-assets")
      .getPublicUrl(fileName);

    const publicUrl = `${publicUrlData.publicUrl}?v=${Date.now()}`;
    localStorage.setItem(STORAGE_KEY_HERO_URL, publicUrl);
    return publicUrl;
  }

  // Export to global scope
  window.skSupabase = {
    getCredentials: getSupabaseCredentials,
    saveCredentials: saveSupabaseCredentials,
    getClient: getSupabaseClient,
    getActiveHeroImageUrl: getActiveHeroImageUrl,
    uploadHeroImageToSupabase: uploadHeroImageToSupabase
  };
})();
