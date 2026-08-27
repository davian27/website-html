/**
 * Article App Logic - Blog Portal & Article Writer Editor
 */

document.addEventListener("DOMContentLoaded", () => {
  let currentCategory = "all";
  let searchQuery = "";
  let currentArticles = [];

  // DOM Elements
  const articlesGrid = document.getElementById("articlesGrid");
  const filterBtns = document.querySelectorAll(".article-filter-btn");
  const searchInput = document.getElementById("searchArticleInput");
  const searchClearBtn = document.getElementById("searchClearBtn");
  
  // View Switchers
  const viewBlogSection = document.getElementById("viewBlogSection");
  const viewWriterSection = document.getElementById("viewWriterSection");
  const openWriterBtn = document.getElementById("openWriterBtn");
  const cancelWriterBtn = document.getElementById("cancelWriterBtn");
  
  // Form Elements
  const articleForm = document.getElementById("articleForm");
  const inputTitle = document.getElementById("inputTitle");
  const inputCategory = document.getElementById("inputCategory");
  const inputAuthor = document.getElementById("inputAuthor");
  const inputImage = document.getElementById("inputImage");
  const inputExcerpt = document.getElementById("inputExcerpt");
  const inputContent = document.getElementById("inputContent");
  const livePreview = document.getElementById("livePreview");
  
  // Reader Modal Elements
  const readerModal = document.getElementById("readerModal");
  const readerCloseBtn = document.getElementById("readerCloseBtn");
  const readerTitle = document.getElementById("readerTitle");
  const readerMeta = document.getElementById("readerMeta");
  const readerCategory = document.getElementById("readerCategory");
  const readerImage = document.getElementById("readerImage");
  const readerBody = document.getElementById("readerBody");

  // Theme Initializer
  initTheme();
  loadArticles();
  setupEventListeners();

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
     Load & Render Articles
     ========================================== */
  function loadArticles() {
    if (typeof getStoredArticles === "function") {
      currentArticles = getStoredArticles();
    }
    renderArticles();
  }

  function renderArticles() {
    if (!articlesGrid) return;

    const filtered = currentArticles.filter(art => {
      const matchCat = currentCategory === "all" || art.category.toLowerCase() === currentCategory.toLowerCase();
      const matchSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      articlesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;">
            <i class="fa-solid fa-newspaper"></i>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Tidak Ada Artikel Ditemukan</h3>
          <p style="color: var(--text-secondary);">Coba sesuaikan kata kunci pencarian atau buat artikel baru!</p>
        </div>
      `;
      return;
    }

    articlesGrid.innerHTML = filtered.map(art => `
      <article class="article-card" data-id="${art.id}">
        <div class="article-card-cover" style="background-image: url('${art.image}');">
          <div class="article-card-overlay"></div>
          <span class="article-badge" style="background: ${art.accentColor || '#3b82f6'};">${art.category}</span>
        </div>
        <div class="article-card-body">
          <div class="article-meta">
            <span><i class="fa-regular fa-calendar"></i> ${art.date}</span>
            <span><i class="fa-regular fa-clock"></i> ${art.readTime}</span>
          </div>
          <h3 class="article-card-title">${art.title}</h3>
          <p class="article-card-excerpt">${art.excerpt}</p>
          <div class="article-card-footer">
            <div class="article-author">
              <div class="author-avatar-sm">${art.author.charAt(0)}</div>
              <span class="author-name-sm">${art.author}</span>
            </div>
            <button class="btn-secondary read-article-btn" data-id="${art.id}" style="padding: 0.45rem 0.95rem; font-size: 0.82rem;">
              Baca <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </article>
    `).join("");

    // Bind Read Buttons
    document.querySelectorAll(".read-article-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openReaderModal(btn.getAttribute("data-id"));
      });
    });

    document.querySelectorAll(".article-card").forEach(card => {
      card.addEventListener("click", () => {
        openReaderModal(card.getAttribute("data-id"));
      });
    });
  }

  /* ==========================================
     Open Article Reader Modal
     ========================================== */
  function openReaderModal(id) {
    const art = currentArticles.find(a => a.id === id);
    if (!art || !readerModal) return;

    readerTitle.textContent = art.title;
    readerCategory.textContent = art.category;
    readerCategory.style.background = art.accentColor || "#3b82f6";
    readerMeta.innerHTML = `<i class="fa-regular fa-user"></i> ${art.author} &bull; <i class="fa-regular fa-calendar"></i> ${art.date} &bull; <i class="fa-regular fa-clock"></i> ${art.readTime}`;
    readerImage.src = art.image;
    readerBody.innerHTML = art.content;

    readerModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeReaderModal() {
    if (readerModal) {
      readerModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  /* ==========================================
     Editor Formatting Toolbar
     ========================================== */
  document.querySelectorAll(".editor-tool-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tag = btn.getAttribute("data-tag");
      insertTag(tag);
    });
  });

  function insertTag(tag) {
    if (!inputContent) return;
    const start = inputContent.selectionStart;
    const end = inputContent.selectionEnd;
    const selected = inputContent.value.substring(start, end) || "Teks contoh di sini";

    let formatted = "";
    switch(tag) {
      case "b": formatted = `<b>${selected}</b>`; break;
      case "i": formatted = `<i>${selected}</i>`; break;
      case "h2": formatted = `\n<h2>${selected}</h2>\n`; break;
      case "h3": formatted = `\n<h3>${selected}</h3>\n`; break;
      case "ul": formatted = `\n<ul>\n  <li>${selected}</li>\n</ul>\n`; break;
      case "quote": formatted = `\n<blockquote>${selected}</blockquote>\n`; break;
      case "code": formatted = `\n<pre><code>${selected}</code></pre>\n`; break;
      case "img": formatted = `\n<img src="${selected}" alt="Gambar Artikel" style="max-width:100%; border-radius:12px; margin:1rem 0;">\n`; break;
      default: formatted = selected;
    }

    inputContent.value = inputContent.value.substring(0, start) + formatted + inputContent.value.substring(end);
    updateLivePreview();
  }

  if (inputContent) {
    inputContent.addEventListener("input", updateLivePreview);
  }
  if (inputTitle) {
    inputTitle.addEventListener("input", updateLivePreview);
  }

  function updateLivePreview() {
    if (!livePreview) return;
    const titleVal = inputTitle.value || "Judul Artikel Anda Akan Muncul Di Sini";
    const contentVal = inputContent.value || "<p style='color:var(--text-muted);'>Tulis konten artikel Anda di kolom sebelah kiri untuk melihat hasil tampilan di sini...</p>";

    livePreview.innerHTML = `
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-primary);">${titleVal}</h2>
      <div class="article-formatted-content">${contentVal}</div>
    `;
  }

  /* ==========================================
     Article Form Submit Handler
     ========================================== */
  if (articleForm) {
    articleForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = inputTitle.value.trim();
      const category = inputCategory.value;
      const author = inputAuthor.value.trim() || "Admin Penulis";
      const image = inputImage.value.trim() || "assets/hero.png";
      const excerpt = inputExcerpt.value.trim();
      const content = inputContent.value.trim();

      if (!title || !content) {
        alert("Judul dan Konten Artikel wajib diisi!");
        return;
      }

      if (typeof saveNewArticle === "function") {
        saveNewArticle({ title, category, author, image, excerpt, content });
      }

      alert("🎉 Artikel berhasil dipublikasikan!");
      articleForm.reset();
      updateLivePreview();

      // Switch back to blog view
      switchView("blog");
      loadArticles();
    });
  }

  /* ==========================================
     View Switcher (Blog vs Writer Panel)
     ========================================== */
  function switchView(viewName) {
    if (viewName === "writer") {
      viewBlogSection.style.display = "none";
      viewWriterSection.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      viewBlogSection.style.display = "block";
      viewWriterSection.style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (openWriterBtn) openWriterBtn.addEventListener("click", () => switchView("writer"));
  if (cancelWriterBtn) cancelWriterBtn.addEventListener("click", () => switchView("blog"));

  /* ==========================================
     Search & Filters
     ========================================== */
  function setupEventListeners() {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.getAttribute("data-category");
        renderArticles();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        searchClearBtn.style.display = searchQuery ? "block" : "none";
        renderArticles();
      });

      searchClearBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        searchClearBtn.style.display = "none";
        renderArticles();
      });
    }

    if (readerCloseBtn) readerCloseBtn.addEventListener("click", closeReaderModal);
    if (readerModal) {
      readerModal.addEventListener("click", (e) => {
        if (e.target === readerModal) closeReaderModal();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && readerModal && readerModal.classList.contains("active")) {
        closeReaderModal();
      }
    });
  }
});
