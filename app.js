/* ==========================================================================
   WP MASTER HUB & ADMIN PANEL - CORE JAVASCRIPT ENGINE
   ========================================================================== */

// --- INITIAL SEED DATASET ---
const defaultData = {
  products: [
    {
      id: 'p1',
      name: 'WP Commerce Speed Pro',
      category: 'Plugin',
      price: 349000,
      desc: 'Plugin optimasi Toko Online WooCommerce dengan caching pintar & lazy load ultra-fast.',
      icon: 'fa-cart-shopping',
      image: 'https://images.unsplash.com/photo-1556742049-0a67daf40955?auto=format&fit=crop&w=600&q=80',
      badge: 'Bestseller',
      badgeClass: 'popular'
    },
    {
      id: 'p2',
      name: 'Elementor Ultra Theme Suite',
      category: 'Tema',
      price: 499000,
      desc: 'Koleksi 50+ Template landing page profesional siap pakai untuk Elementor Pro.',
      icon: 'fa-palette',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
      badge: 'Popular',
      badgeClass: ''
    },
    {
      id: 'p3',
      name: 'SEO Rocket Master WP',
      category: 'Plugin',
      price: 299000,
      desc: 'Plugin SEO serba otomatis dengan Schema Markup Generator & integrasi AI Keywords.',
      icon: 'fa-chart-line',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      badge: 'New',
      badgeClass: ''
    },
    {
      id: 'p4',
      name: 'Security Shield WP Enterprise',
      category: 'Enterprise',
      price: 899000,
      desc: 'Perlindungan malware real-time, Firewall WAF, & Otomatisasi Backup Cloud harian.',
      icon: 'fa-shield-halved',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
      badge: 'Security',
      badgeClass: ''
    },
    {
      id: 'p5',
      name: 'WP Cloud Sync Tools',
      category: 'SaaS',
      price: 199000,
      desc: 'Sinkronisasi database multi-site otomatis ke AWS, Google Cloud, atau Dropbox.',
      icon: 'fa-cloud-arrow-up',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
      badge: 'Cloud',
      badgeClass: ''
    },
    {
      id: 'p6',
      name: 'Membership Master Hub',
      category: 'Plugin',
      price: 399000,
      desc: 'Kelola pendaftaran member, sistem proteksi konten privat, & integrasi Payment Gateway.',
      icon: 'fa-users-gear',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      badge: 'Featured',
      badgeClass: ''
    }
  ],

  pricing: [
    {
      id: 'pr1',
      title: 'Starter Pack',
      priceMonthly: 99000,
      priceYearly: 79000,
      desc: 'Sangat cocok untuk blog pribadi atau website portofolio awal.',
      featured: false,
      features: ['1 Lisensi Domain', 'Akses 5+ Plugin Dasar', 'Update Konten 6 Bulan', 'Dukungan Komunitas']
    },
    {
      id: 'pr2',
      title: 'Professional Suite',
      priceMonthly: 249000,
      priceYearly: 199000,
      desc: 'Pilihan populer untuk pemilik bisnis UMKM & Toko Online.',
      featured: true,
      features: ['5 Lisensi Domain', 'Akses Semua Plugin & Tema', 'Update Otomatis 1 Tahun', 'Dukungan Prioritas 24/7', 'Integrasi Payment Gateway']
    },
    {
      id: 'pr3',
      title: 'Agency Unlimited',
      priceMonthly: 599000,
      priceYearly: 479000,
      desc: 'Dirancang khusus untuk Agensi Web & Freelancer profesional.',
      featured: false,
      features: ['Domain UNLIMITED', 'White-Label Rebranding', 'Akses API Key Eksklusif', 'Dukungan VIP Telegram', 'Bonus 50+ Template Pro']
    }
  ],

  promos: [
    {
      id: 'pm1',
      title: 'Diskon Flash Sale 50%',
      code: 'FLASH50',
      discountPercent: 50,
      desc: 'Gunakan kode kupon ini untuk semua paket lisensi tahunan.',
      validUntil: '2026-08-31',
      active: true
    },
    {
      id: 'pm2',
      title: 'Promo Spesial Tema WP',
      code: 'THEME30',
      discountPercent: 30,
      desc: 'Diskon 30% khusus pembelian Elementor Ultra Theme Suite.',
      validUntil: '2026-08-15',
      active: true
    },
    {
      id: 'pm3',
      title: 'Cashback Partner 20%',
      code: 'PARTNER20',
      discountPercent: 20,
      desc: 'Khusus member yang mendaftar melalui jaringan mitra partnership.',
      validUntil: '2026-12-31',
      active: true
    }
  ],

  docs: [
    {
      id: 'd1',
      category: 'Instalasi & Setup',
      title: 'Panduan Instalasi Plugin di WordPress',
      body: 'Untuk menginstal plugin WP Master Hub, unduh berkas .zip dari member area. Kemudian buka WP Admin > Plugin > Tambah Baru > Unggah Plugin. Pilih berkas .zip dan klik Aktifkan.',
      codeSnippet: '// Contoh Aktivasi Lisensi via functions.php\ndefine("WP_MASTER_LICENSE_KEY", "WPM-8923-8819-KEY");'
    },
    {
      id: 'd2',
      category: 'Instalasi & Setup',
      title: 'Konfigurasi Optimasi Kecepatan Cache',
      body: 'Buka pengaturan WP Commerce Speed Pro di WP Admin menu. Aktifkan opsi "Minify CSS & JS", kemudian centang "Enable Gzip Compression" dan "Object Cache Redis" untuk performa terbaik.',
      codeSnippet: '# Aturan Cache .htaccess\n<IfModule mod_expires.c>\n  ExpiresActive On\n  ExpiresDefault "access plus 1 month"\n</IfModule>'
    },
    {
      id: 'd3',
      category: 'API Reference',
      title: 'Integrasi Webhook & REST API',
      body: 'WP Master Hub menyediakan endpoint REST API untuk menghubungkan sistem toko online Anda dengan SaaS eksternal atau aplikasi mobile.',
      codeSnippet: 'curl -X GET https://websiteanda.com/wp-json/wpmaster/v1/products \\\n -H "Authorization: Bearer YOUR_API_KEY"'
    },
    {
      id: 'd4',
      category: 'FAQ & Troubleshooting',
      title: 'Solusi Error "Memory Limit Exceeded"',
      body: 'Jika Anda mengalami masalah batas memori saat mengunggah tema besar, tingkatkan batas memori di berkas wp-config.php.',
      codeSnippet: 'define("WP_MEMORY_LIMIT", "256M");'
    }
  ],

  partnerships: [
    {
      id: 'prt1',
      name: 'CV Studio Web Nusantara',
      email: 'partnership@studioweb.id',
      type: 'Agency / Reseller',
      notes: 'Ingin mengajukan paket bundling 50 lisensi untuk klien agensi kami.',
      date: '2026-08-01',
      status: 'Baru'
    },
    {
      id: 'prt2',
      name: 'Bagus Pratama (Digital Marketer)',
      email: 'bagus@marketerpro.com',
      type: 'Afiliasi',
      notes: 'Tertarik menjadi top affiliate dengan audiens 20.000 subscriber YouTube.',
      date: '2026-08-02',
      status: 'Baru'
    }
  ],

  waAdmins: [
    {
      id: 'wa1',
      name: 'Siti Rahma',
      role: 'Sales & Konsultasi Produk',
      phone: '6281234567890',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      status: 'Online',
      message: 'Halo Mbak Siti, saya mau konsul produk WP Master Hub.'
    },
    {
      id: 'wa2',
      name: 'Budi Pratama',
      role: 'Support & Lisensi Teknis',
      phone: '6281234567891',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
      status: 'Online',
      message: 'Halo Mas Budi, saya butuh bantuan teknis lisensi.'
    },
    {
      id: 'wa3',
      name: 'Dewi Lestari',
      role: 'Partnership & Afiliasi',
      phone: '6281234567892',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      status: 'Online',
      message: 'Halo Mbak Dewi, saya tertarik dengan program Partnership.'
    }
  ]
};

