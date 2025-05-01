
console.log('Lets write JavaScript');
let currentSong = new Audio();
let songs = [];

const allAlbums = [
    {
      folder: "Ap Dhillon",
      title: "Ap Dhillon",
      description: "No description",
      cover: "songs/Ap Dhillon/cover.jpg",
      songs: [
        { title: "True Stories 1", file: "songs/Ap Dhillon/True_Stories_1.mp3" }
      ]
    },
    {
      folder: "cs",
      title: "cs",
      description: "No description",
      cover: "songs/cs/cover.jpg",
      songs: [
        { title: "128-Heer Aasmani - Fighter 128 Kbps", file: "songs/cs/128-Heer Aasmani - Fighter 128 Kbps.mp3" },
        { title: "Aura - Shubh", file: "songs/cs/Aura - Shubh.mp3" },
        { title: "Cheques", file: "songs/cs/Cheques.mp3" },
        { title: "Fell For You - Shubh", file: "songs/cs/Fell For You - Shubh.mp3" }
      ]
    },
    {
      folder: "diljeet",
      title: "diljeet",
      description: "No description",
      cover: "songs/diljeet/cover.jpg",
      songs: [
        { title: "Water - Diljit Dosanjh", file: "songs/diljeet/Water - Diljit Dosanjh.mp3" }
      ]
    },
    {
      folder: "karan aujla",
      title: "karan aujla",
      description: "No description",
      cover: "songs/karan aujla/cover.jpg",
      songs: [
        { title: "Wavy - Karan Aujla", file: "songs/karan aujla/Wavy - Karan Aujla.mp3" }
      ]
    }
  ];
  

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return String(minutes).padStart(2, '0') + ':' + String(remainingSeconds).padStart(2, '0');
}

function playMusic(track, pause = false) {
    currentSong.src = track.file;
    if (!pause) {
        currentSong.play();
        play.src = "pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track.title);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

function displayAlbums() {
    let cardContainer = document.querySelector(".cardContainer");
    cardContainer.innerHTML = "";
    allAlbums.forEach((album, i) => {
        cardContainer.innerHTML += `
        <div data-index="${i}" class="card">
            <div class="play">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <img src="${album.cover}" alt="">
            <h2>${album.title}</h2>
            <p>${album.description}</p>
        </div>`;
        
        // Add click handler to each card
        setTimeout(() => {
            document.querySelectorAll(".card")[i].addEventListener("click", () => {
                songs = album.songs;
                loadSongsUI();
                playMusic(songs[0]);
            });
        }, 0);
    });
}


function loadSongsUI() {
    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";
    songs.forEach((song, index) => {
        songUL.innerHTML += `
        <li data-index="${index}">
            <img class="invert" width="34" src="music.svg" alt="">
            <div class="info">
                <div>${song.title}</div>
                <div>Unknown Artist</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="play.svg" alt="">
            </div>
        </li>`;
    });

    document.querySelectorAll(".songList li").forEach(li => {
        li.addEventListener("click", () => {
            let index = parseInt(li.dataset.index);
            playMusic(songs[index]);
        });
    });
}


function main() {
    songs = allAlbums[0].songs;
    loadSongsUI();
    playMusic(songs[0], true);
    displayAlbums();

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        } else {
            currentSong.pause();
            play.src = "play.svg";
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =
            secondsToMinutesSeconds(currentSong.currentTime) + " / " +
            secondsToMinutesSeconds(currentSong.duration);
        document.querySelector(".circle").style.left = 
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });
    
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    previous.addEventListener("click", () => {
        let index = songs.findIndex(s => s.file === currentSong.src.split("/").slice(-2).join("/"));
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    });

    next.addEventListener("click", () => {
        let index = songs.findIndex(s => s.file === currentSong.src.split("/").slice(-2).join("/"));
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        }
    });

    document.querySelector(".range input").addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        document.querySelector(".volume img").src = currentSong.volume > 0 ? "volume.svg" : "mute.svg";
    });

    document.querySelector(".volume img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentSong.volume = 0.1;
            document.querySelector(".range input").value = 10;
        }
    });
}

main();
