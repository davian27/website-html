/**
 * Data Artikel & Blog Portal
 * Menyimpan data artikel default dan mengelola penyimpanan artikel baru di localStorage.
 */

const defaultArticles = [
  {
    id: "art-1",
    title: "5 Tips Memilih Software Kasir POS Terbaik untuk Toko Retail di 2026",
    slug: "5-tips-memilih-software-kasir-pos-2026",
    category: "Tips & Trik",
    excerpt: "Panduan lengkap memilih software kasir POS yang tepat untuk meningkatkan efisiensi toko, mencegah selisih kasir, dan menghemat biaya operasional.",
    content: `
<h2>Mengapa Software Kasir POS Sangat Penting?</h2>
<p>Di era serba digital saat ini, mengelola toko retail atau minimarket secara manual menggunakan mesin kasir konvensional sudah sangat ketinggalan zaman. Software Point of Sale (POS) modern tidak hanya mencatat transaksi penjualan, tetapi juga mengintegrasikan manajemen stok, laporan keuangan, dan analisis perilaku konsumen.</p>

<h3>1. Pilih Software dengan Fitur Offline-First</h3>
<p>Koneksi internet tidak selalu stabil 100%. Pastikan software kasir yang Anda pilih dapat beroperasi secara **Offline-First**, sehingga transaksi kasir tetap dapat berjalan lancar saat koneksi terputus tanpa risiko data hilang.</p>

<h3>2. Dukungan Lisensi Lifetime (Sekali Bayar)</h3>
<p>Hindari pemborosan biaya bulanan yang membengkak seiring berjalannya waktu. Memilih software lisensi **sekali bayar untuk selamanya** akan menghemat anggaran operasional usaha Anda hingga jutaan rupiah per tahun.</p>

<h3>3. Integrasi Scan Barcode & Cetak Struk Thermal</h3>
<p>Kecepatan antrean kasir adalah kunci kepuasan pelanggan. Pastikan software kasir mendukung barcode scanner USB/Wireless dan printer thermal 58mm/80mm tanpa instalasi driver yang rumit.</p>

<h3>4. Fitur Laporan Laba Rugi Real-time</h3>
<p>Software yang baik wajib mampu menampilkan omset harian, keuntungan bersih per produk, produk terlaris (Top Selling), dan laporan neraca dalam sekali klik.</p>

<h3>5. Kemudahan Penggunaan (User-Friendly UI)</h3>
<p>Staf kasir seringkali berganti. Desain antarmuka yang intuitif dan mudah dipelajari hanya dalam hitungan menit akan mengurangi waktu pelatihan karyawan baru.</p>
    `,
    author: "Tim Redaksi SoftwareKatalog",
    readTime: "4 min baca",
    date: "14 Agu 2026",
    image: "assets/hero.png",
    accentColor: "#3b82f6"
  },
  {
    id: "art-2",
    title: "Panduan Manajemen Stok Gudang: Bebas Selisih dengan Metode FEFO",
    slug: "panduan-manajemen-stok-gudang-fefo",
    category: "Manajemen Stok",
    excerpt: "Cara efektif mengelola mutasi barang antar gudang, mencegah barang expired, dan mengaudit stock opname tanpa menghentikan jualan.",
    content: `
<h2>Menghindari Kerugian Akibat Barang Kadaluarsa</h2>
<p>Salah satu pemicu utama kerugian toko retail, minimarket, dan apotek adalah barang yang kadaluarsa sebelum terjual. Oleh karena itu, penerapan metode **First Expired, First Out (FEFO)** wajib didukung oleh sistem perangkat lunak yang andal.</p>

<h3>Manfaat Utama Metode FEFO dalam Sistem ERP:</h3>
<ul>
  <li><strong>Peringatan Otomatis:</strong> Notifikasi saat barang mendekati masa kadaluarsa (30/60/90 hari sebelumnya).</li>
  <li><strong>Pencegahan Barang Mati:</strong> Mengidentifikasi produk slow moving agar dapat segera dibuatkan paket promo.</li>
  <li><strong>Audit Stock Opname Cepat:</strong> Scan barcode fisik barang untuk mencocokkan stok fisik vs stok sistem secara otomatis.</li>
</ul>
    `,
    author: "Ahli Manajemen Inventaris",
    readTime: "5 min baca",
    date: "12 Agu 2026",
    image: "assets/hero.png",
    accentColor: "#8b5cf6"
  },
  {
    id: "art-3",
    title: "Lisensi Lifetime vs Berlangganan Bulanan: Mana Yang Lebih Hemat?",
    slug: "lisensi-lifetime-vs-berlangganan-bulanan",
    category: "Panduan Bisnis",
    excerpt: "Analisis kalkulasi biaya jangka panjang antara software lisensi beli putus (Lifetime) dibandingkan sistem SaaS bayar bulanan.",
    content: `
<h2>Perbandingan Biaya 3 Tahun Operasional Bisnis</h2>
<p>Banyak pemilik bisnis terjebak dengan biaya berlangganan murah di awal (misal Rp 200.000/bulan per kasir). Namun jika dihitung dalam jangka waktu 3 tahun:</p>

<blockquote>"Biaya langganan bulanan Rp 200.000 x 36 Bulan = Rp 7.200.000 untuk 1 PC. Sementara lisensi Lifetime POS Pro hanya Rp 750.000 sekali bayar untuk selamanya."</blockquote>

<h3>Kesimpulan</h3>
<p>Menggunakan software lisensi Lifetime memberikan kepastian aset software tanpa risiko pemblokiran akun saat lupa membayar iuran bulanan.</p>
    `,
    author: "Tim Konsultan Finansial",
    readTime: "3 min baca",
    date: "10 Agu 2026",
    image: "assets/hero.png",
    accentColor: "#10b981"
  }
];

// Helper Functions for LocalStorage Persistence
function getStoredArticles() {
  const custom = localStorage.getItem("sk_custom_articles");
  if (custom) {
    try {
      const parsed = JSON.parse(custom);
      return [...parsed, ...defaultArticles];
    } catch (e) {
      return defaultArticles;
    }
  }
  return defaultArticles;
}

function saveNewArticle(articleData) {
  const custom = JSON.parse(localStorage.getItem("sk_custom_articles") || "[]");
  const newArticle = {
    id: "art-custom-" + Date.now(),
    title: articleData.title,
    slug: articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    category: articleData.category || "Umum",
    excerpt: articleData.excerpt || articleData.content.replace(/<[^>]*>?/gm, "").substring(0, 120) + "...",
    content: articleData.content,
    author: articleData.author || "Admin Penulis",
    readTime: Math.max(1, Math.ceil(articleData.content.split(" ").length / 150)) + " min baca",
    date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    image: articleData.image || "assets/hero.png",
    accentColor: articleData.accentColor || "#3b82f6"
  };

  custom.unshift(newArticle);
  localStorage.setItem("sk_custom_articles", JSON.stringify(custom));
  return newArticle;
}

function deleteStoredArticle(id) {
  let custom = JSON.parse(localStorage.getItem("sk_custom_articles") || "[]");
  custom = custom.filter(a => a.id !== id);
  localStorage.setItem("sk_custom_articles", JSON.stringify(custom));
}
