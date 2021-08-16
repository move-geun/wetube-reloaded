const video = document.querySelector("video");
const playBtn = document.getElementById("playBtn");
const muteBtn = document.getElementById("muteBtn");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handelPlyabtn = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "play" : "Pause";
};

playBtn.addEventListener("click", handelPlyabtn);
