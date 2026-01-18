function initTimeline() {

  const root = document.querySelector("[data-timeline-root]");
  if (!root) return;

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
      const year = sel.value;
      const el = document.getElementById(`y-${year}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // active year (desktop) — stable
  const yearSections = document.querySelectorAll("[data-year]");
  const yearLinks = document.querySelectorAll("[data-year-link]");
  const ratios = new Map();
  let manualActiveUntil = 0;

  const setActive = (year) => {
    yearLinks.forEach((a) => {
      const isActive = String(a.dataset.yearLink) === String(year);
      a.classList.toggle("bg-zinc-900", isActive);
      a.classList.toggle("text-zinc-50", isActive);
      a.classList.toggle("hover:bg-zinc-900", isActive);
      a.classList.toggle("hover:text-zinc-50", isActive);
    });
  };

  if (yearLinks.length) setActive(yearLinks[0].dataset.yearLink);

  const pickMostVisible = () => {
    if (Date.now() < manualActiveUntil) return;
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
  const scroller = document.getElementById("timeline-scroller");
  const prefersDesktop = window.matchMedia("(min-width: 768px)").matches;

  const yo = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const year = e.target.dataset.year;
        if (e.isIntersecting) ratios.set(year, e.intersectionRatio);
        else ratios.delete(year);
      }
      pickMostVisible();
    },
    {
      root: prefersDesktop ? scroller : null,
      rootMargin: prefersDesktop
        ? "0px -55% 0px -35%"
        : "-35% 0px -55% 0px",
      threshold: [0, 0.2, 0.4, 0.6, 0.8],
    }
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
  const titleEl = overlay?.querySelector("#overlay-title");
  const metaEl = overlay?.querySelector("#overlay-meta");
  const excerptEl = overlay?.querySelector("#overlay-excerpt");
  const galleryEl = overlay?.querySelector("#overlay-gallery");
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

    overlay.hidden = false;
    overlay.classList.remove("hidden", "pointer-events-none");
    overlay.setAttribute("aria-hidden", "false");

    import("glightbox").then(({ default: GLightbox }) => {
      if (lightbox) lightbox.destroy();
      lightbox = GLightbox({ selector: '[data-gallery="project"]', loop: false });
    });
  };

  const closeOverlay = () => {
    if (!overlay) return;

    overlay.classList.add("hidden", "pointer-events-none");
    overlay.setAttribute("aria-hidden", "true");
    overlay.hidden = true;

    if (galleryEl) galleryEl.innerHTML = "";
    if (lightbox) {
      lightbox.destroy();
      lightbox = null;
    }
  };

  document.addEventListener("click", (e) => {
    // 1) year jump (nav)
    const yearBtn = e.target.closest("[data-year-jump]");
    if (yearBtn) {
      e.preventDefault();
      const year = yearBtn.dataset.yearJump;
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      setActive(year);
      manualActiveUntil = Date.now() + 350;

      if (isDesktop) {
        const track = document.getElementById("timeline-track");
        if (!track) return;

        const panel = track.querySelector(`[data-year-panel="${year}"]`);
        if (!panel) return;

        track.scrollTo({ left: panel.offsetLeft, behavior: "smooth" });
        return;
      }

      const el = document.getElementById(`y-${year}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // 2) open overlay (project card)
    const btn = e.target.closest("[data-project]");
    if (btn && overlay) {
      openOverlay(btn);
      return;
    }

    // 3) close overlay
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

}

initTimeline();
