const video = document.querySelector("video");
const playBtn = document.getElementById("playBtn");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("muteBtn");
const muteBtnIcon = muteBtn.querySelector("i");
const volume = document.getElementById("volume");
const currnTime = document.getElementById("currnTime");
const totalTime = document.getElementById("totalTime");
const time = document.getElementById("time");
const fullScreen = document.getElementById("fullScreen");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
const videoControls = document.getElementById("videoControls");
const videoShowing = document.getElementById("videoShowing");

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
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handelMutebtn = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
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
    fullScreenBtnIcon.classList = "fas fa-expand";
  } else {
    fullScreen.requestFullscreen();
    fullScreenBtnIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoShowing.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (moveCapture) {
    clearTimeout(moveCapture);
    moveCapture = null;
  }
  videoShowing.classList.add("showing");
  moveCapture = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleKeydown = (event) => {
  if (event.code === "Enter") handleFullscreen();
  if (event.code === "Space") handelPlyabtn();
};

const registerView = () => {
  const { id } = fullScreen.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

if (video.readyState == 4) {
  loadTotalTime();
}

playBtn.addEventListener("click", handelPlyabtn);
muteBtn.addEventListener("click", handelMutebtn);
volume.addEventListener("input", handleVolume);
video.addEventListener("loadedmetadata", loadTotalTime);
video.addEventListener("timeupdate", timeUpdate);
video.addEventListener("click", handelPlyabtn);
time.addEventListener("input", changeTime);
video.addEventListener("ended", registerView);
fullScreenBtn.addEventListener("click", handleFullscreen);
fullScreen.addEventListener("mousemove", handleMouseMove);
fullScreen.addEventListener("mouseleave", handleMouseLeave);
document.addEventListener("keydown", handleKeydown);
