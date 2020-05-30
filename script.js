const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //sounds
  const sounds = document.querySelectorAll(".sound-picker button");

  //time display
  const timeDisplay = document.querySelector(".time-display");

  // Time selection
  const timeSelect = document.querySelectorAll(".time-select button");

  //Get the length of the outline
  const outlineLength = outline.getTotalLength();

  //Duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // pick diff sound
  sounds.forEach(sound => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  //Play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //selecting the duration of sounds
  timeSelect.forEach(option => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      sec = timeDisplay.textContent = `${Math.floor(
        fakeDuration / 60
      )}:${Math.floor(fakeDuration % 60)}0`;
    });
  });

  // function for player to play and stop sounds
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  //animations
  song.ontimeupdate = () => {
    const currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //animate text
    timeDisplay.textContent = `${minutes}:${
      (seconds < 10 ? "0" : "") + seconds
    }`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();
