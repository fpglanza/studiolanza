export function initProjectMedia(root = document) {
  const viewer = root.getElementById("media-viewer");
  const thumbs = Array.from(root.querySelectorAll(".media-thumb"));
  if (!viewer || !thumbs.length) return;

  const setActiveThumb = (activeBtn) => {
    thumbs.forEach((b) => {
      const isActive = b === activeBtn;
      b.setAttribute("aria-current", isActive ? "true" : "false");
      b.classList.toggle("is-active", isActive);
    });
  };

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

  // init first
  const first = thumbs[0];
  render(first.dataset.kind, first.dataset.src);
  setActiveThumb(first);

  thumbs.forEach((btn) => {
    btn.addEventListener("click", () => {
      render(btn.dataset.kind, btn.dataset.src);
      setActiveThumb(btn);
    });
  });
}

initProjectMedia();
