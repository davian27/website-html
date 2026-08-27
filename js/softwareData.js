/**
 * Data Katalog Software, Pengaturan Landing Page, FAQ & Testimoni
 * Mendukung pembacaan & penyimpanan dinamis via LocalStorage dari Admin Panel.
 */

// Default Configuration Data
const defaultSiteConfig = {
  storeName: "SoftwareKatalog.id",
  whatsappNumber: "6285165655759",
  supportEmail: "sales@softwarekatalog.id",
  workingHours: "Senin - Sabtu: 08.00 - 21.00 WIB",
  
  // Hero Content
  heroBadge: "Software Desktop & Cloud Gen 2026",
  heroTitlePrefix: "Solusi Software ",
  heroTitleHighlight: "Kasir & ERP",
  heroTitleSuffix: " Terbaik untuk Bisnis Anda",
  heroDesc: "Kelola transaksi kasir, stok gudang, laporan laba rugi, hingga nota digital WhatsApp secara otomatis. Lisensi sekali bayar untuk selamanya (Lifetime) tanpa biaya bulanan tersembunyi.",
  
  // Stats
  statUsers: "1,500+",
  statUsersLabel: "Pengguna Aktif",
  statLicense: "100%",
  statLicenseLabel: "Lisensi Lifetime",
  statRating: "4.9/5",
  statRatingLabel: "Kepuasan Pelanggan",
  
  guarantees: [
    { icon: "fa-shield-halved", title: "Lisensi Lifetime", desc: "Sekali bayar untuk selamanya tanpa biaya berlangganan bulanan." },
    { icon: "fa-download", title: "Installer Instan", desc: "Link download & serial key resmi langsung aktif seketika." },
    { icon: "fa-headset", title: "Support Remote 24/7", desc: "Bantuan instalasi gratis via AnyDesk / TeamViewer." },
    { icon: "fa-rotate-left", title: "Garansi Uang Kembali", desc: "Garansi 100% 14 Hari bila software tidak sesuai spesifikasi." }
  ]
};

