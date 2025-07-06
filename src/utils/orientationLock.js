/* ---------------------------------------------------------------------------
 *  orientationLock() – shows overlay only on small/touch devices in landscape.
 *  Desktop and large tablets keep normal layout in any orientation.
 * -------------------------------------------------------------------------- */

import EventTracker from "../core/EventTracker.js";

/**
 * Attach listeners that toggle #orientation-lock overlay.
 * Criteria:
 *   – apply **only** when viewport ≤ 1024 px (mobile / small tablet)
 *   – show overlay if width > height (landscape)
 */
export default function orientationLock() {
  const overlay = document.getElementById("orientation-lock");
  if (!overlay) return;

  // media query: max‑width 1024px OR coarse pointer (touch)
  // true for touch‑only devices (phones / small tablets)
  const media = window.matchMedia("(hover: none) and (pointer: coarse)");

  const update = () => {
    const isMobile = media.matches;
    const isPortrait = window.innerHeight >= window.innerWidth;

    if (!isMobile) {
      // desktop: always hide overlay
      overlay.classList.add("hidden");
      return;
    }

    // mobile: show overlay when w > h
    if (isPortrait) {
      overlay.classList.add("hidden");
    } else {
      overlay.classList.remove("hidden");
    }
  };

  // initial check + listeners
  update();
  window.addEventListener("resize", () => {
    update();
    EventTracker.log("window_resize");
  });
  window.addEventListener("orientationchange", update);
}
