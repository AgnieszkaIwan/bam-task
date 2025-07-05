import { gsap } from "gsap";
import EventTracker from "../core/EventTracker.js";

/**
 * CTA button pulse & click logic.
 * @param {Object} [options]
 * @param {string} [options.selector="#cta"]
 * @param {string} [options.url="https://example.com"]
 * @param {number} [options.pulseScale=1.05]
 * @returns {() => void} cleanup
 */

export default function initCTA(options = {}) {
  const {
    selector = "#cta",
    url = "https://example.com",
    pulseScale = 1.05,
  } = options;

  const cta = document.querySelector(selector);
  if (!cta) return () => {};

  /* ----------------- Pulse animation ----------------- */
  const tween = gsap.to(cta, {
    scale: pulseScale,
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });

  /* ----------------- Click handler ------------------- */
  function handleClick() {
    EventTracker.log("user_interaction:cta_click");
    window.open(url, "_blank");
  }

  cta.addEventListener("click", handleClick);

  /* ----------------- Cleanup API -------------------- */
  return () => {
    tween.kill();
    cta.removeEventListener("click", handleClick);
  };
}
