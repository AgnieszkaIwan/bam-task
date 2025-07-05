import "./styles/style.scss";
import SceneManager from "./core/SceneManager.js";
import orientationLock from "./utils/orientationLock.js";
import EventTracker from "./core/EventTracker.js";
import "swiper/swiper-bundle.css";

window.addEventListener("DOMContentLoaded", () => {
  // Orientation‑lock overlay & resize tracking
  orientationLock();

  // Initial analytics event
  EventTracker.log("ad_load");

  // Scene system
  const sceneManager = new SceneManager();

  // Auto‑transition Intro → Gallery after 8 s
  setTimeout(() => sceneManager.switch("gallery"), 8000);

  // Page hide / tab switch
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      EventTracker.log("page_hide");
    }
  });
});
