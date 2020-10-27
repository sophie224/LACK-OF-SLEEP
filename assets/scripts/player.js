const audios = document.querySelectorAll('.audio');
const playPauseButtons = document.querySelectorAll('.play');
const forwardButtons = document.querySelectorAll('.forward');
const backButtons = document.querySelectorAll('.back');
let duration = 0;
let progresses = document.querySelectorAll('.progress');
let durationTime = document.querySelector('.duration-time');
let currentTime = document.querySelector('.current-time');
let progress = document.querySelector('.progress');
let soundControls = document.getElementsByClassName('sound_line');
let hidden =  document.querySelectorAll('.class-hidden');
const backButton=document.querySelector('.back');

const addPlayListeners = () => {
    for (let i = 0; i < playPauseButtons.length; i++) {
        const button = playPauseButtons[i];
        button.addEventListener('click', () => {
            if (audios[i].paused) {
                audios[i].play();
            } else {
                audios[i].pause();
            }
            button.classList.toggle('paused');
        });
    }
}

const addForwardListeners = () => {
    for (let i = 0; i < forwardButtons.length; i++) {
        const button = forwardButtons[i];
        const audio = audios[i];
        button.addEventListener('click', () => {
            if (audio.duration < audio.currentTime + 10)  {
                audio.currentTime = audio.duration;
            }
            else{
                audio.currentTime += 10;
            }
        });
    }
}

const addBackListeners = () => {
    for (let i = 0; i < backButtons.length; i++) {
        const button = backButtons[i];
        const audio = audios[i];
        button.addEventListener('click', () => {
            if (audio.currentTime - 10 < 0 )  {
                audio.currentTime = 0;
            }
            else{
                audio.currentTime -= 10;
            }
        });
    }
}

const addAudioListeners = () => {
    for (let i = 0; i < audios.length; i++) {
        const audio = audios[i];
        audio.addEventListener('timeupdate', () => {
            progressHandler(audio, progresses[i]);
        });
    }
}

const addProgressListeners = () => {
    for (let i = 0; i < progresses.length; i++) {
        const progress = progresses[i];
        const audio = audios[i];
        progress.addEventListener('click', function(e) {
            let left = (e.pageX - progress.offsetLeft);
            let totalWidth = progress.offsetWidth;
            let percentage = (left / totalWidth);
            audio.currentTime = audio.duration * percentage;
        });
    }
}

const addSoundControlListener = () => {
    for (let i = 0; i < soundControls.length; i++) {
        const control = soundControls[i];
        const audioIndex = Math.floor(i / 4);
        const audio = audios[audioIndex];
        control.addEventListener('click', function() {
            if(control.classList.contains('first')){
                soundControls[audioIndex * 4].classList.add('active');
                soundControls[audioIndex * 4 + 1].classList.remove('active');
                soundControls[audioIndex * 4 + 2].classList.remove('active');
                soundControls[audioIndex * 4 + 3].classList.remove('active');
                audio.volume = 1/4;
            }
            if(control.classList.contains('second')){
                soundControls[audioIndex * 4].classList.add('active');
                soundControls[audioIndex * 4 + 1].classList.add('active');
                soundControls[audioIndex * 4 + 2].classList.remove('active');
                soundControls[audioIndex * 4 + 3].classList.remove('active');
                audio.volume = 1/2;
            }
            if(control.classList.contains('third')){
                soundControls[audioIndex * 4].classList.add('active');
                soundControls[audioIndex * 4 + 1].classList.add('active');
                soundControls[audioIndex * 4 + 2].classList.add('active');
                soundControls[audioIndex * 4 + 3].classList.remove('active');
                audio.volume = 3/4;
            }
            if(control.classList.contains('forth')){
                for(let i = audioIndex * 4; i < audioIndex * 4 + 4; i++){
                    soundControls[i].classList.add('active');
                }
                audio.volume = 1;
            }
        });
    }
}


for(let i =0; i<soundControls.length; i++){
    soundControls[i].classList.add('active');
}

const progressHandler = (audio, progress) => {
    progress.value = audio.currentTime * (100/duration);
    let percentage = (audio.currentTime / audio.duration) * 100;
    progress.children[0].style.width = percentage + '%';
};
addPlayListeners();
addForwardListeners();
addBackListeners();
addAudioListeners();
addProgressListeners();
addSoundControlListener();