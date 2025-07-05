import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import EventTracker from "../core/EventTracker.js";

export default class ProductGallery {
  /**
   * @param {import('../core/SceneManager.js').default} sceneManager
   * @param {(index:number)=>void} onSlideSelect
   */
  constructor(sceneManager, onSlideSelect) {
    this.sm = sceneManager;

    // ------- Swiper initialisation -------
    this.swiper = new Swiper(".swiper", {
      loop: true,
      centeredSlides: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    // ------- Handle slide click -------
    this.swiper.on("click", (swiper) => {
      const slideEl = swiper.clickedSlide;
      if (!slideEl) return;

      let idx = parseInt(slideEl.getAttribute("data-index"), 10);
      if (Number.isNaN(idx) || idx < 1) {
        const base = parseInt(
          slideEl.getAttribute("data-swiper-slide-index"),
          10
        );
        idx = Number.isNaN(base) ? swiper.realIndex + 1 : base + 1;
      }

      EventTracker.log(`user_interaction:slide_click:${idx}`);
      onSlideSelect(idx);
      this.sm.switch("video");
    });
  }
}