const defaultSoftwareCatalog = [
  {
    id: "pos-pro",
    title: "POS Pro Suite 2026",
    tagline: "Sistem Kasir & Manajer Toko Retail Multi-Cabang",
    category: "pos",
    badge: "Best Seller",
    rating: 4.9,
    reviewsCount: 184,
    accentColor: "#3b82f6",
    themeGradient: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(147,51,234,0.1))",
    icon: "fa-calculator",
    image: "assets/hero.png",
    description: "Software kasir desktop dan cloud generasi terbaru yang dirancang khusus untuk toko retail, minimarket, distro, dan grosir. Mendukung barcode scanner, cetak struk thermal, sinkronisasi antar cabang, dan laporan keuangan komprehensif tanpa biaya langganan bulanan.",
    prices: {
      standard: { label: "Standard Desktop", price: "750.000", period: "Sekali Bayar (Lifetime)", note: "1 Komputer / PC Kasir" },
      pro: { label: "Pro Multi-PC", price: "1.490.000", period: "Sekali Bayar (Lifetime)", note: "Hingga 5 PC (Jaringan LAN)" },
      enterprise: { label: "Enterprise Cloud", price: "2.850.000", period: "Sekali Bayar (Lifetime)", note: "Unlimited PC + Cloud Sync Mobile App" }
    },
    features: [
      { title: "Kasir & Transaksi Super Cepat", desc: "Mendukung scan barcode otomatis, shortcut keyboard, bayar tunai/QRIS/Debit, serta cetak struk thermal.", icon: "fa-bolt" },
      { title: "Manajemen Stok & Mutasi Real-time", desc: "Melacak stok masuk, stok keluar, opname harian, kartu stok otomatis, serta notifikasi limit minimum.", icon: "fa-boxes-stacked" },
      { title: "Multi Harga & Grosir Bertingkat", desc: "Pengaturan harga jual acuan grosir/eceran, diskon member, dan harga promosi bertingkat.", icon: "fa-tags" },
      { title: "Laporan Keuangan & Laba Rugi Otomatis", desc: "Grafik omset harian, laporan laba bersih, Top Selling, neraca singkat, dan ekspor ke Excel/PDF.", icon: "fa-chart-line" },
      { title: "Struk Digital via WhatsApp", desc: "Kirim bukti pembayaran/nota transaksi langsung ke WhatsApp pelanggan secara otomatis.", icon: "fa-paper-plane" },
      { title: "Manajemen Shift Kasir & Hak Akses", desc: "Pencatatan kas awal shift, rekap setoran kasir akhir shift, dan otoritas admin vs kasir.", icon: "fa-user-shield" }
    ],
    specs: [
      { label: "Sistem Operasi", val: "Windows 10 / 11 (32-bit & 64-bit)" },
      { label: "Framework", val: ".NET Runtime 8.0 Desktop" },
      { label: "Database", val: "SQLite (Standalone) / PostgreSQL (Network)" },
      { label: "Hardware Support", val: "Printer Thermal USB/Bluetooth, Cash Drawer, Barcode Scanner" },
      { label: "Persyaratan Minimum", val: "RAM 4 GB, Storage 500 MB Free Space" }
    ]
  },
  {
    id: "resto-master",
    title: "Resto & Cafe Touch Master",
    tagline: "Kasir Restoran Layar Sentuh & KDS (Kitchen Display System)",
    category: "resto",
    badge: "Terpopuler",
    rating: 4.8,
    reviewsCount: 142,
    accentColor: "#10b981",
    themeGradient: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.1))",
    icon: "fa-utensils",
    image: "assets/hero.png",
    description: "Solusi lengkap manajemen restoran, kafe, dan warung kopi. Mengintegrasikan kasir pesanan meja, layar dapur (Kitchen Display), manajemen resep/bahan baku, split bill, hingga cetak pesanan otomatis ke dapur & bar.",
    prices: {
      standard: { label: "Resto Basic", price: "890.000", period: "Sekali Bayar (Lifetime)", note: "1 POS Kasir + Order Meja" },
      pro: { label: "Resto Pro & Kitchen", price: "1.750.000", period: "Sekali Bayar (Lifetime)", note: "Kasir + Kitchen Display + Tablet Waiter" },
      enterprise: { label: "Multi Resto & Chain", price: "3.200.000", period: "Sekali Bayar (Lifetime)", note: "Full Kitchen Routing + Menu Central Cloud" }
    },
    features: [
      { title: "Visual Floor Plan & Manajemen Meja", desc: "Tampilan denah meja interaktif untuk cek status meja kosong, terisi, reservasi, atau gabung meja.", icon: "fa-chair" },
      { title: "Kitchen Routing & Kitchen Display (KDS)", desc: "Pesanan dari kasir/waiter langsung terkirim otomatis ke printer dapur & layar koki secara realtime.", icon: "fa-fire-burner" },
      { title: "Split Bill & Joint Payment", desc: "Memudahkan pelanggan membagi pembayaran per menu atau kombinasi metode bayar tunai & QRIS.", icon: "fa-receipt" },
      { title: "Resep (BOM) & HPP Bahan Baku", desc: "Stok bahan baku (daging, beras, sirup, dll) terpotong otomatis setiap kali menu makanan terjual.", icon: "fa-mortar-pestle" },
      { title: "Menu Variant & Add-on Topping", desc: "Dukungan varian menu (Hot/Ice, Sugar Level) dan pilihan topping ekstra dengan kalkulasi otomatis.", icon: "fa-list-check" },
      { title: "Laporan Per Jam Peak Hour", desc: "Analisis jam sibuk restoran, rata-rata waktu penyajian makanan, serta daftar menu terfavorit.", icon: "fa-clock" }
    ],
    specs: [
      { label: "Sistem Operasi", val: "Windows 10 / 11, Touchscreen Tablet Ready" },
      { label: "Framework", val: ".NET 8 WPF / Touch Interface Engine" },
      { label: "Database", val: "SQLite & High-Speed Local Websocket Server" },
      { label: "Perangkat Pendukung", val: "Kitchen Printer LAN/Wi-Fi, Kitchen Display Monitor, POS Touchscreen" },
      { label: "Persyaratan Minimum", val: "RAM 4 GB, Layar Support Touch / Resolusi 1080p" }
    ]
  },
  {
    id: "inventory-erp",
    title: "Inventory & Warehouse ERP",
    tagline: "Sistem Manajemen Stok Gudang, Pembelian & Mutasi",
    category: "inventory",
    badge: "Rekomendasi ERP",
    rating: 4.9,
    reviewsCount: 96,
    accentColor: "#8b5cf6",
    themeGradient: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.1))",
    icon: "fa-boxes-packing",
    image: "assets/hero.png",
    description: "Software pengelolaan inventaris tingkat lanjut untuk pabrik, distributor, grosir, dan multi-gudang. Fitur mutasi barang, PO supplier, penerimaan barang, pelacakan nomor seri / batch, dan kartu stok akurat.",
    prices: {
      standard: { label: "Single Warehouse", price: "950.000", period: "Sekali Bayar (Lifetime)", note: "1 Lokasi Gudang / Toko Utama" },
      pro: { label: "Multi Warehouse Pro", price: "1.890.000", period: "Sekali Bayar (Lifetime)", note: "Hingga 5 Lokasi Gudang + Mutasi" },
      enterprise: { label: "Enterprise ERP", price: "3.500.000", period: "Sekali Bayar (Lifetime)", note: "Unlimited Gudang + Modul Manufaktur & HPP" }
    },
    features: [
      { title: "Multi Gudang & Mutasi Antar Gudang", desc: "Transfer barang antar gudang dengan dokumen Surat Jalan resmi dan konfirmasi penerimaan.", icon: "fa-truck-ramp-box" },
      { title: "Tracking Serial Number & Batch Number", desc: "Sangat cocok untuk produk elektronik atau farmasi yang membutuhkan pelacakan garansi.", icon: "fa-barcode" },
      { title: "Purchase Order (PO) & Supplier Portal", desc: "Buat PO otomatis ke supplier ketika stok menyentuh Reorder Level dan pelacakan utang.", icon: "fa-file-invoice-dollar" },
      { title: "Kartu Stok & Audit Opname", desc: "Kartu stok FIFO/Average detail per detik, serta fitur Stock Opname cepat dengan scanner.", icon: "fa-clipboard-check" },
      { title: "Peringatan Stok Mati & Slow Moving", desc: "Deteksi produk yang jarang laku (Slow Moving) agar dapat segera dipromosikan.", icon: "fa-triangle-exclamation" },
      { title: "Export Data Kompatibel Akuntansi", desc: "Ekspor jurnal mutasi ke format CSV/Excel siap impor ke software akuntansi populer.", icon: "fa-file-excel" }
    ],
    specs: [
      { label: "Sistem Operasi", val: "Windows 10 / 11 Server & Client" },
      { label: "Framework", val: ".NET Core 8 / WinForms High-Performance" },
      { label: "Database", val: "Microsoft SQL Server / PostgreSQL" },
      { label: "Perangkat Pendukung", val: "Barcode Scanner Wireless, Printer Label Thermal" },
      { label: "Persyaratan Minimum", val: "RAM 8 GB, Storage 1 GB Free Space" }
    ]
  },
  {
    id: "apotek-master",
    title: "Apotek & Klinik Master",
    tagline: "Software Rekam Medis Pasien, Farmasi & Kasir Obat",
    category: "health",
    badge: "Rekomendasi Medik",
    rating: 5.0,
    reviewsCount: 78,
    accentColor: "#06b6d4",
    themeGradient: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(59,130,246,0.1))",
    icon: "fa-kit-medical",
    image: "assets/hero.png",
    description: "Sistem informasi manajemen apotek dan klinik terintegrasi. Mengelola rekam medis elektronik (RME) pasien, resep dokter, obat racikan, kontrol tanggal kadaluarsa (Expired Date), serta laporan regulasi farmasi.",
    prices: {
      standard: { label: "Apotek Solo", price: "990.000", period: "Sekali Bayar (Lifetime)", note: "Modul Kasir Obat & Stok Expired" },
      pro: { label: "Apotek + Klinik", price: "1.950.000", period: "Sekali Bayar (Lifetime)", note: "Rekam Medis Dokter + Kasir Farmasi" },
      enterprise: { label: "Klinik Utama & Lab", price: "3.800.000", period: "Sekali Bayar (Lifetime)", note: "RME Elektronik + Laboratorium & Sync BPJS" }
    },
    features: [
      { title: "Peringatan Kadaluarsa Obat (FEFO)", desc: "Sistem rekomendasi pengeluaran obat berdasarkan First Expired First Out (FEFO).", icon: "fa-calendar-xmark" },
      { title: "Kalkulator Obat Racikan & Dosis", desc: "Hitung otomatis kebutuhan bahan obat racikan beserta biaya jasa racik dokter.", icon: "fa-pills" },
      { title: "Rekam Medis Elektronik (RME)", desc: "Pencatatan riwayat penyakit pasien, diagnosa ICD-10, dan lampiran resep dokter.", icon: "fa-file-medical" },
      { title: "Surat Izin & Laporan Psikotropika", desc: "Laporan penjualan obat terbatas yang memenuhi format standar Dinas Kesehatan.", icon: "fa-notes-medical" },
      { title: "Antrean Pasien & Cetak Nomor", desc: "Sistem pemanggilan nomor antrean pendaftaran klinik dan pengambilan obat.", icon: "fa-users-line" },
      { title: "Cetak Etiket Aturan Pakai Obat", desc: "Cetak etiket stiker obat (3x Sehari 1 Tablet) langsung ke printer stiker.", icon: "fa-print" }
    ],
    specs: [
      { label: "Sistem Operasi", val: "Windows 10 / 11" },
      { label: "Framework", val: ".NET 8 Enterprise Framework" },
      { label: "Database", val: "Encrypted SQLite / PostgreSQL" },
      { label: "Perangkat Pendukung", val: "Printer Stiker Etiket Thermal, Barcode Scanner 2D" },
      { label: "Persyaratan Minimum", val: "RAM 4 GB, Dual Core CPU" }
    ]
  },
  {
    id: "laundry-pro",
    title: "Laundry Pro Enterprise",
    tagline: "Software Kasir Laundry Kiloan, Satuan & Auto WA Status",
    category: "service",
    badge: "Super Praktis",
    rating: 4.8,
    reviewsCount: 110,
    accentColor: "#ec4899",
    themeGradient: "linear-gradient(135deg, rgba(236,72,153,0.2), rgba(168,85,247,0.1))",
    icon: "fa-shirt",
    image: "assets/hero.png",
    description: "Aplikasi khusus usaha laundry kiloan, laundry satuan, sepatu, dan karpet. Dilengkapi fitur cetak nota laundry, penomoran rak simpan, tracking status, dan notifikasi WhatsApp otomatis saat cucian selesai.",
    prices: {
      standard: { label: "Laundry Basic", price: "550.000", period: "Sekali Bayar (Lifetime)", note: "Kasir Kiloan & Satuan + Struk Nota" },
      pro: { label: "Laundry WA Pro", price: "980.000", period: "Sekali Bayar (Lifetime)", note: "Auto WhatsApp Notification + Tracking QR" },
      enterprise: { label: "Laundry Multi Outlet", price: "1.950.000", period: "Sekali Bayar (Lifetime)", note: "Multi Outlet + Deposit Langganan Pelanggan" }
    },
    features: [
      { title: "Tracking Status Laundry Real-time", desc: "Proses pencucian terpantau jelas: Diterima -> Dicuci -> Dikerringkan -> Siap Diambil.", icon: "fa-diagram-project" },
      { title: "Notifikasi Otomatis via WhatsApp", desc: "Sistem mengirimkan pesan WA otomatis ke pelanggan begitu cucian siap diambil.", icon: "fa-comment-dots" },
      { title: "Nota Laundry & Label Rak Storage", desc: "Cetak 2 rangkap nota laundry (untuk pelanggan & disematkan pada kantong plastik).", icon: "fa-tags" },
      { title: "Paket Deposit & Member Kiloan", desc: "Fitur saldo deposit pelanggan dengan pemotongan kuota otomatis tiap transaksi.", icon: "fa-wallet" },
      { title: "Kelola Komisi Karyawan", desc: "Hitung otomatis komisi per kg/potong untuk bagian pencuci dan penyetrika.", icon: "fa-hand-holding-dollar" },
      { title: "Laporan Omset & Operasional", desc: "Statistik harian jumlah cucian masuk (kg), pendapatan tunai vs non-tunai.", icon: "fa-chart-pie" }
    ],
    specs: [
      { label: "Sistem Operasi", val: "Windows 10 / 11" },
      { label: "Framework", val: ".NET 8 Desktop Engine" },
      { label: "Database", val: "Embedded Fast DB" },
      { label: "Perangkat Pendukung", val: "Printer Bluetooth / USB Thermal 58mm & Timbangan Sync" },
      { label: "Persyaratan Minimum", val: "RAM 4 GB" }
    ]
  },
  {
    id: "bengkel-service",
    title: "Bengkel & Service Master",
    tagline: "Software Manajemen Servis Kendaraan, Sparepart & Nota Digital",
    category: "service",
    badge: "Best Automotive",
    rating: 4.9,
    reviewsCount: 89,
    accentColor: "#f59e0b",
    themeGradient: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(239,68,68,0.1))",
    icon: "fa-wrench",
    image: "assets/hero.png",
    description: "Software khusus bengkel mobil, motor, dan pusat perbaikan elektronik. Mengelola Work Order (WO) servis, stok sparepart, komisi mekanik/teknisi, riwayat servis plat nomor kendaraan, dan cetak estimasi biaya.",
    prices: {
      standard: { label: "Bengkel Standar", price: "690.000", period: "Sekali Bayar (Lifetime)", note: "Kasir Servis + Stok Sparepart" },
      pro: { label: "Bengkel Pro & Komisi", price: "1.250.000", period: "Sekali Bayar (Lifetime)", note: "Work Order (WO) + Komisi Mekanik & Riwayat Plat" },
      enterprise: { label: "Chain Service Center", price: "2.450.000", period: "Sekali Bayar (Lifetime)", note: "Multi Cabang + Reminder Service Berkala WA" }
    },
    features: [
      { title: "Work Order (WO) & Estimasi Biaya", desc: "Penerimaan kendaraan masuk, keluhan pelanggan, estimasi sparepart & jasa.", icon: "fa-file-signature" },
      { title: "Riwayat Servis per Plat Nomor", desc: "Cukup ketik nomor plat kendaraan untuk melihat seluruh histori perbaikan.", icon: "fa-car-side" },
      { title: "Kalkulator Komisi Mekanik Auto", desc: "Perhitungan komisi persen atau nominal flat untuk tiap mekanik.", icon: "fa-percent" },
      { title: "Penjualan Sparepart & Jasa Servis", desc: "Menggabungkan komponen biaya suku cadang dan ongkos jasa montir.", icon: "fa-screws-tilting" },
      { title: "Pesan Pengingat Servis Berkala (WA)", desc: "Kirim pesan pengingat ganti oli / servis berkala otomatis via WhatsApp.", icon: "fa-bell" },
      { title: "Stok Sparepart & Barcode Rak", desc: "Pencatatan stok onderdil dengan kode part number dan lokasi rak.", icon: "fa-gears" }
    ],
    specs: [
      { label: "Sistem Operasi", val: "Windows 10 / 11" },
      { label: "Framework", val: ".NET 8 Desktop Framework" },
      { label: "Database", val: "SQLite High Performance" },
      { label: "Perangkat Pendukung", val: "Printer Struk Thermal / Struk Dot Matrix A4" },
      { label: "Persyaratan Minimum", val: "RAM 4 GB" }
    ]
  }
];

