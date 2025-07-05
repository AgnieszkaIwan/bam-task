import EventTracker from "../core/EventTracker.js";

const wrapper = document.getElementById("video-wrapper");
const videoEl = document.getElementById("product-video");
const backBtn = document.getElementById("video-back");

const POS_CLASSES = [
  "pos-top-left",
  "pos-top-right",
  "pos-bottom-left",
  "pos-bottom-right",
];

let sm; // SceneManager

export function init(sceneManager) {
  sm = sceneManager;

  videoEl.loop = true;
  videoEl.muted = true;

  backBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sm.switch("gallery");
  });
}

export function positionVideo(index = 1) {
  wrapper.classList.remove(...POS_CLASSES);
  wrapper.classList.add(POS_CLASSES[(index - 1) % 4]);

  EventTracker.log(`video_position:${index}`);
  void videoEl.play();
}

export function show() {
  videoEl.play();
}
export function hide() {
  videoEl.pause();
}
