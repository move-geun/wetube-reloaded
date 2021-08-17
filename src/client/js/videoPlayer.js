const video = document.querySelector("video");
const playBtn = document.getElementById("playBtn");
const muteBtn = document.getElementById("muteBtn");
const volume = document.getElementById("volume");
const currnTime = document.getElementById("currnTime");
const totalTime = document.getElementById("totalTime");
const time = document.getElementById("time");
const fullScreen = document.getElementById("fullScreen");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let moveCapture = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handelPlyabtn = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handelMutebtn = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volume.value = video.muted ? 0 : volumeValue;
};

const handleVolume = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

const loadTotalTime = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  time.max = Math.floor(video.duration);
};

const timeUpdate = () => {
  currnTime.innerText = formatTime(Math.floor(video.currentTime));
  time.value = Math.floor(video.currentTime);
};

const changeTime = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen";
  } else {
    fullScreen.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (moveCapture) {
    clearTimeout(moveCapture);
    moveCapture = null;
  }
  videoControls.classList.add("showing");
  moveCapture = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

playBtn.addEventListener("click", handelPlyabtn);
muteBtn.addEventListener("click", handelMutebtn);
volume.addEventListener("input", handleVolume);
video.addEventListener("loadedmetadata", loadTotalTime);
video.addEventListener("timeupdate", timeUpdate);
time.addEventListener("input", changeTime);
fullScreenBtn.addEventListener("click", handleFullscreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
