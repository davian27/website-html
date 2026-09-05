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
    supabaseClientInstance = null; // reset instance so it re-initializes
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
   * Mendapatkan URL Hero Image aktif dari Supabase / LocalCache / Fallback
   */
  async function getActiveHeroImageUrl() {
    const cachedUrl = localStorage.getItem(STORAGE_KEY_HERO_URL);
    
    const client = getSupabaseClient();
    if (!client) {
      return cachedUrl || "assets/hero.png?v=2";
    }

    try {
      // 1. Coba baca dari tabel site_settings jika ada
      const { data, error } = await client
        .from("site_settings")
        .select("value")
        .eq("key", "hero_image_url")
        .single();

      if (!error && data && data.value) {
        localStorage.setItem(STORAGE_KEY_HERO_URL, data.value);
        return data.value;
      }

      // 2. Jika tidak ada di tabel, cek file public dari Storage Bucket 'katalog-assets'
      const { data: publicData } = client.storage.from("katalog-assets").getPublicUrl("hero-active.png");
      if (publicData && publicData.publicUrl) {
        return publicData.publicUrl;
      }
    } catch (err) {
      console.warn("Supabase fetch error, fallback to cache:", err);
    }

    return cachedUrl || "assets/hero.png?v=2";
  }

  /**
   * Upload foto Hero baru ke Supabase Storage Bucket ('katalog-assets')
   */
  async function uploadHeroImageToSupabase(file) {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error("Supabase URL & Anon Key belum dikonfigurasi!");
    }

    // Nama file unik dengan timestamp
    const ext = file.name.split('.').pop() || 'png';
    const fileName = `hero-${Date.now()}.${ext}`;

    // Upload ke bucket 'katalog-assets'
    const { data: uploadData, error: uploadError } = await client.storage
      .from("katalog-assets")
      .upload(fileName, file, {
        cacheControl: "3600",
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

    const publicUrl = publicUrlData.publicUrl;

    // Simpan URL ke tabel site_settings (upsert jika ada tabel)
    try {
      await client.from("site_settings").upsert({
        key: "hero_image_url",
        value: publicUrl,
        updated_at: new Date().toISOString()
      }, { onConflict: "key" });
    } catch (e) {
      console.warn("Upsert site_settings warning:", e);
    }

    // Simpan ke local cache juga
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
