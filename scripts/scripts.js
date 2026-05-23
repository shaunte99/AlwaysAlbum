const tracks = document.querySelectorAll(".track");

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");

const nextBtn = document.getElementById("next");

const prevBtn = document.getElementById("prev");

const songTitle = document.getElementById("songTitle");

const progressBar = document.getElementById("progressBar");

const currentTimeEl = document.getElementById("currentTime");

const durationEl = document.getElementById("duration");

let currentTrack = 0;

let isPlaying = false;

/* LOAD SONG */

function loadTrack(index){

  const track = tracks[index];

  const src = track.dataset.src;

  audio.src = src;

  songTitle.innerText = track.innerText;

  tracks.forEach(t => t.classList.remove("active"));

  track.classList.add("active");

}

loadTrack(currentTrack);

/* PLAY */

function playSong(){

  audio.play();

  isPlaying = true;

  playBtn.innerText = "❚❚";

}

/* PAUSE */

function pauseSong(){

  audio.pause();

  isPlaying = false;

  playBtn.innerText = "▶";

}

/* BUTTON */

playBtn.addEventListener("click", () => {

  if(isPlaying){

    pauseSong();

  }else{

    playSong();

  }

});

/* NEXT */

nextBtn.addEventListener("click", () => {

  currentTrack++;

  if(currentTrack > tracks.length - 1){

    currentTrack = 0;

  }

  loadTrack(currentTrack);

  playSong();

});

/* PREV */

prevBtn.addEventListener("click", () => {

  currentTrack--;

  if(currentTrack < 0){

    currentTrack = tracks.length - 1;

  }

  loadTrack(currentTrack);

  playSong();

});

/* CLICK TRACK */

tracks.forEach((track,index)=>{

  track.addEventListener("click",()=>{

    currentTrack = index;

    loadTrack(currentTrack);

    playSong();

  });

});

/* PROGRESS */

audio.addEventListener("timeupdate",()=>{

  const {duration,currentTime} = audio;

  const progressPercent = (currentTime / duration) * 100;

  progressBar.style.width = `${progressPercent}%`;

  /* TIME */

  let currentMinutes = Math.floor(currentTime / 60);

  let currentSeconds = Math.floor(currentTime % 60);

  if(currentSeconds < 10){

    currentSeconds = `0${currentSeconds}`;

  }

  currentTimeEl.innerText =
  `${currentMinutes}:${currentSeconds}`;

  let durationMinutes = Math.floor(duration / 60);

  let durationSeconds = Math.floor(duration % 60);

  if(durationSeconds < 10){

    durationSeconds = `0${durationSeconds}`;

  }

  if(durationSeconds){

    durationEl.innerText =
    `${durationMinutes}:${durationSeconds}`;

  }

});

/* SEEK */

document
.querySelector(".progress-container")
.addEventListener("click",(e)=>{

  const width = e.currentTarget.clientWidth;

  const clickX = e.offsetX;

  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;

});

/* AUTO NEXT */

audio.addEventListener("ended",()=>{

  currentTrack++;

  if(currentTrack > tracks.length - 1){

    currentTrack = 0;

  }

  loadTrack(currentTrack);

  playSong();

});