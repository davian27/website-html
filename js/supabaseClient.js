/**
 * Supabase Client & Helper Functions - SoftwareKatalog.id
 * Mendukung Upload Foto Hero, Image Slider & Sync Data Toko ke Supabase Cloud
 */

(function () {
  const STORAGE_KEY_URL = "sk_supabase_url";
  const STORAGE_KEY_ANON = "sk_supabase_anon_key";
  const STORAGE_KEY_HERO_URL = "sk_supabase_hero_url";
  const STORAGE_KEY_HERO_SLIDES = "sk_hero_slides_cache";

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
              const compressedFile = new File([blob], "slide.jpg", {
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
   * Mendapatkan daftar URL Hero Slides dari Supabase Storage Bucket ('katalog-assets')
   */
  async function getHeroSlidesFromSupabase() {
    const client = getSupabaseClient();
    const fallback = [{ id: "default", name: "hero.png", url: "assets/hero.png?v=2" }];

    if (!client) {
      const cached = localStorage.getItem(STORAGE_KEY_HERO_SLIDES);
      return cached ? JSON.parse(cached) : fallback;
    }

    try {
      const { data: fileList, error: listError } = await client.storage
        .from("katalog-assets")
        .list("", { sortBy: { column: "created_at", order: "desc" } });

      if (!listError && fileList && fileList.length > 0) {
        const validFiles = fileList.filter(f => f.name && !f.name.startsWith('.') && f.metadata);

        if (validFiles.length > 0) {
          const slides = validFiles.map((file, idx) => {
            const { data: publicData } = client.storage
              .from("katalog-assets")
              .getPublicUrl(file.name);
            
            const timeTag = file.updated_at ? new Date(file.updated_at).getTime() : Date.now();
            return {
              id: file.id || `slide-${idx}-${file.name}`,
              name: file.name,
              url: `${publicData.publicUrl}?t=${timeTag}`
            };
          });

          localStorage.setItem(STORAGE_KEY_HERO_SLIDES, JSON.stringify(slides));
          return slides;
        }
      }
    } catch (err) {
      console.warn("Supabase hero slides fetch error, fallback to cache:", err);
    }

    const cached = localStorage.getItem(STORAGE_KEY_HERO_SLIDES);
    return cached ? JSON.parse(cached) : fallback;
  }

  /**
   * Upload foto Hero Slide baru ke Supabase Storage Bucket ('katalog-assets')
   */
  async function uploadHeroSlideToSupabase(file) {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error("Supabase URL & Anon Key belum dikonfigurasi!");
    }

    const fileToUpload = await compressImageFile(file);
    const fileName = `hero-slide-${Date.now()}.jpg`;

    const { data: uploadData, error: uploadError } = await client.storage
      .from("katalog-assets")
      .upload(fileName, fileToUpload, {
        cacheControl: "3600",
        upsert: true
      });

    if (uploadError) {
      console.error("Supabase Storage Upload Error:", uploadError);
      let tip = "\n\n(Pastikan Bucket 'katalog-assets' di Supabase sudah dibuat dengan centang Public Bucket)";
      if (uploadError.message && (uploadError.message.includes("row-level security") || uploadError.message.includes("policy"))) {
        tip = "\n\n(Izin Upload Supabase: Di Supabase Storage -> tab Policies -> katalog-assets, klik 'New Policy' -> pilih 'Allow All / Anonymous Upload' -> Save)";
      }
      throw new Error("Gagal mengunggah slide ke Supabase Storage: " + uploadError.message + tip);
    }

    return await getHeroSlidesFromSupabase();
  }

  /**
   * Hapus foto Hero Slide dari Supabase Storage Bucket ('katalog-assets')
   */
  async function deleteHeroSlideFromSupabase(fileName) {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error("Supabase URL & Anon Key belum dikonfigurasi!");
    }

    const { error: deleteError } = await client.storage
      .from("katalog-assets")
      .remove([fileName]);

    if (deleteError) {
      console.error("Supabase Storage Delete Error:", deleteError);
      let tip = "";
      if (deleteError.message && (deleteError.message.includes("policy") || deleteError.message.includes("security") || deleteError.statusCode === "42501")) {
        tip = "\n\n(Izin Hapus Supabase: Buka Supabase Storage -> Policies -> katalog-assets -> edit policy Anda dan centang opsi 'DELETE' -> Save)";
      }
      throw new Error("Gagal menghapus slide dari Supabase Storage: " + deleteError.message + tip);
    }

    return await getHeroSlidesFromSupabase();
  }

  /**
   * Upload foto Software Thumbnail/Cover ke Supabase Storage Bucket ('katalog-assets')
   */
  async function uploadSoftwareImageToSupabase(file) {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error("Supabase URL & Anon Key belum dikonfigurasi!");
    }

    const fileToUpload = await compressImageFile(file, 1000, 600, 0.85);
    const fileName = `sw-thumb-${Date.now()}.jpg`;

    const { data: uploadData, error: uploadError } = await client.storage
      .from("katalog-assets")
      .upload(fileName, fileToUpload, {
        cacheControl: "3600",
        upsert: true
      });

    if (uploadError) {
      console.error("Supabase Software Upload Error:", uploadError);
      throw new Error("Gagal mengunggah gambar software: " + uploadError.message);
    }

    const { data: publicUrlData } = client.storage
      .from("katalog-assets")
      .getPublicUrl(fileName);

    return `${publicUrlData.publicUrl}?v=${Date.now()}`;
  }

  // Export to global scope
  window.skSupabase = {
    getCredentials: getSupabaseCredentials,
    saveCredentials: saveSupabaseCredentials,
    getClient: getSupabaseClient,
    getHeroSlides: getHeroSlidesFromSupabase,
    uploadHeroSlide: uploadHeroSlideToSupabase,
    deleteHeroSlide: deleteHeroSlideFromSupabase,
    uploadSoftwareImage: uploadSoftwareImageToSupabase
  };
})();
