/**
 * Application Logic - SoftwareKatalog.id
 * Mendukung rendering dinamis dari LocalStorage (Admin Panel)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Application State
  let currentCategory = "all";
  let searchQuery = "";
  let activeSoftware = null;

  // Fetch Dynamic Data
  const currentSiteConfig = typeof getDynamicSiteConfig === "function" ? getDynamicSiteConfig() : siteConfig;
  const currentCatalog = typeof getDynamicCatalog === "function" ? getDynamicCatalog() : softwareCatalog;
  const currentTestimonials = typeof getDynamicTestimonials === "function" ? getDynamicTestimonials() : [];
  const currentFaqs = typeof getDynamicFaqs === "function" ? getDynamicFaqs() : [];

  // DOM Elements
  const productsGrid = document.getElementById("productsGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("searchInput");
  const searchClearBtn = document.getElementById("searchClearBtn");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const modalBackdrop = document.getElementById("productModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const guaranteeGrid = document.getElementById("guaranteeGrid");
  const testimonialsGrid = document.getElementById("testimonialsGrid");
  const faqWrapper = document.getElementById("faqWrapper");
  
  // Modal Elements
  const modalTitle = document.getElementById("modalTitle");
  const modalCategoryBadge = document.getElementById("modalCategoryBadge");
  const modalIcon = document.getElementById("modalIcon");
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const featuresDetailGrid = document.getElementById("featuresDetailGrid");
  const specsTableBody = document.getElementById("specsTableBody");
  const pricingGrid = document.getElementById("pricingGrid");
  const modalWaBtn = document.getElementById("modalWaBtn");

  // Initialize App
  initTheme();
  renderDynamicHeroAndSiteConfig();
  renderGuarantees();
  renderProducts();
  renderTestimonials();
  renderFaqs();
  setupEventListeners();

  /* ==========================================
     Theme Controller
     ========================================== */
  function initTheme() {
    const savedTheme = localStorage.getItem("sk_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector("i");
    if (theme === "light") {
      icon.className = "fa-solid fa-moon";
    } else {
      icon.className = "fa-solid fa-sun";
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("sk_theme", next);
      updateThemeIcon(next);
    });
  }

  /* ==========================================
     Render Dynamic Hero & Site Config
     ========================================== */
  function renderDynamicHeroAndSiteConfig() {
    const cfg = currentSiteConfig;

    // Update Store Name & WhatsApp links
    document.querySelectorAll(".site-store-name").forEach(el => el.textContent = cfg.storeName);
    document.querySelectorAll(".site-wa-link").forEach(el => {
      el.href = `https://wa.me/${cfg.whatsappNumber}?text=Halo%20Admin%20${encodeURIComponent(cfg.storeName)},%20saya%20tertarik%20dengan%20software%20katalog%20Anda`;
    });

    // Update Hero elements if present
    const heroBadge = document.getElementById("heroBadgeText");
    const heroTitle = document.getElementById("heroTitleText");
    const heroDesc = document.getElementById("heroDescText");
    const statUsers = document.getElementById("statUsers");
    const statLicense = document.getElementById("statLicense");
    const statRating = document.getElementById("statRating");

    if (heroBadge) heroBadge.innerHTML = `<i class="fa-solid fa-sparkles"></i> ${cfg.heroBadge}`;
    if (heroTitle) heroTitle.innerHTML = `${cfg.heroTitlePrefix}<span>${cfg.heroTitleHighlight}</span>${cfg.heroTitleSuffix}`;
    if (heroDesc) heroDesc.textContent = cfg.heroDesc;
    if (statUsers) statUsers.textContent = cfg.statUsers;
    if (statLicense) statLicense.textContent = cfg.statLicense;
    if (statRating) statRating.textContent = cfg.statRating;

    // Render Hero Slideshow from Supabase Cloud / Cache
    if (window.skSupabase && typeof window.skSupabase.getHeroSlides === "function") {
      window.skSupabase.getHeroSlides().then(slides => {
        const heroCard = document.getElementById("heroImageCard");
        if (!heroCard || !slides || slides.length === 0) return;

        if (slides.length === 1) {
          heroCard.innerHTML = `<img src="${slides[0].url}" alt="Showcase Software Kasir & ERP" class="hero-img" onerror="this.onerror=null; this.src='assets/hero.png?v=2';">`;
          return;
        }

        let currentIndex = 0;
        let slideTimer = null;

        const slidesHTML = slides.map((slide, i) => `
          <div class="hero-slide-item ${i === 0 ? 'active' : ''}">
            <img src="${slide.url}" alt="Slide ${i + 1}" onerror="this.onerror=null; this.src='assets/hero.png?v=2';">
          </div>
        `).join('');

        const dotsHTML = slides.map((_, i) => `
          <span class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
        `).join('');

        heroCard.innerHTML = `
          <div class="hero-slider-wrapper">
            ${slidesHTML}
          </div>
          <button class="slider-nav-btn prev" id="sliderPrevBtn" aria-label="Slide Sebelum"><i class="fa-solid fa-chevron-left"></i></button>
          <button class="slider-nav-btn next" id="sliderNextBtn" aria-label="Slide Selanjutnya"><i class="fa-solid fa-chevron-right"></i></button>
          <div class="slider-dots-container">
            ${dotsHTML}
          </div>
        `;

        const slideItems = heroCard.querySelectorAll(".hero-slide-item");
        const dotItems = heroCard.querySelectorAll(".slider-dot");
        const prevBtn = heroCard.querySelector("#sliderPrevBtn");
        const nextBtn = heroCard.querySelector("#sliderNextBtn");

        function goToSlide(index) {
          slideItems.forEach(item => item.classList.remove("active"));
          dotItems.forEach(dot => dot.classList.remove("active"));

          currentIndex = (index + slides.length) % slides.length;
          if (slideItems[currentIndex]) slideItems[currentIndex].classList.add("active");
          if (dotItems[currentIndex]) dotItems[currentIndex].classList.add("active");
        }

        function startAutoPlay() {
          stopAutoPlay();
          slideTimer = setInterval(() => {
            goToSlide(currentIndex + 1);
          }, 4500);
        }

        function stopAutoPlay() {
          if (slideTimer) clearInterval(slideTimer);
        }

        if (prevBtn) prevBtn.addEventListener("click", () => { goToSlide(currentIndex - 1); startAutoPlay(); });
        if (nextBtn) nextBtn.addEventListener("click", () => { goToSlide(currentIndex + 1); startAutoPlay(); });

        dotItems.forEach(dot => {
          dot.addEventListener("click", (e) => {
            const idx = parseInt(e.target.getAttribute("data-index"), 10);
            goToSlide(idx);
            startAutoPlay();
          });
        });

        heroCard.addEventListener("mouseenter", stopAutoPlay);
        heroCard.addEventListener("mouseleave", startAutoPlay);

        startAutoPlay();
      }).catch(err => console.warn("Hero slides load error:", err));
    }
  }

  /* ==========================================
     Render Guarantees Bar
     ========================================== */
  function renderGuarantees() {
    if (!guaranteeGrid || !currentSiteConfig.guarantees) return;
    guaranteeGrid.innerHTML = currentSiteConfig.guarantees.map(g => `
      <div class="guarantee-item">
        <div class="guarantee-icon"><i class="fa-solid ${g.icon}"></i></div>
        <div>
          <div class="guarantee-title">${g.title}</div>
          <div class="guarantee-desc">${g.desc}</div>
        </div>
      </div>
    `).join("");
  }

  /* ==========================================
     Render Product Cards
     ========================================== */
  function renderProducts() {
    if (!productsGrid) return;

    // Filter software by category and search query
    const filtered = currentCatalog.filter(item => {
      const matchesCat = currentCategory === "all" || item.category === currentCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (item.features && item.features.some(f => f.title.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;">
            <i class="fa-solid fa-folder-open"></i>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Tidak Ada Software Ditemukan</h3>
          <p style="color: var(--text-secondary);">Coba sesuaikan kata kunci pencarian atau pilih kategori lain.</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(item => `
      <div class="product-card" data-id="${item.id}">
        <div class="card-header-banner" style="background-image: url('${item.image || 'assets/hero.png'}'); background-blend-mode: overlay; background-color: rgba(11,15,25,0.7);">
          <div class="card-overlay"></div>
          <div class="card-header-content">
            <span class="badge-tag">${item.badge || 'Unggulan'}</span>
            <span class="rating-tag"><i class="fa-solid fa-star"></i> ${item.rating || 5.0} (${item.reviewsCount || 50})</span>
          </div>
          <div style="position: relative; z-index: 2; display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: ${item.themeGradient || 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(147,51,234,0.1))'}; border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; color: ${item.accentColor || '#3b82f6'}; font-size: 1.25rem;">
              <i class="fa-solid ${item.icon || 'fa-calculator'}"></i>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: rgba(255,255,255,0.7); font-weight: 600; text-transform: uppercase;">LISENSI SEKALIBAYAR</span>
              <h4 style="color: #fff; font-size: 0.95rem; font-weight: 700;">Lifetime License</h4>
            </div>
          </div>
        </div>
        
        <div class="card-body">
          <h3 class="card-title">${item.title}</h3>
          <div class="card-tagline">${item.tagline}</div>
          <p class="card-desc">${item.description}</p>
          
          <div class="card-features-mini">
            ${item.features ? item.features.slice(0, 3).map(f => `
              <span class="feature-mini-pill"><i class="fa-solid ${f.icon || 'fa-check'}" style="color: ${item.accentColor || '#3b82f6'};"></i> ${f.title}</span>
            `).join("") : ""}
          </div>

          <div class="card-footer">
            <div class="price-box">
              <span class="price-label">Harga Mulai</span>
              <div class="price-val">Rp ${item.prices && item.prices.standard ? item.prices.standard.price : '750.000'} <span>/ Sekali</span></div>
            </div>
            <button class="btn-primary view-details-btn" data-id="${item.id}" style="padding: 0.5rem 1.1rem; font-size: 0.85rem;">
              Lihat Fitur <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `).join("");

    // Bind Click handlers
    document.querySelectorAll(".view-details-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openModal(btn.getAttribute("data-id"));
      });
    });

    document.querySelectorAll(".product-card").forEach(card => {
      card.addEventListener("click", () => {
        openModal(card.getAttribute("data-id"));
      });
    });
  }

  /* ==========================================
     Render Testimonials
     ========================================== */
  function renderTestimonials() {
    if (!testimonialsGrid || !currentTestimonials.length) return;
    testimonialsGrid.innerHTML = currentTestimonials.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-stars">
          ${Array(t.rating || 5).fill('<i class="fa-solid fa-star"></i>').join("")}
        </div>
        <p class="testimonial-quote">"${t.quote}"</p>
        <div class="testimonial-author">
          <div class="author-avatar">${t.author.charAt(0)}</div>
          <div>
            <div class="author-name">${t.author}</div>
            <div class="author-role">${t.role}</div>
          </div>
        </div>
      </div>
    `).join("");
  }

  /* ==========================================
     Render FAQs
     ========================================== */
  function renderFaqs() {
    if (!faqWrapper || !currentFaqs.length) return;
    faqWrapper.innerHTML = currentFaqs.map((f, idx) => `
      <div class="faq-item ${idx === 0 ? 'active' : ''}">
        <div class="faq-question">
          ${f.question}
          <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="faq-answer">
          ${f.answer}
        </div>
      </div>
    `).join("");

    // Bind accordion toggles
    faqWrapper.querySelectorAll(".faq-question").forEach(q => {
      q.addEventListener("click", () => {
        const item = q.parentElement;
        const isActive = item.classList.contains("active");
        faqWrapper.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
        if (!isActive) item.classList.add("active");
      });
    });
  }

  /* ==========================================
     Modal Drawer Logic
     ========================================== */
  function openModal(softwareId) {
    const item = currentCatalog.find(s => s.id === softwareId);
    if (!item) return;

    activeSoftware = item;

    // Set Header
    modalTitle.textContent = item.title;
    modalCategoryBadge.textContent = item.badge || "Best Seller";
    modalIcon.className = `fa-solid ${item.icon || 'fa-calculator'}`;
    modalIcon.parentElement.style.background = item.themeGradient || "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(147,51,234,0.1))";
    modalIcon.parentElement.style.color = item.accentColor || "#3b82f6";

    // Render Tab 1: Fitur Utama
    featuresDetailGrid.innerHTML = (item.features || []).map(f => `
      <div class="feature-detail-card">
        <div class="feature-detail-icon" style="color: ${item.accentColor || '#3b82f6'}; background: ${item.accentColor || '#3b82f6'}18;">
          <i class="fa-solid ${f.icon || 'fa-check'}"></i>
        </div>
        <div>
          <div class="feature-detail-title">${f.title}</div>
          <div class="feature-detail-desc">${f.desc}</div>
        </div>
      </div>
    `).join("");

    // Render Tab 2: Spesifikasi Sistem
    specsTableBody.innerHTML = (item.specs || []).map(s => `
      <tr>
        <td class="specs-label">${s.label}</td>
        <td class="specs-val">${s.val}</td>
      </tr>
    `).join("");

    // Render Tab 3: Pilihan Lisensi & Harga
    const p = item.prices || {
      standard: { label: "Standard", price: "750.000", period: "Sekali Bayar", note: "1 PC" },
      pro: { label: "Pro Multi-PC", price: "1.490.000", period: "Sekali Bayar", note: "Multi PC" },
      enterprise: { label: "Enterprise", price: "2.850.000", period: "Sekali Bayar", note: "Unlimited" }
    };

    pricingGrid.innerHTML = `
      <div class="price-card">
        <div class="price-card-tier">${p.standard.label}</div>
        <div class="price-card-amount">Rp ${p.standard.price}</div>
        <div class="price-card-period">${p.standard.period}</div>
        <div class="price-card-note">${p.standard.note}</div>
        <button class="btn-secondary select-tier-btn" data-tier="${p.standard.label}" style="width: 100%;">Pilih Paket</button>
      </div>

      <div class="price-card featured">
        <span style="position: absolute; top: -12px; background: var(--gradient-brand); color: #fff; font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.75rem; border-radius: 99px;">PALING LARIS</span>
        <div class="price-card-tier">${p.pro.label}</div>
        <div class="price-card-amount">Rp ${p.pro.price}</div>
        <div class="price-card-period">${p.pro.period}</div>
        <div class="price-card-note">${p.pro.note}</div>
        <button class="btn-primary select-tier-btn" data-tier="${p.pro.label}" style="width: 100%;">Pilih Paket</button>
      </div>

      <div class="price-card">
        <div class="price-card-tier">${p.enterprise.label}</div>
        <div class="price-card-amount">Rp ${p.enterprise.price}</div>
        <div class="price-card-period">${p.enterprise.period}</div>
        <div class="price-card-note">${p.enterprise.note}</div>
        <button class="btn-secondary select-tier-btn" data-tier="${p.enterprise.label}" style="width: 100%;">Pilih Paket</button>
      </div>
    `;

    setupWhatsAppAction(item, p.standard.label);

    document.querySelectorAll(".select-tier-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const tier = btn.getAttribute("data-tier");
        setupWhatsAppAction(item, tier);
        window.open(generateWaLink(item, tier), "_blank");
      });
    });

    modalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  function setupWhatsAppAction(item, selectedTier) {
    if (!modalWaBtn) return;
    modalWaBtn.onclick = () => {
      const url = generateWaLink(item, selectedTier);
      window.open(url, "_blank");
    };
  }

  function generateWaLink(item, tierName) {
    const number = currentSiteConfig.whatsappNumber || "6285165655759";
    const text = encodeURIComponent(
      `Halo Admin ${currentSiteConfig.storeName},\n\nSaya berminat untuk memesan software:\n- *Software*: ${item.title}\n- *Paket Lisensi*: ${tierName}\n- *Kategori*: ${item.category.toUpperCase()}\n\nMohon info prosedur pembayaran dan pengiriman installer serta serial key resminya. Terima kasih!`
    );
    return `https://wa.me/${number}?text=${text}`;
  }

  /* ==========================================
     Event Listeners setup
     ========================================== */
  function setupEventListeners() {
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.getAttribute("data-category");
        renderProducts();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        searchClearBtn.style.display = searchQuery ? "block" : "none";
        renderProducts();
      });

      searchClearBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        searchClearBtn.style.display = "none";
        renderProducts();
      });
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        const targetTab = btn.getAttribute("data-tab");
        document.getElementById(targetTab).classList.add("active");
      });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const navMenu = document.querySelector(".nav-menu");
    if (mobileMenuToggle && navMenu) {
      mobileMenuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("mobile-active");
        const icon = mobileMenuToggle.querySelector("i");
        if (icon) {
          icon.className = navMenu.classList.contains("mobile-active") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
        }
      });

      navMenu.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("mobile-active");
          const icon = mobileMenuToggle.querySelector("i");
          if (icon) icon.className = "fa-solid fa-bars";
        });
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalBackdrop.classList.contains("active")) {
        closeModal();
      }
      if (e.key === "/" && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }
});
