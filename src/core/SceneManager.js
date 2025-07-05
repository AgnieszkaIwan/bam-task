import { gsap } from "gsap";
import EventTracker from "./EventTracker.js";
import * as IntroScene from "../scenes/IntroScene.js";
import * as GalleryScene from "../scenes/GalleryScene.js";
import * as VideoScene from "../scenes/VideoScene.js";

export default class SceneManager {
  constructor() {
    /** map<sceneName, HTMLElement> */
    this.scenes = {
      intro: document.getElementById("scene-intro"),
      gallery: document.getElementById("scene-gallery"),
      video: document.getElementById("scene-video"),
    };

    this.current = "intro";
    this.scenes.intro.classList.add("is-active");

    IntroScene.init?.();
    GalleryScene.init?.(this, VideoScene.positionVideo);
    VideoScene.init?.(this);

    gsap.set([this.scenes.gallery, this.scenes.video], { autoAlpha: 0 });
  }

  /**
   * Fade‑switch between scenes
   * @param {"intro"|"gallery"|"video"} name
   */
  switch(name) {
    if (!this.scenes[name] || name === this.current) return;

    const fromEl = this.scenes[this.current];
    const toEl = this.scenes[name];

    this.#hook(this.current, "hide");

    gsap.to(fromEl, {
      autoAlpha: 0,
      duration: 0.4,
      pointerEvents: "none",
      onComplete: () => {
        fromEl.classList.remove("is-active");
      },
    });

    toEl.classList.add("is-active");
    gsap.fromTo(
      toEl,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.5,
        pointerEvents: "auto",
        onStart: () => this.#hook(name, "show"),
      }
    );

    EventTracker.log(`scene_change:${name}`);
    this.current = name;
  }

  #hook(sceneName, fnName) {
    const mod =
      sceneName === "intro"
        ? IntroScene
        : sceneName === "gallery"
        ? GalleryScene
        : VideoScene;
    const fn = mod[fnName];
    if (typeof fn === "function") fn();
  }
}
