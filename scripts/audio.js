const audioPlayer = document.querySelector(".audio-player");
const audio = document.getElementById("winnerAudio");

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

// audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
//     const volumeEl = audioPlayer.querySelector(".volume-container .volume");
//     audio.muted = !audio.muted;
//     if (audio.muted) {
//         volumeEl.classList.remove("icono-volumeMedium");
//         volumeEl.classList.add("icono-volumeMute");
//     } else {
//         volumeEl.classList.add("icono-volumeMedium");
//         volumeEl.classList.remove("icono-volumeMute");
//     }
// });