const defaultTestimonials = [
  {
    id: "testi-1",
    author: "Lorem Ipsum",
    role: "Lorem Ipsum",
    rating: 5,
    quote: "POS Pro Suite benar-benar membantu bisnis saya. Dulu pusing dengan selisih stok, sekarang tiap malam omset dan mutasi stok otomatis rekap via WhatsApp."
  },
  {
    id: "testi-2",
    author: "Lorem Ipsum",
    role: "Lorem Ipsum",
    rating: 5,
    quote: "Resto Touch Master-nya sangat cepat! Pesanan dari kasir layar sentuh langsung nge-print di dapur dan bar. Pelayanan bisnis kami jadi 2x lebih cepat."
  },
  {
    id: "testi-3",
    author: "Lorem Ipsum",
    role: "Lorem Ipsum",
    rating: 5,
    quote: "Apotek & Klinik Master sangat membantu pengawasan obat expired (FEFO). Rekam medis juga tersimpan rapi. Pelayanan tim teknologinya sangat responsif."
  }
];

const defaultFaqs = [
  {
    id: "faq-1",
    question: "Apakah lisensi software ini benar-benar sekali bayar (Lifetime)?",
    answer: "Ya, 100% Sekali Bayar. Anda tidak perlu membayar iuran langganan bulanan atau tahunan. Software dapat digunakan tanpa batas waktu."
  },
  {
    id: "faq-2",
    question: "Bagaimana alur pembelian dan penerimaan software?",
    answer: "Setelah konfirmasi pembayaran via WhatsApp/Transfer, file installer resmi, panduan buku petunjuk, dan Serial Key Lisensi akan dikirimkan langsung via WhatsApp dan Email Anda dalam hitungan menit."
  },
  {
    id: "faq-3",
    question: "Bagaimana jika saya butuh bantuan instalasi di komputer saya?",
    answer: "Tim teknisi kami siap melakukan instalasi dan setting printer kasir/scanner secara GRATIS via kendali jarak jauh (AnyDesk atau TeamViewer)."
  },
  {
    id: "faq-4",
    question: "Apakah software ini bisa digunakan saat tidak ada jaringan internet (Offline)?",
    answer: "Bisa. Seluruh software kami berbasis Offline-First, sehingga seluruh transaksi kasir dan pencatatan stok tetap berjalan lancar 100% meskipun koneksi internet terputus."
  }
];