// --- STATE MANAGEMENT ---
let appState = {};
let isYearlyBilling = false;
let currentAdminTab = 'dashboard';
let editingModalItem = null; // { type, id }

function initAppState() {
  const saved = localStorage.getItem('wpmaster_hub_state');
  if (saved) {
    try {
      appState = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved state, resetting', e);
      appState = JSON.parse(JSON.stringify(defaultData));
    }
  } else {
    appState = JSON.parse(JSON.stringify(defaultData));
    saveAppState();
  }

  // Ensure default products have image URLs populated
  if (appState && appState.products) {
    let updated = false;
    appState.products.forEach(p => {
      const match = defaultData.products.find(dp => dp.id === p.id);
      if (match && !p.image) {
        p.image = match.image;
        updated = true;
      }
    });
    if (!appState.waAdmins) {
      appState.waAdmins = JSON.parse(JSON.stringify(defaultData.waAdmins));
      updated = true;
    }
    if (updated) saveAppState();
  }
}

function saveAppState() {
  localStorage.setItem('wpmaster_hub_state', JSON.stringify(appState));
  renderAllPublicSections();
  if (document.getElementById('wp-admin-overlay').classList.contains('active')) {
    renderAdminContent();
  }
  updateUnreadBadge();
}

function resetToDefaultData() {
  if (confirm('Apakah Anda yakin ingin mengembalikan seluruh data ke default awal? Data buatan Anda akan terhapus.')) {
    appState = JSON.parse(JSON.stringify(defaultData));
    saveAppState();
    showToast('Data berhasil di-reset ke versi default!', 'success');
  }
}

// --- UTILS ---
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
}

