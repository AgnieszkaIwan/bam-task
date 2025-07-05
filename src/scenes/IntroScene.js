import { gsap } from "gsap";
import EventTracker from "../core/EventTracker.js";

const introEl = document.getElementById("scene-intro");
const headline = introEl?.querySelector(".scene-intro__headline");

let timeline;

export function init() {
  gsap.set(headline, { opacity: 0, y: 40 });
}

export function show() {
  introEl?.classList.add("is-active");
  EventTracker.log("scene_change:intro");

  timeline = gsap.timeline();
  timeline.to(headline, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
}

export function hide() {
  introEl?.classList.remove("is-active");
  timeline?.kill();
  gsap.set(headline, { opacity: 0, y: 40 });
}
