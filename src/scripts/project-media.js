export function initProjectMedia(root = document) {
  const viewer = root.getElementById("media-viewer");
  const thumbs = Array.from(root.querySelectorAll(".media-thumb"));
  const prevBtn = root.querySelector(".media-prev");
  const nextBtn = root.querySelector(".media-next");
  const trigger = root.getElementById("media-lightbox-trigger");

  const lb = root.getElementById("project-lightbox");
  const lbContent = root.getElementById("project-lightbox-content");

  if (!viewer || !thumbs.length) return;

  let index = 0;

  const render = (kind, src) => {
    if (kind === "video") {
      const video = document.createElement("video");
      video.className = "h-full w-full object-contain";
      video.controls = true;
      video.preload = "metadata";
      video.setAttribute("playsinline", "");

      const source = document.createElement("source");
      source.src = src;
      source.type = "video/mp4";
      video.appendChild(source);

      viewer.replaceChildren(video);
      return;
    }

    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.loading = "lazy";
    img.className = "h-full w-full object-contain";
    viewer.replaceChildren(img);
  };

  const setActiveThumb = (activeBtn) => {
    thumbs.forEach((b, i) => {
      const isActive = b === activeBtn;
      b.setAttribute("aria-current", isActive ? "true" : "false");
      b.classList.toggle("is-active", isActive);
      if (isActive) index = i;
    });
  };

  const goTo = (i) => {
    const clamped = (i + thumbs.length) % thumbs.length;
    const btn = thumbs[clamped];
    render(btn.dataset.kind, btn.dataset.src);
    setActiveThumb(btn);
    btn.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  };

  // overlay custom
  const openLightbox = () => {
    if (!lb || !lbContent) return;

    const btn = thumbs[index];
    const kind = btn?.dataset.kind;
    const src = btn?.dataset.src;
    if (!kind || !src) return;

    if (kind === "video") {
      lbContent.innerHTML = `
        <video class="block w-full h-[85vh] object-contain" controls autoplay playsinline preload="metadata">
          <source src="${src}" type="video/mp4" />
        </video>
      `;
    } else {
      lbContent.innerHTML = `
        <img src="${src}" alt="" class="block w-full h-[85vh] object-contain" />
      `;
    }

    // lock scroll (prevents “seeing stuff under”)
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    lb.hidden = false;
    lb.classList.remove("hidden");
    lb.setAttribute("aria-hidden", "false");
  };

  const closeLightbox = () => {
    if (!lb || !lbContent) return;

    lb.classList.add("hidden");
    lb.setAttribute("aria-hidden", "true");
    lb.hidden = true;
    lbContent.innerHTML = "";

    // unlock scroll
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  };

  // init
  goTo(0);

  // thumbs
  thumbs.forEach((btn, i) => btn.addEventListener("click", () => goTo(i)));

  // arrows
  if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1));

  // open overlay
  if (trigger) {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openLightbox();
    });
  }

  // close overlay
  document.addEventListener("click", (e) => {
    if (!lb || lb.classList.contains("hidden")) return;
    if (e.target.closest("[data-plb-close]")) closeLightbox();
    if (e.target.matches("[data-plb-backdrop]")) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lb || lb.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
  });
}

initProjectMedia();