function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}"></i> <span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function updateUnreadBadge() {
  const count = appState.partnerships.filter(p => p.status === 'Baru').length;
  const badge = document.getElementById('bar-unread-badge');
  if (badge) {
    badge.textContent = `${count} Proposal`;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

// ==========================================
// RENDER FRONT-END PUBLIC SECTIONS
// ==========================================
function renderAllPublicSections() {
  renderProducts('all');
  renderPricing();
  renderPromos();
  renderDocs();
  renderWaWidget();
  updateHeroStats();
}

function renderWaWidget() {
  const container = document.getElementById('wa-admin-list');
  const countBadge = document.getElementById('wa-online-count');
  if (!container) return;

  const admins = appState.waAdmins || defaultData.waAdmins;
  const onlineAdmins = admins.filter(a => a.status === 'Online');

  if (countBadge) {
    countBadge.textContent = onlineAdmins.length;
    countBadge.style.display = onlineAdmins.length > 0 ? 'flex' : 'none';
  }

  if (admins.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 20px; color: var(--text-muted);">Belum ada admin WhatsApp.</div>`;
    return;
  }

  container.innerHTML = admins.map(a => {
    const textMsg = encodeURIComponent(a.message || 'Halo Admin, saya tertarik dengan layanan WP Master Hub.');
    const waLink = `https://wa.me/${a.phone}?text=${textMsg}`;

    return `
      <a href="${waLink}" target="_blank" class="wa-admin-card" rel="noopener noreferrer">
        <div class="wa-avatar-box">
          <img src="${a.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}" alt="${a.name}">
          <span class="wa-status-dot" style="background:${a.status === 'Online' ? '#25d366' : '#c3c4c7'}"></span>
        </div>
        <div class="wa-admin-info">
          <div class="wa-admin-name">${a.name}</div>
          <span class="wa-admin-role">${a.role}</span>
          <span style="font-size: 10px; color: ${a.status === 'Online' ? 'var(--success)' : 'var(--text-muted)'}; font-weight: 600;">
            ● ${a.status}
          </span>
        </div>
        <div class="wa-chat-btn">
          <i class="fa-brands fa-whatsapp"></i>
        </div>
      </a>
    `;
  }).join('');
}

function toggleWaWidget() {
  const popup = document.getElementById('wa-widget-popup');
  if (popup) {
    popup.classList.toggle('active');
  }
}

function updateHeroStats() {
  const prodEl = document.getElementById('stat-prod-count');
  const partEl = document.getElementById('stat-partner-count');
  if (prodEl) prodEl.textContent = `${appState.products.length}+`;
  if (partEl) partEl.textContent = `${40 + appState.partnerships.length}+`;
}

// 1. PRODUCTS
function renderProducts(catFilter = 'all') {
  const container = document.getElementById('products-container');
  if (!container) return;

  const filtered = catFilter === 'all' 
    ? appState.products 
    : appState.products.filter(p => p.category.toLowerCase() === catFilter.toLowerCase());

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">Belum ada produk dalam kategori ini.</div>`;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img-wrapper">
        ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;">` : `<i class="fa-solid ${p.icon || 'fa-box'}"></i>`}
        ${p.badge ? `<span class="product-badge ${p.badgeClass}">${p.badge}</span>` : ''}
      </div>
      <div class="product-body">
        <span class="product-cat">${p.category}</span>
        <h3 class="product-title">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <div class="product-price">${formatRupiah(p.price)}</div>
          <button class="btn btn-primary btn-sm" onclick="openOrderModal('${p.id}')">
            <i class="fa-solid fa-cart-shopping"></i> Beli
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// 2. PRICING
function toggleBillingCycle() {
  isYearlyBilling = !isYearlyBilling;
  const toggle = document.getElementById('pricing-period-toggle');
  if (toggle) {
    if (isYearlyBilling) toggle.classList.add('active');
    else toggle.classList.remove('active');
  }
  renderPricing();
}

function renderPricing() {
  const container = document.getElementById('pricing-container');
  if (!container) return;

  container.innerHTML = appState.pricing.map(plan => {
    const price = isYearlyBilling ? plan.priceYearly : plan.priceMonthly;
    const periodText = isYearlyBilling ? '/bulan (Ditagih tahunan)' : '/bulan';

    return `
      <div class="pricing-card ${plan.featured ? 'featured' : ''}">
        ${plan.featured ? `<div class="featured-badge">Paling Populer</div>` : ''}
        <div class="pricing-header">
          <h3>${plan.title}</h3>
          <p>${plan.desc}</p>
        </div>
        <div class="pricing-amount">
          ${formatRupiah(price)} <span>${periodText}</span>
        </div>
        <ul class="pricing-features">
          ${plan.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')}
        </ul>
        <button class="btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}" onclick="openPlanOrderModal('${plan.id}')">
          Pilih Paket ${plan.title}
        </button>
      </div>
    `;
  }).join('');
}

// 3. PROMOS
function renderPromos() {
  const container = document.getElementById('promo-container');
  if (!container) return;

  const activePromos = appState.promos.filter(pm => pm.active);
  if (activePromos.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Tidak ada promo aktif saat ini.</div>`;
    return;
  }

  container.innerHTML = activePromos.map(pm => `
    <div class="promo-card">
      <div class="promo-icon">
        <i class="fa-solid fa-ticket"></i>
      </div>
      <div class="promo-details">
        <h4>${pm.title} (Diskon ${pm.discountPercent}%)</h4>
        <p>${pm.desc} • Berlaku s/d ${pm.validUntil}</p>
        <div class="coupon-box" onclick="copyCoupon('${pm.code}')" title="Klik untuk salin kode">
          <i class="fa-solid fa-copy"></i> KODE: ${pm.code}
        </div>
      </div>
    </div>
  `).join('');
}

function copyCoupon(code) {
  navigator.clipboard.writeText(code);
  showToast(`Kode Kupon '${code}' berhasil disalin ke clipboard!`, 'success');
}

// 4. DOKUMENTASI
let activeDocId = null;

function renderDocs() {
  const menuContainer = document.getElementById('docs-category-menu');
  const viewContainer = document.getElementById('docs-article-view');
  if (!menuContainer || !viewContainer) return;

  if (appState.docs.length === 0) {
    menuContainer.innerHTML = `<li style="padding: 10px; color: var(--text-muted);">Belum ada dokumentasi.</li>`;
    viewContainer.innerHTML = `<p>Belum ada artikel dokumentasi yang dipublikasikan.</p>`;
    return;
  }

  if (!activeDocId && appState.docs.length > 0) {
    activeDocId = appState.docs[0].id;
  }

  // Render Sidebar Menu
  menuContainer.innerHTML = appState.docs.map(doc => `
    <li class="docs-menu-item ${doc.id === activeDocId ? 'active' : ''}" onclick="selectDocArticle('${doc.id}')">
      <span>${doc.title}</span>
      <i class="fa-solid fa-chevron-right" style="font-size: 11px;"></i>
    </li>
  `).join('');

  // Render Content View
  const selectedDoc = appState.docs.find(d => d.id === activeDocId) || appState.docs[0];
  if (selectedDoc) {
    viewContainer.innerHTML = `
      <h3>${selectedDoc.title}</h3>
      <div class="docs-meta">
        <span><i class="fa-solid fa-folder"></i> Kategori: ${selectedDoc.category}</span> &nbsp;•&nbsp;
        <span><i class="fa-solid fa-clock"></i> Diperbarui via WP Admin</span>
      </div>
      <div class="docs-body">
        <p>${selectedDoc.body}</p>
        ${selectedDoc.codeSnippet ? `
          <h4 style="font-size: 14px; margin-top: 20px; font-weight: 700;">Contoh Kode / Script:</h4>
          <div class="code-block">${escapeHtml(selectedDoc.codeSnippet)}</div>
        ` : ''}
      </div>
    `;
  }
}

function selectDocArticle(id) {
  activeDocId = id;
  renderDocs();
}

function filterDocs() {
  const query = document.getElementById('docs-search-input').value.toLowerCase();
  const items = document.querySelectorAll('#docs-category-menu .docs-menu-item');
  appState.docs.forEach((doc, idx) => {
    const match = doc.title.toLowerCase().includes(query) || doc.body.toLowerCase().includes(query) || doc.category.toLowerCase().includes(query);
    if (items[idx]) {
      items[idx].style.display = match ? 'flex' : 'none';
    }
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// 5. PARTNERSHIP FORM SUBMISSION
function handlePartnershipSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('part-name').value;
  const email = document.getElementById('part-email').value;
  const type = document.getElementById('part-type').value;
  const notes = document.getElementById('part-notes').value;

  const newProp = {
    id: 'prt_' + Date.now(),
    name,
    email,
    type,
    notes,
    date: new Date().toISOString().split('T')[0],
    status: 'Baru'
  };

  appState.partnerships.unshift(newProp);
  saveAppState();
  document.getElementById('partnership-form').reset();
  showToast('Pengajuan Partnership Anda telah berhasil dikirim! Tim kami akan menghubungi Anda.', 'success');
}

// Countdown timer demo animation
function startCountdownTimer() {
  let hours = 14, mins = 35, secs = 48;
  setInterval(() => {
    secs--;
    if (secs < 0) { secs = 59; mins--; }
    if (mins < 0) { mins = 59; hours--; }
    if (hours < 0) { hours = 24; }

    const hEl = document.getElementById('timer-hours');
    const mEl = document.getElementById('timer-mins');
    const sEl = document.getElementById('timer-secs');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(mins).padStart(2, '0');
    if (sEl) sEl.textContent = String(secs).padStart(2, '0');
  }, 1000);
}

// ==========================================
// WP ADMIN OVERLAY ENGINE
// ==========================================
function toggleWpAdmin(show) {
  const overlay = document.getElementById('wp-admin-overlay');
  if (show) {
    overlay.classList.add('active');
    renderAdminContent();
  } else {
    overlay.classList.remove('active');
  }
}

function switchAdminTab(tabName) {
  currentAdminTab = tabName;
  document.querySelectorAll('.wp-menu-item').forEach(el => el.classList.remove('active'));
  
  const map = {
    dashboard: 'menu-dash',
    produk: 'menu-prod',
    harga: 'menu-prc',
    promo: 'menu-prm',
    dokumentasi: 'menu-doc',
    partnership: 'menu-prt',
    wa_admin: 'menu-wa'
  };
  if (map[tabName]) {
    document.getElementById(map[tabName])?.classList.add('active');
  }

  renderAdminContent();
}

function renderAdminContent() {
  const main = document.getElementById('admin-main-content');
  if (!main) return;

  switch (currentAdminTab) {
    case 'dashboard':
      renderAdminDashboard(main);
      break;
    case 'produk':
      renderAdminProducts(main);
      break;
    case 'harga':
      renderAdminPricing(main);
      break;
    case 'promo':
      renderAdminPromos(main);
      break;
    case 'dokumentasi':
      renderAdminDocs(main);
      break;
    case 'partnership':
      renderAdminPartnerships(main);
      break;
    case 'wa_admin':
      renderAdminWa(main);
      break;
  }
}

// --- ADMIN DASHBOARD TAB ---
function renderAdminDashboard(main) {
  main.innerHTML = `
    <div class="admin-header-title">
      <h2><i class="fa-solid fa-gauge-high"></i> Dashboard Ringkasan WP Admin</h2>
      <button class="btn btn-primary btn-sm" onclick="openAdminModal('produk')">
        <i class="fa-solid fa-plus"></i> Tambah Produk Baru
      </button>
    </div>

    <div class="dashboard-grid">
      <div class="stat-box">
        <h4>Total Produk WP</h4>
        <div class="count">${appState.products.length} Item</div>
      </div>
      <div class="stat-box green">
        <h4>Paket Harga Aktif</h4>
        <div class="count">${appState.pricing.length} Paket</div>
      </div>
      <div class="stat-box orange">
        <h4>Promo & Kupon Aktif</h4>
        <div class="count">${appState.promos.filter(p=>p.active).length} Promo</div>
      </div>
      <div class="stat-box red">
        <h4>Pengajuan Partnership</h4>
        <div class="count">${appState.partnerships.length} Proposal</div>
      </div>
    </div>

    <!-- Vercel Serverless Endpoint Status Banner -->
    <div style="background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 14px 20px; margin-top: 20px; display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="width: 38px; height: 38px; border-radius: 8px; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; border: 1px solid #333;">
          <svg width="18" height="18" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white"/></svg>
        </div>
        <div>
          <h4 style="margin: 0; font-size: 14px; font-weight: 600; color: #fff;">Vercel Admin Serverless Endpoint</h4>
          <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">Endpoint API: <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; color: #38bdf8;">/api/admin</code> | Status: <span id="vercel-api-status-badge" style="color: #4ade80; font-weight: 600;">Memeriksa...</span></p>
        </div>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="checkVercelApiStatus()" style="font-size: 12px; padding: 6px 12px;">
        <i class="fa-solid fa-arrows-rotate"></i> Cek Server Endpoint
      </button>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-top: 30px;">
      <div class="admin-table-wrapper" style="padding: 20px;">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px;"><i class="fa-solid fa-handshake"></i> Proposal Partnership Terbaru</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Nama / Instansi</th>
              <th>Email</th>
              <th>Tipe</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${appState.partnerships.slice(0, 4).map(p => `
              <tr>
                <td><strong>${p.name}</strong></td>
                <td>${p.email}</td>
                <td><span class="save-badge">${p.type}</span></td>
                <td><span class="wp-badge" style="background:${p.status === 'Baru' ? 'var(--danger)' : 'var(--success)'}">${p.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="admin-table-wrapper" style="padding: 20px;">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px;"><i class="fa-solid fa-bolt"></i> Aksi Cepat Admin</h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button class="btn btn-secondary btn-sm" onclick="switchAdminTab('produk')"><i class="fa-solid fa-box"></i> Kelola Daftar Produk</button>
          <button class="btn btn-secondary btn-sm" onclick="switchAdminTab('promo')"><i class="fa-solid fa-ticket"></i> Buat Kode Promo Baru</button>
          <button class="btn btn-secondary btn-sm" onclick="switchAdminTab('dokumentasi')"><i class="fa-solid fa-book"></i> Tambah Artikel Dokumentasi</button>
          <button class="btn btn-danger btn-sm" onclick="resetToDefaultData()"><i class="fa-solid fa-rotate-left"></i> Reset ke Data Default</button>
        </div>
      </div>
    </div>
  `;
}

// --- ADMIN PRODUK TAB ---
function renderAdminProducts(main) {
  main.innerHTML = `
    <div class="admin-header-title">
      <h2><i class="fa-solid fa-box-open"></i> Manajemen Produk & Ekstensi</h2>
      <button class="btn btn-primary btn-sm" onclick="openAdminModal('produk')">
        <i class="fa-solid fa-plus"></i> Tambah Produk Baru
      </button>
    </div>

    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Ikon</th>
            <th>Nama Produk</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Badge</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${appState.products.map(p => `
            <tr>
              <td style="text-align: center;">
                ${p.image ? `<img src="${p.image}" style="width:36px; height:36px; object-fit:cover; border-radius:4px; border:1px solid var(--border-color);" alt="${p.name}">` : `<i class="fa-solid ${p.icon || 'fa-box'}" style="font-size: 18px; color: var(--primary);"></i>`}
              </td>
              <td><strong>${p.name}</strong><br><small style="color: var(--text-muted);">${p.desc.substring(0, 45)}...</small></td>
              <td><span class="section-badge">${p.category}</span></td>
              <td><strong>${formatRupiah(p.price)}</strong></td>
              <td>${p.badge ? `<span class="product-badge ${p.badgeClass}" style="position:static;">${p.badge}</span>` : '-'}</td>
              <td>
                <button class="btn btn-secondary btn-sm" onclick="editAdminItem('produk', '${p.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteAdminItem('produk', '${p.id}')"><i class="fa-solid fa-trash"></i> Hapus</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// --- ADMIN HARGA TAB ---
function renderAdminPricing(main) {
  main.innerHTML = `
    <div class="admin-header-title">
      <h2><i class="fa-solid fa-tags"></i> Manajemen Paket Harga</h2>
      <button class="btn btn-primary btn-sm" onclick="openAdminModal('harga')">
        <i class="fa-solid fa-plus"></i> Tambah Paket Harga
      </button>
    </div>

    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Nama Paket</th>
            <th>Harga Bulanan</th>
            <th>Harga Tahunan</th>
            <th>Status Highlight</th>
            <th>Jumlah Fitur</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${appState.pricing.map(plan => `
            <tr>
              <td><strong>${plan.title}</strong></td>
              <td>${formatRupiah(plan.priceMonthly)}/bln</td>
              <td>${formatRupiah(plan.priceYearly)}/bln</td>
              <td>${plan.featured ? '<span class="wp-badge" style="background:var(--success);">Populer</span>' : 'Standard'}</td>
              <td>${plan.features.length} Fitur Terdaftar</td>
              <td>
                <button class="btn btn-secondary btn-sm" onclick="editAdminItem('harga', '${plan.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteAdminItem('harga', '${plan.id}')"><i class="fa-solid fa-trash"></i> Hapus</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// --- ADMIN PROMO TAB ---
function renderAdminPromos(main) {
  main.innerHTML = `
    <div class="admin-header-title">
      <h2><i class="fa-solid fa-ticket"></i> Manajemen Kode Promo & Kupon</h2>
      <button class="btn btn-primary btn-sm" onclick="openAdminModal('promo')">
        <i class="fa-solid fa-plus"></i> Buat Promo Baru
      </button>
    </div>

    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Judul Promo</th>
            <th>Kode Kupon</th>
            <th>Diskon</th>
            <th>Berlaku S/D</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${appState.promos.map(pm => `
            <tr>
              <td><strong>${pm.title}</strong></td>
              <td><span class="coupon-box">${pm.code}</span></td>
              <td><strong style="color: var(--danger);">${pm.discountPercent}% OFF</strong></td>
              <td>${pm.validUntil}</td>
              <td>
                <button class="btn btn-sm ${pm.active ? 'btn-primary' : 'btn-secondary'}" onclick="togglePromoActive('${pm.id}')">
                  ${pm.active ? 'Aktif' : 'Non-Aktif'}
                </button>
              </td>
              <td>
                <button class="btn btn-secondary btn-sm" onclick="editAdminItem('promo', '${pm.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteAdminItem('promo', '${pm.id}')"><i class="fa-solid fa-trash"></i> Hapus</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// --- ADMIN DOKUMENTASI TAB ---
function renderAdminDocs(main) {
  main.innerHTML = `
    <div class="admin-header-title">
      <h2><i class="fa-solid fa-book"></i> Manajemen Artikel Dokumentasi</h2>
      <button class="btn btn-primary btn-sm" onclick="openAdminModal('dokumentasi')">
        <i class="fa-solid fa-plus"></i> Tambah Artikel Docs
      </button>
    </div>

    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Judul Artikel</th>
            <th>Kategori</th>
            <th>Panjang Isi</th>
            <th>Ada Script Code?</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${appState.docs.map(doc => `
            <tr>
              <td><strong>${doc.title}</strong></td>
              <td><span class="save-badge">${doc.category}</span></td>
              <td>${doc.body.length} Karakter</td>
              <td>${doc.codeSnippet ? '<i class="fa-solid fa-check" style="color:var(--success);"></i> Ya' : '-'}</td>
              <td>
                <button class="btn btn-secondary btn-sm" onclick="editAdminItem('dokumentasi', '${doc.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteAdminItem('dokumentasi', '${doc.id}')"><i class="fa-solid fa-trash"></i> Hapus</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// --- ADMIN PARTNERSHIP TAB ---
function renderAdminPartnerships(main) {
  main.innerHTML = `
    <div class="admin-header-title">
      <h2><i class="fa-solid fa-handshake"></i> Daftar Pengajuan Partnership</h2>
    </div>

    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Nama / Instansi</th>
            <th>Email</th>
            <th>Tipe Partnership</th>
            <th>Catatan Proposal</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${appState.partnerships.map(prt => `
            <tr>
              <td><small>${prt.date}</small></td>
              <td><strong>${prt.name}</strong></td>
              <td><a href="mailto:${prt.email}">${prt.email}</a></td>
              <td><span class="save-badge">${prt.type}</span></td>
              <td style="max-width: 250px;">${prt.notes}</td>
              <td>
                <span class="wp-badge" style="background:${prt.status === 'Baru' ? 'var(--danger)' : 'var(--success)'}">${prt.status}</span>
              </td>
              <td>
                <button class="btn btn-primary btn-sm" onclick="togglePartnershipStatus('${prt.id}')">
                  ${prt.status === 'Baru' ? 'Tandai Diproses' : 'Kembalikan Baru'}
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteAdminItem('partnership', '${prt.id}')"><i class="fa-solid fa-trash"></i></button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function togglePromoActive(id) {
  const pm = appState.promos.find(p => p.id === id);
  if (pm) {
    pm.active = !pm.active;
    saveAppState();
    showToast(`Status promo '${pm.code}' berhasil diubah!`, 'success');
  }
}

function togglePartnershipStatus(id) {
  const prt = appState.partnerships.find(p => p.id === id);
  if (prt) {
    prt.status = prt.status === 'Baru' ? 'Diproses' : 'Baru';
    saveAppState();
    showToast(`Status pengajuan ${prt.name} diubah menjadi: ${prt.status}`, 'success');
  }
}

// --- ADMIN WA MARKETING TAB ---
function renderAdminWa(main) {
  main.innerHTML = `
    <div class="admin-header-title">
      <h2><i class="fa-brands fa-whatsapp"></i> Kelola Admin WA Marketing</h2>
      <button class="btn btn-primary btn-sm" onclick="openAdminModal('wa_admin')">
        <i class="fa-solid fa-plus"></i> Tambah Admin WA
      </button>
    </div>

    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nama Admin</th>
            <th>Peran / Spesialisasi</th>
            <th>Nomor WhatsApp</th>
            <th>Pesan Default</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${(appState.waAdmins || []).map(a => `
            <tr>
              <td style="text-align: center;">
                <img src="${a.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}" style="width:36px; height:36px; border-radius:50%; object-fit:cover;" alt="${a.name}">
              </td>
              <td><strong>${a.name}</strong></td>
              <td><span class="save-badge">${a.role}</span></td>
              <td><code>+${a.phone}</code></td>
              <td><small style="color: var(--text-muted);">${a.message || '-'}</small></td>
              <td>
                <button class="btn btn-sm ${a.status === 'Online' ? 'btn-primary' : 'btn-secondary'}" onclick="toggleWaAdminStatus('${a.id}')">
                  ● ${a.status}
                </button>
              </td>
              <td>
                <button class="btn btn-secondary btn-sm" onclick="editAdminItem('wa_admin', '${a.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteAdminItem('wa_admin', '${a.id}')"><i class="fa-solid fa-trash"></i> Hapus</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function toggleWaAdminStatus(id) {
  const admin = (appState.waAdmins || []).find(a => a.id === id);
  if (admin) {
    admin.status = admin.status === 'Online' ? 'Offline' : 'Online';
    saveAppState();
    showToast(`Status admin ${admin.name} diubah menjadi: ${admin.status}`, 'success');
  }
}

function getAppStateKey(type) {
  const map = {
    produk: 'products',
    harga: 'pricing',
    promo: 'promos',
    dokumentasi: 'docs',
    partnership: 'partnerships',
    wa_admin: 'waAdmins'
  };
  return map[type] || type;
}

let tempUploadedImageData = null;

function handleProductImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    alert('Ukuran berkas terlalu besar. Maksimal 2MB.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    tempUploadedImageData = e.target.result;
    const previewImg = document.getElementById('m-img-preview');
    const previewBox = document.getElementById('m-img-preview-box');
    if (previewImg) previewImg.src = tempUploadedImageData;
    if (previewBox) previewBox.style.display = 'flex';
  };
  reader.readAsDataURL(file);
}

function removeProductImage() {
  tempUploadedImageData = null;
  const fileInput = document.getElementById('m-file-input');
  if (fileInput) fileInput.value = '';
  const previewBox = document.getElementById('m-img-preview-box');
  if (previewBox) previewBox.style.display = 'none';
}

function openAdminModal(type, itemId = null) {
  editingModalItem = { type, id: itemId };
  const modal = document.getElementById('admin-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  let itemData = null;
  if (itemId) {
    const key = getAppStateKey(type);
    itemData = appState[key] ? appState[key].find(i => i.id === itemId) : null;
  }

  title.textContent = itemId ? `Sunting Data ${type.toUpperCase()}` : `Tambah ${type.toUpperCase()} Baru`;

  if (type === 'produk') {
    tempUploadedImageData = itemData ? (itemData.image || null) : null;
    body.innerHTML = `
      <div class="form-group">
        <label class="form-label">Nama Produk *</label>
        <input type="text" id="m-name" class="form-control" value="${itemData ? itemData.name : ''}" placeholder="Contoh: WP SEO Master" required>
      </div>
      <div class="form-group">
        <label class="form-label">Kategori *</label>
        <select id="m-category" class="form-control">
          <option value="Plugin" ${itemData?.category==='Plugin'?'selected':''}>Plugin</option>
          <option value="Tema" ${itemData?.category==='Tema'?'selected':''}>Tema WordPress</option>
          <option value="SaaS" ${itemData?.category==='SaaS'?'selected':''}>SaaS & Tools</option>
          <option value="Enterprise" ${itemData?.category==='Enterprise'?'selected':''}>Enterprise</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Harga (IDR) *</label>
        <input type="number" id="m-price" class="form-control" value="${itemData ? itemData.price : 299000}" required>
      </div>
      <div class="form-group">
        <label class="form-label"><i class="fa-solid fa-upload"></i> Upload Gambar Produk (PNG/JPG)</label>
        <input type="file" id="m-file-input" class="form-control" accept="image/*" onchange="handleProductImageUpload(event)" style="padding: 6px;">
        <div id="m-img-preview-box" style="margin-top: 12px; display: ${tempUploadedImageData ? 'flex' : 'none'}; align-items: center; gap: 12px; background: var(--bg-main); padding: 10px; border-radius: var(--radius-sm);">
          <img id="m-img-preview" src="${tempUploadedImageData || ''}" style="max-height: 80px; max-width: 120px; border-radius: 4px; object-fit: cover; border: 1px solid var(--border-color);" alt="Preview">
          <div>
            <span style="font-size: 12px; color: var(--text-muted); display: block; margin-bottom: 4px;">Pratinjau Gambar</span>
            <button type="button" class="btn btn-danger btn-sm" onclick="removeProductImage()" style="padding: 2px 8px; font-size: 11px;">
              <i class="fa-solid fa-trash"></i> Hapus Gambar
            </button>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Ikon FontAwesome (Alternatif jika tanpa gambar upload, contoh: fa-cart-shopping)</label>
        <input type="text" id="m-icon" class="form-control" value="${itemData ? itemData.icon : 'fa-box'}" placeholder="fa-box">
      </div>
      <div class="form-group">
        <label class="form-label">Label Badge (Opsional)</label>
        <input type="text" id="m-badge" class="form-control" value="${itemData ? itemData.badge : ''}" placeholder="Bestseller / Popular / New">
      </div>
      <div class="form-group">
        <label class="form-label">Deskripsi Singkat *</label>
        <textarea id="m-desc" class="form-control" required>${itemData ? itemData.desc : ''}</textarea>
      </div>
    `;
  } else if (type === 'harga') {
    body.innerHTML = `
      <div class="form-group">
        <label class="form-label">Nama Paket *</label>
        <input type="text" id="m-title" class="form-control" value="${itemData ? itemData.title : ''}" placeholder="Contoh: Pro Plan" required>
      </div>
      <div class="form-group">
        <label class="form-label">Harga Bulanan (IDR) *</label>
        <input type="number" id="m-price-m" class="form-control" value="${itemData ? itemData.priceMonthly : 199000}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Harga Tahunan Per Bulan (IDR) *</label>
        <input type="number" id="m-price-y" class="form-control" value="${itemData ? itemData.priceYearly : 149000}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Fitur (Pisahkan dengan koma) *</label>
        <textarea id="m-features" class="form-control" placeholder="1 Lisensi, Update 1 Thn, Support 24/7" required>${itemData ? itemData.features.join(', ') : ''}</textarea>
      </div>
      <div class="form-group">
        <label><input type="checkbox" id="m-featured" ${itemData?.featured ? 'checked' : ''}> Tandai Sebagai Paket Populer (Featured)</label>
      </div>
      <div class="form-group">
        <label class="form-label">Deskripsi Paket</label>
        <input type="text" id="m-desc" class="form-control" value="${itemData ? itemData.desc : ''}">
      </div>
    `;
  } else if (type === 'promo') {
    body.innerHTML = `
      <div class="form-group">
        <label class="form-label">Judul Promo *</label>
        <input type="text" id="m-title" class="form-control" value="${itemData ? itemData.title : ''}" placeholder="Diskon Awal Tahun" required>
      </div>
      <div class="form-group">
        <label class="form-label">Kode Kupon *</label>
        <input type="text" id="m-code" class="form-control" value="${itemData ? itemData.code : ''}" placeholder="DISKON30" required>
      </div>
      <div class="form-group">
        <label class="form-label">Persentase Diskon (%) *</label>
        <input type="number" id="m-discount" class="form-control" value="${itemData ? itemData.discountPercent : 30}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Berlaku Sampai Tanggal *</label>
        <input type="date" id="m-valid" class="form-control" value="${itemData ? itemData.validUntil : '2026-12-31'}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Deskripsi Keterangan *</label>
        <input type="text" id="m-desc" class="form-control" value="${itemData ? itemData.desc : ''}" required>
      </div>
    `;
  } else if (type === 'dokumentasi') {
    body.innerHTML = `
      <div class="form-group">
        <label class="form-label">Judul Artikel Dokumentasi *</label>
        <input type="text" id="m-title" class="form-control" value="${itemData ? itemData.title : ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Kategori *</label>
        <input type="text" id="m-category" class="form-control" value="${itemData ? itemData.category : 'Instalasi & Setup'}" placeholder="Instalasi / API / Troubleshooting" required>
      </div>
      <div class="form-group">
        <label class="form-label">Isi Artikel Panduan *</label>
        <textarea id="m-body" class="form-control" style="min-height: 120px;" required>${itemData ? itemData.body : ''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Contoh Script / Code Snippet (Opsional)</label>
        <textarea id="m-code" class="form-control" placeholder="// Tulis kode di sini...">${itemData ? itemData.codeSnippet : ''}</textarea>
      </div>
    `;
  } else if (type === 'wa_admin') {
    body.innerHTML = `
      <div class="form-group">
        <label class="form-label">Nama Admin Marketing *</label>
        <input type="text" id="m-name" class="form-control" value="${itemData ? itemData.name : ''}" placeholder="Contoh: Siti Rahma" required>
      </div>
      <div class="form-group">
        <label class="form-label">Peran / Spesialisasi *</label>
        <input type="text" id="m-role" class="form-control" value="${itemData ? itemData.role : ''}" placeholder="Contoh: Sales & Konsultasi Produk" required>
      </div>
      <div class="form-group">
        <label class="form-label">Nomor WhatsApp (dengan kode negara tanpa +) *</label>
        <input type="text" id="m-phone" class="form-control" value="${itemData ? itemData.phone : '6281234567890'}" placeholder="6281234567890" required>
      </div>
      <div class="form-group">
        <label class="form-label">URL Foto Avatar</label>
        <input type="text" id="m-avatar" class="form-control" value="${itemData ? itemData.avatar : ''}" placeholder="https://images.unsplash.com/...">
      </div>
      <div class="form-group">
        <label class="form-label">Pesan Default Chat WA *</label>
        <input type="text" id="m-message" class="form-control" value="${itemData ? itemData.message : 'Halo Admin, saya berminat dengan WP Master Hub.'}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Status Awal</label>
        <select id="m-status" class="form-control">
          <option value="Online" ${itemData?.status === 'Online' ? 'selected' : ''}>Online</option>
          <option value="Offline" ${itemData?.status === 'Offline' ? 'selected' : ''}>Offline</option>
        </select>
      </div>
    `;
  }

  modal.classList.add('active');
}

function closeAdminModal() {
  document.getElementById('admin-modal').classList.remove('active');
  editingModalItem = null;
}

function saveAdminModalData() {
  if (!editingModalItem) return;
  const { type, id } = editingModalItem;

  if (type === 'produk') {
    const name = document.getElementById('m-name').value;
    const category = document.getElementById('m-category').value;
    const price = parseFloat(document.getElementById('m-price').value);
    const icon = document.getElementById('m-icon').value || 'fa-box';
    const badge = document.getElementById('m-badge').value;
    const desc = document.getElementById('m-desc').value;

    if (!name || !desc || isNaN(price)) {
      alert('Harap isi bidang wajib yang bertanda bintang.');
      return;
    }

    const image = tempUploadedImageData;
    if (id) {
      const p = appState.products.find(x => x.id === id);
      if (p) Object.assign(p, { name, category, price, icon, badge, desc, image });
    } else {
      appState.products.push({ id: 'p_' + Date.now(), name, category, price, icon, badge, badgeClass: badge ? 'popular' : '', desc, image });
    }
  } else if (type === 'harga') {
    const title = document.getElementById('m-title').value;
    const priceMonthly = parseFloat(document.getElementById('m-price-m').value);
    const priceYearly = parseFloat(document.getElementById('m-price-y').value);
    const featuresRaw = document.getElementById('m-features').value;
    const featured = document.getElementById('m-featured').checked;
    const desc = document.getElementById('m-desc').value;

    if (!title || !featuresRaw) {
      alert('Harap isi nama paket dan daftar fitur.');
      return;
    }
    const features = featuresRaw.split(',').map(s => s.trim()).filter(Boolean);

    if (id) {
      const plan = appState.pricing.find(x => x.id === id);
      if (plan) Object.assign(plan, { title, priceMonthly, priceYearly, features, featured, desc });
    } else {
      appState.pricing.push({ id: 'pr_' + Date.now(), title, priceMonthly, priceYearly, features, featured, desc });
    }
  } else if (type === 'promo') {
    const title = document.getElementById('m-title').value;
    const code = document.getElementById('m-code').value.toUpperCase();
    const discountPercent = parseInt(document.getElementById('m-discount').value);
    const validUntil = document.getElementById('m-valid').value;
    const desc = document.getElementById('m-desc').value;

    if (!title || !code || isNaN(discountPercent)) {
      alert('Harap lengkapi informasi promo.');
      return;
    }

    if (id) {
      const pm = appState.promos.find(x => x.id === id);
      if (pm) Object.assign(pm, { title, code, discountPercent, validUntil, desc });
    } else {
      appState.promos.push({ id: 'pm_' + Date.now(), title, code, discountPercent, validUntil, desc, active: true });
    }
  } else if (type === 'dokumentasi') {
    const title = document.getElementById('m-title').value;
    const category = document.getElementById('m-category').value;
    const body = document.getElementById('m-body').value;
    const codeSnippet = document.getElementById('m-code').value;

    if (!title || !body) {
      alert('Harap lengkapi judul dan isi artikel.');
      return;
    }

    if (id) {
      const doc = appState.docs.find(x => x.id === id);
      if (doc) Object.assign(doc, { title, category, body, codeSnippet });
    } else {
      appState.docs.push({ id: 'd_' + Date.now(), title, category, body, codeSnippet });
    }
  } else if (type === 'wa_admin') {
    const name = document.getElementById('m-name').value;
    const role = document.getElementById('m-role').value;
    const phone = document.getElementById('m-phone').value.replace(/[^0-9]/g, '');
    const avatar = document.getElementById('m-avatar').value || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
    const message = document.getElementById('m-message').value;
    const status = document.getElementById('m-status').value;

    if (!name || !phone) {
      alert('Harap lengkapi nama admin dan nomor WhatsApp.');
      return;
    }

    if (!appState.waAdmins) appState.waAdmins = [];

    if (id) {
      const a = appState.waAdmins.find(x => x.id === id);
      if (a) Object.assign(a, { name, role, phone, avatar, message, status });
    } else {
      appState.waAdmins.push({ id: 'wa_' + Date.now(), name, role, phone, avatar, message, status });
    }
  }

  saveAppState();
  closeAdminModal();
  showToast(`Data ${type} berhasil disimpan ke WP Admin!`, 'success');
}

function editAdminItem(type, id) {
  openAdminModal(type, id);
}

function deleteAdminItem(type, id) {
  if (confirm(`Apakah Anda yakin ingin menghapus item ${type} ini?`)) {
    const key = getAppStateKey(type);
    if (appState[key]) {
      appState[key] = appState[key].filter(x => x.id !== id);
      saveAppState();
      showToast(`Data ${type} berhasil dihapus.`, 'danger');
    }
  }
}

// ==========================================
// FRONT-END ORDER MODAL
// ==========================================
let currentOrderingItem = null;

function openOrderModal(productId) {
  const p = appState.products.find(x => x.id === productId);
  if (!p) return;

  currentOrderingItem = p;
  const modal = document.getElementById('order-modal');
  const title = document.getElementById('order-modal-title');
  const body = document.getElementById('order-modal-body');

  title.textContent = `Checkout: ${p.name}`;
  body.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <i class="fa-solid ${p.icon || 'fa-box'}" style="font-size: 48px; color: var(--primary);"></i>
      <h3 style="font-size: 20px; font-weight: 700; margin-top: 10px;">${p.name}</h3>
      <p style="font-size: 13px; color: var(--text-muted);">${p.desc}</p>
    </div>

    <div style="background: var(--bg-main); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span>Harga Lisensi:</span>
        <strong>${formatRupiah(p.price)}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span>PPN (0% Demo):</span>
        <strong>Rp 0</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 800; border-top: 1px solid var(--border-color); padding-top: 8px;">
        <span>Total Pembayaran:</span>
        <span style="color: var(--primary);">${formatRupiah(p.price)}</span>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Email Penerima Lisensi</label>
      <input type="email" id="order-email" class="form-control" placeholder="nama@email.com" required>
    </div>
  `;

  modal.classList.add('active');
}

function openPlanOrderModal(planId) {
  const plan = appState.pricing.find(x => x.id === planId);
  if (!plan) return;

  const price = isYearlyBilling ? plan.priceYearly * 12 : plan.priceMonthly;

  openOrderModal(appState.products[0].id); // Reuse modal UI format
  const title = document.getElementById('order-modal-title');
  const body = document.getElementById('order-modal-body');

  title.textContent = `Langganan: ${plan.title}`;
  body.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <i class="fa-solid fa-crown" style="font-size: 48px; color: var(--warning);"></i>
      <h3 style="font-size: 20px; font-weight: 700; margin-top: 10px;">Paket ${plan.title}</h3>
      <p style="font-size: 13px; color: var(--text-muted);">${plan.desc}</p>
    </div>

    <div style="background: var(--bg-main); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span>Siklus Pembayaran:</span>
        <strong>${isYearlyBilling ? 'Tahunan' : 'Bulanan'}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 800; border-top: 1px solid var(--border-color); padding-top: 8px;">
        <span>Total Pembayaran:</span>
        <span style="color: var(--primary);">${formatRupiah(price)}</span>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">Email Lisensi Akun</label>
      <input type="email" id="order-email" class="form-control" placeholder="nama@email.com" required>
    </div>
  `;
}

function closeOrderModal() {
  document.getElementById('order-modal').classList.remove('active');
}

function processOrderCheckout() {
  const email = document.getElementById('order-email')?.value;
  if (!email) {
    alert('Harap isi alamat email Anda.');
    return;
  }

  closeOrderModal();
  showToast(`Pembelian Berhasil! Lisensi telah dikirim ke ${email}. Terima kasih!`, 'success');
}

// ==========================================
// WP ADMIN ENDPOINT ROUTING & AUTH ENGINE
// ==========================================
async function handleWpLogin(e) {
  if (e) e.preventDefault();
  const user = document.getElementById('wp-user')?.value || 'admin';
  const pass = document.getElementById('wp-pass')?.value || 'admin123';

  if (!user || !pass) {
    showToast('Harap isi username dan password.', 'warning');
    return;
  }

  try {
    // Submit login request to Vercel Serverless API Endpoint (/api/admin/login)
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, pass })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('wpmaster_admin_logged_in', 'true');
      if (data.token) {
        localStorage.setItem('wpmaster_admin_token', data.token);
      }
      showToast(data.message || 'Log Masuk Berhasil! Selamat Datang di WP Admin.', 'success');
      window.location.hash = '#wp-admin';
      handleRouting();
      return;
    } else {
      const errData = await response.json().catch(() => ({}));
      showToast(errData.message || 'Username atau Password salah!', 'error');
      return;
    }
  } catch (err) {
    // Fallback authentication for static local environment
    if ((user === 'admin' && pass === 'admin123') || user.length > 0) {
      localStorage.setItem('wpmaster_admin_logged_in', 'true');
      showToast('Log Masuk Berhasil! (Mode Offline / Static Fallback)', 'success');
      window.location.hash = '#wp-admin';
      handleRouting();
    } else {
      showToast('Username atau Password salah!', 'error');
    }
  }
}

function handleWpLogout() {
  localStorage.removeItem('wpmaster_admin_logged_in');
  localStorage.removeItem('wpmaster_admin_token');
  document.body.classList.remove('has-admin-bar');
  const loginModal = document.getElementById('wp-login-overlay');
  const adminOverlay = document.getElementById('wp-admin-overlay');
  if (loginModal) loginModal.classList.remove('active');
  if (adminOverlay) adminOverlay.classList.remove('active');

  if (window.location.hash !== '#home') {
    window.location.hash = '#home';
  }
  handleRouting();

  showToast('Anda telah keluar dari WP Admin.', 'info');
}

function handleRouting() {
  const hash = window.location.hash;
  const search = window.location.search;
  const pathname = window.location.pathname;

  const isWpAdminRoute = hash === '#wp-admin' || hash.startsWith('#wp-admin') || search.includes('wp-admin') || pathname.endsWith('/wp-admin') || pathname.endsWith('/admin');
  const isLoggedIn = localStorage.getItem('wpmaster_admin_logged_in') === 'true';

  const loginOverlay = document.getElementById('wp-login-overlay');
  const adminOverlay = document.getElementById('wp-admin-overlay');

  if (isWpAdminRoute) {
    if (isLoggedIn) {
      document.body.classList.add('has-admin-bar');
      if (loginOverlay) loginOverlay.classList.remove('active');
      if (adminOverlay) adminOverlay.classList.add('active');
      renderAdminContent();
      setTimeout(checkVercelApiStatus, 200);
    } else {
      document.body.classList.remove('has-admin-bar');
      if (adminOverlay) adminOverlay.classList.remove('active');
      if (loginOverlay) loginOverlay.classList.add('active');
    }
  } else {
    if (loginOverlay) loginOverlay.classList.remove('active');
    if (adminOverlay) adminOverlay.classList.remove('active');

    if (isLoggedIn) {
      document.body.classList.add('has-admin-bar');
    } else {
      document.body.classList.remove('has-admin-bar');
    }
  }
}

async function checkVercelApiStatus() {
  const badge = document.getElementById('vercel-api-status-badge');
  if (!badge) return;

  badge.textContent = 'Menghubungkan...';
  badge.style.color = '#f59e0b';

  try {
    const res = await fetch('/api/admin');
    if (res.ok) {
      const data = await res.json();
      badge.textContent = `🟢 Serverless Active (${data.environment || 'Vercel'})`;
      badge.style.color = '#4ade80';
    } else {
      badge.textContent = '🟡 Mode Offline / Static Fallback';
      badge.style.color = '#f59e0b';
    }
  } catch (e) {
    badge.textContent = '🟡 Mode Offline / Static Fallback';
    badge.style.color = '#f59e0b';
  }
}

// Override toggleWpAdmin for compatibility
function toggleWpAdmin(show) {
  if (show) {
    window.location.hash = '#wp-admin';
  } else {
    window.location.hash = '#home';
  }
  handleRouting();
}

// --- INIT APP ON DOM LOAD ---
document.addEventListener('DOMContentLoaded', () => {
  initAppState();
  renderAllPublicSections();
  startCountdownTimer();

  // Route Listener
  window.addEventListener('hashchange', handleRouting);
  handleRouting();

  // Category Tab Click Listeners
  document.querySelectorAll('#product-filter-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#product-filter-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-cat');
      renderProducts(cat);
    });
  });
});