/* ===================================================
   Dynamic Getters & Setters (LocalStorage Integration)
   =================================================== */

function getDynamicSiteConfig() {
  const custom = localStorage.getItem("sk_site_config");
  if (custom) {
    try {
      return { ...defaultSiteConfig, ...JSON.parse(custom) };
    } catch (e) {
      return defaultSiteConfig;
    }
  }
  return defaultSiteConfig;
}

function saveDynamicSiteConfig(configObj) {
  localStorage.setItem("sk_site_config", JSON.stringify(configObj));
}

function getDynamicCatalog() {
  const custom = localStorage.getItem("sk_software_catalog");
  if (custom) {
    try {
      return JSON.parse(custom);
    } catch (e) {
      return defaultSoftwareCatalog;
    }
  }
  return defaultSoftwareCatalog;
}

function saveDynamicCatalog(catalogArray) {
  localStorage.setItem("sk_software_catalog", JSON.stringify(catalogArray));
}

function getDynamicTestimonials() {
  const custom = localStorage.getItem("sk_testimonials_list");
  if (custom) {
    try {
      return JSON.parse(custom);
    } catch (e) {
      return defaultTestimonials;
    }
  }
  return defaultTestimonials;
}

function saveDynamicTestimonials(testiArray) {
  localStorage.setItem("sk_testimonials_list", JSON.stringify(testiArray));
}

function getDynamicFaqs() {
  const custom = localStorage.getItem("sk_faq_list");
  if (custom) {
    try {
      return JSON.parse(custom);
    } catch (e) {
      return defaultFaqs;
    }
  }
  return defaultFaqs;
}

function saveDynamicFaqs(faqArray) {
  localStorage.setItem("sk_faq_list", JSON.stringify(faqArray));
}

function resetAllDataToDefault() {
  localStorage.removeItem("sk_site_config");
  localStorage.removeItem("sk_software_catalog");
  localStorage.removeItem("sk_testimonials_list");
  localStorage.removeItem("sk_faq_list");
}

// Global Aliases for Compatibility
let siteConfig = getDynamicSiteConfig();
let softwareCatalog = getDynamicCatalog();
