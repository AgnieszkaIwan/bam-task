import EventTracker from "../core/EventTracker.js";

export default function orientationLock() {
  const overlay = document.getElementById("orientation-lock");
  if (!overlay) return;

  const media = window.matchMedia("(hover: none) and (pointer: coarse)");

  const update = () => {
    const isMobile = media.matches;
    const isPortrait = window.innerHeight >= window.innerWidth;

    if (!isMobile) {
      overlay.classList.add("hidden");
      overlay.style.display = "none";
      return;
    }

    if (isPortrait) {
      overlay.classList.add("hidden");
      overlay.style.display = "none";
    } else {
      overlay.style.display = "flex";
      overlay.classList.remove("hidden");
    }
  };

  update();
  window.addEventListener("resize", () => {
    update();
    EventTracker.log("window_resize");
  });
  window.addEventListener("orientationchange", update);
}
