import EventTracker from "../core/EventTracker.js";

/**
 * Initialise orientation-lock overlay logic.
 * @returns {() => void}
 */
export default function orientationLock() {
  const overlay = document.getElementById("orientation-lock");
  if (!overlay) return () => {};

  /** Checks current orientation and toggles overlay */
  function check() {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    overlay.classList.toggle("hidden", isPortrait);
  }

  /** Resize handler – logs + re-checks */
  function onResize() {
    EventTracker.log("window_resize");
    check();
  }

  // Initial state + listeners
  check();
  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", check);

  // Cleanup API
  return () => {
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", check);
  };
}
