const items = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => io.observe(el));

  // mobile jump
  const sel = document.getElementById("year-jump");
  if (sel) {
    sel.addEventListener("change", () => {
      const id = sel.value;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // active year (desktop) — stable
  const yearSections = document.querySelectorAll("[data-year]");
  const yearLinks = document.querySelectorAll("[data-year-link]");
  const ratios = new Map();

  const setActive = (year) => {
    yearLinks.forEach((a) => {
      const isActive = String(a.dataset.yearLink) === String(year);
      a.classList.toggle("bg-zinc-900", isActive);
      a.classList.toggle("text-zinc-50", isActive);
      a.classList.toggle("hover:bg-zinc-900", isActive);
      a.classList.toggle("hover:text-zinc-50", isActive);
    });
  };

  const pickMostVisible = () => {
    let bestYear = null;
    let bestRatio = 0;
    for (const [year, ratio] of ratios.entries()) {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestYear = year;
      }
    }
    if (bestYear) setActive(bestYear);
  };

  const yo = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const year = e.target.dataset.year;
        if (e.isIntersecting) ratios.set(year, e.intersectionRatio);
        else ratios.delete(year);
      }
      pickMostVisible();
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.4, 0.6, 0.8] }
  );

  yearSections.forEach((s) => yo.observe(s));

  // --- data from JSON (slug -> project)
  const dataEl = document.getElementById("projects-data");
  const timelineData = dataEl ? JSON.parse(dataEl.textContent) : [];
  const projectBySlug = new Map();

  timelineData.forEach((block) => {
    (block.projects || []).forEach((p) => {
      projectBySlug.set(p.slug, { ...p, year: block.year });
    });
  });

  // overlay
  const overlay = document.getElementById("project-overlay");
  const titleEl = document.getElementById("overlay-title");
  const metaEl = document.getElementById("overlay-meta");
  const excerptEl = document.getElementById("overlay-excerpt");
  const galleryEl = document.getElementById("overlay-gallery");
  let lightbox = null;

  const openOverlay = (btn) => {
    if (!overlay) return;

    const slug = btn.dataset.project;
    const p = projectBySlug.get(slug);
    if (!p) return;

    if (titleEl) titleEl.textContent = p.title || "";
    if (metaEl) metaEl.textContent = [p.client, p.type, p.year].filter(Boolean).join(" — ");
    if (excerptEl) excerptEl.textContent = p.excerpt || "";

    // demo gallery (local)
    //per cambiare i contenuti dell'overlay verrò qui CAMBIOCONTENUTI
    if (galleryEl) {
      galleryEl.innerHTML = `
        <a href="/images/projects/_demo/01.svg" class="block overflow-hidden rounded-xl border border-zinc-200" data-gallery="project">
          <img src="/images/projects/_demo/01.svg" alt="" loading="lazy" class="block w-full" />
        </a>
        <a href="/images/projects/_demo/02.svg" class="block overflow-hidden rounded-xl border border-zinc-200" data-gallery="project">
          <img src="/images/projects/_demo/02.svg" alt="" loading="lazy" class="block w-full" />
        </a>
      `;
    }

    overlay.classList.remove("hidden", "pointer-events-none");
    overlay.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("overflow-hidden");

    import("glightbox").then(({ default: GLightbox }) => {
      if (lightbox) lightbox.destroy();
      lightbox = GLightbox({ selector: '[data-gallery="project"]', loop: false });
    });
  };

  const closeOverlay = () => {
    if (!overlay) return;

    overlay.classList.add("hidden", "pointer-events-none");
    overlay.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("overflow-hidden");

    if (galleryEl) galleryEl.innerHTML = "";
    if (lightbox) {
      lightbox.destroy();
      lightbox = null;
    }
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-project]");

    // apri solo se overlay è chiuso
    if (btn && overlay && overlay.classList.contains("hidden")) {
      openOverlay(btn);
      return;
    }

    if (e.target.closest("[data-overlay-close]")) closeOverlay();

    const panel = e.target.closest('[role="dialog"]');
    const isOverlayClick = overlay && overlay.contains(e.target);

    if (overlay && !overlay.classList.contains("hidden") && isOverlayClick && !panel) {
      closeOverlay();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOverlay();
  });