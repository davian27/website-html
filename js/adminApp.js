/**
 * Admin Panel Application Logic
 * Mengelola Autentikasi Login, Pengubahan Username & Password Admin, Content Management System (Hero, Katalog, FAQ, Testimoni).
 */

document.addEventListener("DOMContentLoaded", () => {
  // State Data & Credentials
  let siteConfigData = typeof getDynamicSiteConfig === "function" ? getDynamicSiteConfig() : {};
  let catalogData = typeof getDynamicCatalog === "function" ? getDynamicCatalog() : [];
  let testimonialsData = typeof getDynamicTestimonials === "function" ? getDynamicTestimonials() : [];
  let faqsData = typeof getDynamicFaqs === "function" ? getDynamicFaqs() : [];

  // Default Admin Credentials (dapat Diubah Dinamis)
  const defaultCreds = { username: "admin", password: "admin123" };
  let adminCreds = JSON.parse(localStorage.getItem("sk_admin_creds") || JSON.stringify(defaultCreds));

  // DOM Elements - Login & Auth
  const adminLoginModal = document.getElementById("adminLoginModal");
  const adminLoginForm = document.getElementById("adminLoginForm");
  const loginUsernameInput = document.getElementById("loginUsername");
  const loginPasswordInput = document.getElementById("loginPassword");
  const togglePasswordBtn = document.getElementById("togglePasswordBtn");
  const loginErrorAlert = document.getElementById("loginErrorAlert");
  const loginErrorMsg = document.getElementById("loginErrorMsg");
  const adminLogoutBtn = document.getElementById("adminLogoutBtn");

  // DOM Elements - Change Password Form
  const changePasswordForm = document.getElementById("changePasswordForm");
  const changeAdminUsername = document.getElementById("changeAdminUsername");
  const changeCurrentPassword = document.getElementById("changeCurrentPassword");
  const changeNewPassword = document.getElementById("changeNewPassword");
  const changeConfirmPassword = document.getElementById("changeConfirmPassword");

  // DOM Elements - Navigation & Toast
  const adminTabBtns = document.querySelectorAll(".admin-tab-btn");
  const adminTabContents = document.querySelectorAll(".admin-tab-content");
  const toastNotification = document.getElementById("toastNotification");
  const resetDefaultsBtn = document.getElementById("resetDefaultsBtn");

  // Forms
  const siteSettingsForm = document.getElementById("siteSettingsForm");
  const softwareTableBody = document.getElementById("softwareTableBody");
  const addSoftwareBtn = document.getElementById("addSoftwareBtn");
  const softwareModal = document.getElementById("softwareModal");
  const softwareModalCloseBtn = document.getElementById("softwareModalCloseBtn");
  const softwareEditForm = document.getElementById("softwareEditForm");

  const testiForm = document.getElementById("testiForm");
  const testimonialsAdminList = document.getElementById("testimonialsAdminList");

  const faqForm = document.getElementById("faqForm");
  const faqAdminList = document.getElementById("faqAdminList");

  // Initialize
  checkAuthSession();
  initTheme();
  populateSiteSettingsForm();
  renderSoftwareTable();
  renderTestimonialsAdmin();
  renderFaqsAdmin();
  setupEventListeners();

  /* ==========================================
     Authentication System
     ========================================== */
  function checkAuthSession() {
    const isAuthSession = sessionStorage.getItem("sk_admin_authenticated");
    const isAuthLocal = localStorage.getItem("sk_admin_authenticated");
    
    if (isAuthSession === "true" || isAuthLocal === "true") {
      if (adminLoginModal) adminLoginModal.classList.remove("active");
      if (adminLogoutBtn) adminLogoutBtn.style.display = "inline-flex";
    } else {
      if (adminLoginModal) adminLoginModal.classList.add("active");
      if (adminLogoutBtn) adminLogoutBtn.style.display = "none";
    }
  }

  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const userVal = loginUsernameInput.value.trim();
      const passVal = loginPasswordInput.value.trim();
      const rememberMe = document.getElementById("rememberMe") ? document.getElementById("rememberMe").checked : false;

      // Ambil kredensial admin terbaru dari LocalStorage
      const currentCreds = JSON.parse(localStorage.getItem("sk_admin_creds") || JSON.stringify(defaultCreds));

      if (userVal === currentCreds.username && passVal === currentCreds.password) {
        // Login Berhasil
        if (loginErrorAlert) loginErrorAlert.style.display = "none";
        
        if (rememberMe) {
          localStorage.setItem("sk_admin_authenticated", "true");
        } else {
          sessionStorage.setItem("sk_admin_authenticated", "true");
        }

        if (adminLoginModal) adminLoginModal.classList.remove("active");
        if (adminLogoutBtn) adminLogoutBtn.style.display = "inline-flex";
        showToast("🔑 Login Berhasil! Selamat Datang Admin.");
      } else {
        // Login Gagal
        if (loginErrorAlert) {
          loginErrorAlert.style.display = "block";
          loginErrorMsg.textContent = "Username atau Password yang Anda masukkan salah!";
        }
      }
    });
  }

  // Password Visibility Toggle
  if (togglePasswordBtn && loginPasswordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const type = loginPasswordInput.getAttribute("type") === "password" ? "text" : "password";
      loginPasswordInput.setAttribute("type", type);
      const icon = togglePasswordBtn.querySelector("i");
      icon.className = type === "password" ? "fa-solid fa-eye" : "fa-solid fa-eye-slash";
    });
  }

  // Logout Handler
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener("click", () => {
      if (confirm("Apakah Anda yakin ingin keluar dari Panel Admin?")) {
        sessionStorage.removeItem("sk_admin_authenticated");
        localStorage.removeItem("sk_admin_authenticated");
        if (adminLoginModal) adminLoginModal.classList.add("active");
        adminLogoutBtn.style.display = "none";
        showToast("Anda telah keluar dari Panel Admin.");
      }
    });
  }

  /* ==========================================
     Ubah Username & Password Admin
     ========================================== */
  if (changePasswordForm) {
    if (changeAdminUsername) {
      changeAdminUsername.value = adminCreds.username || "admin";
    }

    changePasswordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newUsername = changeAdminUsername.value.trim();
      const currentPass = changeCurrentPassword.value.trim();
      const newPass = changeNewPassword.value.trim();
      const confirmPass = changeConfirmPassword.value.trim();

      const savedCreds = JSON.parse(localStorage.getItem("sk_admin_creds") || JSON.stringify(defaultCreds));

      if (currentPass !== savedCreds.password) {
        alert("❌ Password saat ini yang Anda masukkan salah!");
        return;
      }

      if (newPass !== confirmPass) {
        alert("❌ Password Baru dan Konfirmasi Password tidak sama!");
        return;
      }

      if (newPass.length < 4) {
        alert("❌ Password baru minimal harus 4 karakter!");
        return;
      }

      // Simpan kredensial baru ke LocalStorage
      adminCreds = {
        username: newUsername,
        password: newPass
      };
      localStorage.setItem("sk_admin_creds", JSON.stringify(adminCreds));

      changeCurrentPassword.value = "";
      changeNewPassword.value = "";
      changeConfirmPassword.value = "";

      showToast("🔐 Username & Password Admin berhasil diperbarui!");
    });
  }

  /* ==========================================
     Theme Controller
     ========================================== */
  function initTheme() {
    const savedTheme = localStorage.getItem("sk_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      const icon = themeBtn.querySelector("i");
      icon.className = savedTheme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun";
      themeBtn.addEventListener("click", () => {
        const cur = document.documentElement.getAttribute("data-theme");
        const next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("sk_theme", next);
        icon.className = next === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun";
      });
    }
  }

  /* ==========================================
     Toast Notification Helper
     ========================================== */
  function showToast(msg) {
    if (!toastNotification) return;
    toastNotification.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
    toastNotification.classList.add("show");
    setTimeout(() => {
      toastNotification.classList.remove("show");
    }, 3000);
  }

  /* ==========================================
     TAB 1: Site Settings & Hero Section
     ========================================== */
  function populateSiteSettingsForm() {
    if (!siteSettingsForm) return;
    const cfg = siteConfigData;
    document.getElementById("cfgStoreName").value = cfg.storeName || "";
    document.getElementById("cfgWhatsappNumber").value = cfg.whatsappNumber || "";
    document.getElementById("cfgSupportEmail").value = cfg.supportEmail || "";

    document.getElementById("cfgHeroBadge").value = cfg.heroBadge || "";
    document.getElementById("cfgHeroTitlePrefix").value = cfg.heroTitlePrefix || "";
    document.getElementById("cfgHeroTitleHighlight").value = cfg.heroTitleHighlight || "";
    document.getElementById("cfgHeroTitleSuffix").value = cfg.heroTitleSuffix || "";
    document.getElementById("cfgHeroDesc").value = cfg.heroDesc || "";

    document.getElementById("cfgStatUsers").value = cfg.statUsers || "";
    document.getElementById("cfgStatLicense").value = cfg.statLicense || "";
    document.getElementById("cfgStatRating").value = cfg.statRating || "";
  }

  if (siteSettingsForm) {
    siteSettingsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      siteConfigData.storeName = document.getElementById("cfgStoreName").value.trim();
      siteConfigData.whatsappNumber = document.getElementById("cfgWhatsappNumber").value.trim();
      siteConfigData.supportEmail = document.getElementById("cfgSupportEmail").value.trim();

      siteConfigData.heroBadge = document.getElementById("cfgHeroBadge").value.trim();
      siteConfigData.heroTitlePrefix = document.getElementById("cfgHeroTitlePrefix").value;
      siteConfigData.heroTitleHighlight = document.getElementById("cfgHeroTitleHighlight").value;
      siteConfigData.heroTitleSuffix = document.getElementById("cfgHeroTitleSuffix").value;
      siteConfigData.heroDesc = document.getElementById("cfgHeroDesc").value.trim();

      siteConfigData.statUsers = document.getElementById("cfgStatUsers").value.trim();
      siteConfigData.statLicense = document.getElementById("cfgStatLicense").value.trim();
      siteConfigData.statRating = document.getElementById("cfgStatRating").value.trim();

      if (typeof saveDynamicSiteConfig === "function") {
        saveDynamicSiteConfig(siteConfigData);
      }
      showToast("Pengaturan Hero & Informasi Toko berhasil diperbarui!");
    });
  }

  /* ==========================================
     TAB 2: Katalog Software Management (CRUD)
     ========================================== */
  function renderSoftwareTable() {
    if (!softwareTableBody) return;
    softwareTableBody.innerHTML = catalogData.map(item => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(59,130,246,0.15); color: ${item.accentColor || '#3b82f6'}; display: flex; align-items: center; justify-content: center;">
              <i class="fa-solid ${item.icon || 'fa-calculator'}"></i>
            </div>
            <div>
              <strong style="display: block; color: var(--text-primary);">${item.title}</strong>
              <span style="font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">${item.category}</span>
            </div>
          </div>
        </td>
        <td><span class="badge-tag">${item.badge || 'Unggulan'}</span></td>
        <td>Rp ${item.prices && item.prices.standard ? item.prices.standard.price : '750.000'}</td>
        <td>Rp ${item.prices && item.prices.pro ? item.prices.pro.price : '1.490.000'}</td>
        <td>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn-secondary edit-sw-btn" data-id="${item.id}" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">
              <i class="fa-solid fa-pen"></i> Edit
            </button>
            <button class="btn-secondary delete-sw-btn" data-id="${item.id}" style="padding: 0.35rem 0.75rem; font-size: 0.8rem; border-color: var(--accent-rose); color: var(--accent-rose);">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join("");

    document.querySelectorAll(".edit-sw-btn").forEach(btn => {
      btn.addEventListener("click", () => openSoftwareModal(btn.getAttribute("data-id")));
    });
    document.querySelectorAll(".delete-sw-btn").forEach(btn => {
      btn.addEventListener("click", () => deleteSoftware(btn.getAttribute("data-id")));
    });
  }

  function openSoftwareModal(swId = null) {
    if (!softwareModal) return;
    const titleEl = document.getElementById("softwareModalTitle");
    if (swId) {
      const item = catalogData.find(s => s.id === swId);
      if (!item) return;
      titleEl.textContent = "Edit Software: " + item.title;
      document.getElementById("swId").value = item.id;
      document.getElementById("swTitle").value = item.title;
      document.getElementById("swCategory").value = item.category;
      document.getElementById("swTagline").value = item.tagline;
      document.getElementById("swBadge").value = item.badge || "";
      document.getElementById("swDescription").value = item.description;
      document.getElementById("swPriceStandard").value = item.prices.standard.price;
      document.getElementById("swPricePro").value = item.prices.pro.price;
      document.getElementById("swPriceEnterprise").value = item.prices.enterprise.price;
    } else {
      titleEl.textContent = "Tambah Software Baru";
      softwareEditForm.reset();
      document.getElementById("swId").value = "";
    }
    softwareModal.classList.add("active");
  }

  function closeSoftwareModal() {
    if (softwareModal) softwareModal.classList.remove("active");
  }

  if (addSoftwareBtn) addSoftwareBtn.addEventListener("click", () => openSoftwareModal(null));
  if (softwareModalCloseBtn) softwareModalCloseBtn.addEventListener("click", closeSoftwareModal);

  if (softwareEditForm) {
    softwareEditForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("swId").value;
      const title = document.getElementById("swTitle").value.trim();
      const category = document.getElementById("swCategory").value;
      const tagline = document.getElementById("swTagline").value.trim();
      const badge = document.getElementById("swBadge").value.trim() || "Rekomendasi";
      const description = document.getElementById("swDescription").value.trim();
      const pStd = document.getElementById("swPriceStandard").value.trim();
      const pPro = document.getElementById("swPricePro").value.trim();
      const pEnt = document.getElementById("swPriceEnterprise").value.trim();

      if (id) {
        const sw = catalogData.find(s => s.id === id);
        if (sw) {
          sw.title = title;
          sw.category = category;
          sw.tagline = tagline;
          sw.badge = badge;
          sw.description = description;
          sw.prices.standard.price = pStd;
          sw.prices.pro.price = pPro;
          sw.prices.enterprise.price = pEnt;
        }
      } else {
        const newSw = {
          id: "sw-custom-" + Date.now(),
          title: title,
          tagline: tagline,
          category: category,
          badge: badge,
          rating: 5.0,
          reviewsCount: 1,
          accentColor: "#3b82f6",
          themeGradient: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(147,51,234,0.1))",
          icon: "fa-box-open",
          image: "assets/hero.png",
          description: description,
          prices: {
            standard: { label: "Standard Desktop", price: pStd, period: "Sekali Bayar (Lifetime)", note: "1 PC Kasir" },
            pro: { label: "Pro Multi-PC", price: pPro, period: "Sekali Bayar (Lifetime)", note: "Multi PC LAN" },
            enterprise: { label: "Enterprise Cloud", price: pEnt, period: "Sekali Bayar (Lifetime)", note: "Unlimited PC & Cloud" }
          },
          features: [
            { title: "Fitur Transaksi Cepat", desc: "Mendukung scan barcode dan cetak struk thermal.", icon: "fa-bolt" },
            { title: "Manajemen Stok Otomatis", desc: "Melacak stok masuk dan keluar secara realtime.", icon: "fa-boxes-stacked" },
            { title: "Laporan Keuangan", desc: "Grafik omset dan laporan laba bersih.", icon: "fa-chart-line" }
          ],
          specs: [
            { label: "Sistem Operasi", val: "Windows 10 / 11" },
            { label: "Framework", val: ".NET 8 Desktop" }
          ]
        };
        catalogData.unshift(newSw);
      }

      if (typeof saveDynamicCatalog === "function") {
        saveDynamicCatalog(catalogData);
      }
      closeSoftwareModal();
      renderSoftwareTable();
      showToast("Data katalog software berhasil diperbarui!");
    });
  }

  function deleteSoftware(id) {
    if (confirm("Apakah Anda yakin ingin menghapus software ini dari katalog?")) {
      catalogData = catalogData.filter(s => s.id !== id);
      if (typeof saveDynamicCatalog === "function") {
        saveDynamicCatalog(catalogData);
      }
      renderSoftwareTable();
      showToast("Software berhasil dihapus!");
    }
  }

  /* ==========================================
     TAB 3: Testimoni Pelanggan
     ========================================== */
  function renderTestimonialsAdmin() {
    if (!testimonialsAdminList) return;
    testimonialsAdminList.innerHTML = testimonialsData.map(t => `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 0.85rem; display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <strong style="color: var(--text-primary); display: block;">${t.author}</strong>
          <span style="font-size: 0.8rem; color: var(--accent-cyan); display: block;">${t.role}</span>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.4rem;">"${t.quote}"</p>
        </div>
        <button class="btn-secondary delete-testi-btn" data-id="${t.id}" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; border-color: var(--accent-rose); color: var(--accent-rose);">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `).join("");

    document.querySelectorAll(".delete-testi-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        testimonialsData = testimonialsData.filter(x => x.id !== id);
        if (typeof saveDynamicTestimonials === "function") saveDynamicTestimonials(testimonialsData);
        renderTestimonialsAdmin();
        showToast("Testimoni dihapus!");
      });
    });
  }

  if (testiForm) {
    testiForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const author = document.getElementById("testiAuthor").value.trim();
      const role = document.getElementById("testiRole").value.trim();
      const rating = parseInt(document.getElementById("testiRating").value);
      const quote = document.getElementById("testiQuote").value.trim();

      const newTesti = {
        id: "testi-custom-" + Date.now(),
        author, role, rating, quote
      };

      testimonialsData.unshift(newTesti);
      if (typeof saveDynamicTestimonials === "function") saveDynamicTestimonials(testimonialsData);
      testiForm.reset();
      renderTestimonialsAdmin();
      showToast("Testimoni baru berhasil ditambahkan!");
    });
  }

  /* ==========================================
     TAB 4: FAQ Management
     ========================================== */
  function renderFaqsAdmin() {
    if (!faqAdminList) return;
    faqAdminList.innerHTML = faqsData.map(f => `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 0.85rem; display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <strong style="color: var(--accent-blue); display: block;">${f.question}</strong>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.4rem;">${f.answer}</p>
        </div>
        <button class="btn-secondary delete-faq-btn" data-id="${f.id}" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; border-color: var(--accent-rose); color: var(--accent-rose);">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `).join("");

    document.querySelectorAll(".delete-faq-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        faqsData = faqsData.filter(x => x.id !== id);
        if (typeof saveDynamicFaqs === "function") saveDynamicFaqs(faqsData);
        renderFaqsAdmin();
        showToast("FAQ dihapus!");
      });
    });
  }

  if (faqForm) {
    faqForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const question = document.getElementById("faqQuestion").value.trim();
      const answer = document.getElementById("faqAnswer").value.trim();

      const newFaq = {
        id: "faq-custom-" + Date.now(),
        question, answer
      };

      faqsData.push(newFaq);
      if (typeof saveDynamicFaqs === "function") saveDynamicFaqs(faqsData);
      faqForm.reset();
      renderFaqsAdmin();
      showToast("FAQ baru berhasil ditambahkan!");
    });
  }

  /* ==========================================
     Reset All Content Event Handler
     ========================================== */
  if (resetDefaultsBtn) {
    resetDefaultsBtn.addEventListener("click", () => {
      if (confirm("Apakah Anda yakin ingin mengembalikan seluruh isi teks, katalog, testimoni & FAQ ke versi standar awal? Semua perubahan di Admin Panel akan direset.")) {
        if (typeof resetAllDataToDefault === "function") resetAllDataToDefault();
        location.reload();
      }
    });
  }

  /* ==========================================
     Tab Navigation Setup
     ========================================== */
  function setupEventListeners() {
    adminTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        adminTabBtns.forEach(b => b.classList.remove("active"));
        adminTabContents.forEach(c => c.style.display = "none");

        btn.classList.add("active");
        const targetTab = btn.getAttribute("data-tab");
        const targetEl = document.getElementById(targetTab);
        if (targetEl) targetEl.style.display = "block";
      });
    });
  }
});
