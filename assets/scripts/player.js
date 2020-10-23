let audio = document.querySelector('.audio');
let playPauseButton = document.querySelector('.play');
let duration = 0;
// let progress = document.querySelector('.progress');
// progress.value = 0;
let isPLaying = !audio.paused;
let durationTime = document.querySelector('.duration-time');
let currentTime = document.querySelector('.current-time');
let progress = document.querySelector('.progress');
let soundControl = document.getElementsByClassName('sound_line');
let lastVolume = audio.volume;
let hidden =  document.querySelectorAll('.class-hidden');
const backButton=document.querySelector('.back');
const forwardButton=document.querySelector('.forward');

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

    // let wholeTime = audio.duration;
    // let durMin = Math.floor(wholeTime/60);
    // let durSec = Math.floor(wholeTime - durMin *60);
    // if(durMin<10) {durMin = "0" + durMin}
    // if(durSec<10){durSec= "0" + durSec}

    // let curMin = Math.floor(audio.currentTime / 60);
    // let curSec = Math.floor(audio.currentTime - curMin *60);
    // if (curMin < 10){curMin = "0" + curMin}
    // if (curSec < 10){curSec= "0" + curSec}

    // currentTime.innerHTML = curMin + ":" + curSec;
    // durationTime.innerHTML = durMin + ':' + durSec;

    let percentage = (audio.currentTime / audio.duration) * 100;
    progress.children[0].style.width = percentage + '%';
};


let setTimeHandler = () =>{
    audio.currentTime = (progress.value / 100) * duration;
};

let soundHandler = (e) =>{

    if(e.classList.contains('first')){
        soundControl[0].classList.add('active');
        soundControl[1].classList.remove('active');
        soundControl[2].classList.remove('active');
        soundControl[3].classList.remove('active');
        audio.volume = lastVolume = (1/4);
    }
    if(e.classList.contains('second')){
        soundControl[0].classList.add('active');
        soundControl[1].classList.add('active');
        soundControl[2].classList.remove('active');
        soundControl[3].classList.remove('active');
        audio.volume = lastVolume = (1/2);
    }
    if(e.classList.contains('third')){
        soundControl[0].classList.add('active');
        soundControl[1].classList.add('active');
        soundControl[2].classList.add('active');
        soundControl[3].classList.remove('active');
        audio.volume = lastVolume = (3/4);
    }
    if(e.classList.contains('forth')){
        for(let i =0; i<soundControl.length; i++){
            soundControl[i].classList.add('active');
        }
        audio.volume = lastVolume = 1;
    }
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



forwardButton.addEventListener('click', event => {
    if ( audio.duration < audio.currentTime + 10 )  {
        audio.currentTime = audio.duration;
    }
    else{
        audio.currentTime += 10;
    }
});
backButton.addEventListener('click', event => {
    if ( audio.currentTime - 10 < 0 )  {
        audio.currentTime = 0;
    }
    else{
        audio.currentTime -= 10;
    }
});