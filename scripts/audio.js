
const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio(
    "/advent-calendar/audio/RAMIN-SNOW.mp3"
);

audio.addEventListener("loadeddata", () => {
        audio.volume = 0.04;
    },
    false
);



const play =  audioPlayer.querySelector('.fa-play')
const pause =  audioPlayer.querySelector('.fa-pause')

const playClickBtn = audioPlayer.querySelector(".play-container");
playClickBtn.addEventListener(
    "click",
    () => {
        if (audio.paused) {
            play.classList.toggle('active')
            pause.classList.toggle('active')
            audio.play();
        } else {
            play.classList.toggle('active')
            pause.classList.toggle('active')
            audio.pause();
        }
    },
    false
);

