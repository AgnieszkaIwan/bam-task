import EventTracker from "../core/EventTracker.js";
import ProductGallery from "../components/ProductGallery.js";
import initCTA from "../components/CTAButton.js";

let cleanupCTA = () => {};
let galleryInstance;

export function init(sceneManager, onSlideSelect) {
  galleryInstance = new ProductGallery(sceneManager, onSlideSelect);

  cleanupCTA = initCTA();
}

export function show() {
  EventTracker.log("scene_change:gallery");
}

export function hide() {
  cleanupCTA();
}
