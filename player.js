let audio = document.querySelector('.audio');
let playPauseButton = document.querySelector('.play');
let duration = 0;
// let progress = document.querySelector('.progress');
// progress.value = 0;
let isPLaying = !audio.paused;
let durationTime = document.querySelector('.duration-time');
let currentTime = document.querySelector('.current-time');
let progress = document.querySelector('.progress');
let soundControl = document.getElementsByClassName('cls-1');
let lastVolume = audio.volume;
let hidden =  document.querySelectorAll('.class-hidden');

for(let i =0; i<soundControl.length; i++){
    soundControl[i].classList.add('active');
}

let playPause = () => {

    if(isPLaying){
        audio.play();
        playPauseButton.classList.add('paused');
        isPLaying = false;
    }
    else{
        audio.pause();
        playPauseButton.classList.remove('paused');
        isPLaying = true;
    }
};

let progressHandler = () => {
    progress.value = audio.currentTime * (100/duration);

    let wholeTime = audio.duration;
    let durMin = Math.floor(wholeTime/60);
    let durSec = Math.floor(wholeTime - durMin *60);
    if(durMin<10) {durMin = "0" + durMin}
    if(durSec<10){durSec= "0" + durSec}

    let curMin = Math.floor(audio.currentTime / 60);
    let curSec = Math.floor(audio.currentTime - curMin *60);
    if (curMin < 10){curMin = "0" + curMin}
    if (curSec < 10){curSec= "0" + curSec}

    currentTime.innerHTML = curMin + ":" + curSec;
    durationTime.innerHTML = durMin + ':' + durSec;

    let percentage = (audio.currentTime / audio.duration) * 100;
    progress.children[0].style.width = percentage + '%';
};


let setTimeHandler = () =>{
    audio.currentTime = (progress.value / 100) * duration;
};

let soundHandler = (e) =>{


    if (e.classList.contains('mute')){
        if(e.classList.contains('muted')){
            audio.volume = lastVolume;
            e.classList.remove('muted');
            if(lastVolume === 1/3){
                soundControl[1].classList.add('active');
            }
            if(lastVolume === (1/3)*2){
                soundControl[1].classList.add('active');
                soundControl[2].classList.add('active');
            }
            if(lastVolume === 1){
                soundControl[1].classList.add('active');
                soundControl[2].classList.add('active');
                soundControl[3].classList.add('active');
            }
        }
        else{
            audio.volume = 0;
            e.classList.add('muted');
            for(let i =0; i<soundControl.length; i++){
                if(i>0) {
                    soundControl[i].classList.remove('active');
                }
            }

        }

    }
    if(e.classList.contains('first')){
        soundControl[0].classList.add('active');
        soundControl[1].classList.add('active');
        soundControl[2].classList.remove('active');
        soundControl[3].classList.remove('active');
        audio.volume = lastVolume = (1/3);
    }
    if(e.classList.contains('second')){
        soundControl[0].classList.add('active');
        soundControl[1].classList.add('active');
        soundControl[2].classList.add('active');
        soundControl[3].classList.remove('active');
        audio.volume = lastVolume = (1/3)*2;
    }
    if(e.classList.contains('third')){
        for(let i =0; i<soundControl.length; i++){
            soundControl[i].classList.add('active');
        }
        audio.volume = lastVolume = 1;
    }
    // e.classList.add('active');
};

let addListener =(element) =>{
    for(let i=0; i<element.length; i++){
        element[i].addEventListener('click',() => soundHandler(element[i]));
    }
};

addListener(soundControl);

audio.addEventListener("loadedmetadata", function() {
    duration = audio.duration;
});

progress.addEventListener("input", setTimeHandler);

audio.addEventListener('timeupdate', progressHandler);

playPauseButton.addEventListener('click', playPause);

progress.addEventListener('click', function(e){
    let left = (e.pageX - progress.offsetLeft);
    let totalWidth = progress.offsetWidth;
    let percentage = (left / totalWidth);
    // console.log(percentage + ' ' + audio.duration * percentage);
    audio.currentTime = audio.duration * percentage;
});
