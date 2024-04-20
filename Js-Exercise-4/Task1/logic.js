const clock = document.getElementById('timeDiv');
const currentDate = document.getElementById('dateDiv');
const timer = document.getElementById('timerDiv');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resumeButton = document.getElementById('resumeButton');
const resetButton = document.getElementById('resetButton');

let startInterval;
let dateStr = "";

let hour = 0;
let min = 0;
let sec = 0;
let milliSec = 0;

function clockStart() {
    setInterval(updateTime, 1000);
    updateTime();
}

function updateTime() {
    const date = new Date();

    let hours = date.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }
    clock.children[1].innerHTML = hours;
  
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    clock.children[2].innerHTML = minutes;
  
    let seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    clock.children[3].innerHTML = seconds;

    const month = date.toLocaleString('default', { month: 'short' });    
    dateStr = `Date${date.getDate()}${month}${date.getFullYear()}`;

    currentDate.innerHTML = dateStr;
}

function updateTimer() {
    milliSec++;
    if (milliSec == 10) {
        milliSec = 0;
        sec++;
    }
    if (sec == 60) {
        sec = 0;
        min++;
    }
    if (min == 60) {
        min = 0;
        hour++;
    }

    if (milliSec < 10) {
        const val = "0" + milliSec;
        timer.children[4].innerHTML = val;
    } else {
        timer.children[4].innerHTML = milliSec;
    }

    if (sec < 10) {
        let val = "0" + sec;
        timer.children[3].innerHTML = val;
    } else {
        timer.children[3].innerHTML = sec;
    }

    if (min < 10) {
        let val = "0" + min;
        timer.children[2].innerHTML = val;
    } else {
        timer.children[2].innerHTML = min;
    }

    if (hour < 10) {
        let val = "0" + hour;
        timer.children[1].innerHTML = val;
    } else {
        timer.children[1].innerHTML = hour;
    }
}

function startTimer() {
    startButton.disabled = true;
    resumeButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;

    startInterval = setInterval(updateTimer, 100);
    updateTimer();
}

function stopTimer() {
    resumeButton.disabled = false;
    resetButton.disabled = false;
    stopButton.disabled = true;

    clearInterval(startInterval);
}

function resumeTimer() {
    resumeButton.disabled = true;
    stopButton.disabled = false;
    
    startInterval = setInterval(updateTimer, 100);
    updateTimer();
}

function resetTimer() {
    resetButton.disabled = true;
    startButton.disabled = false;
    stopButton.disabled = true;
    resumeButton.disabled = true;

    clearInterval(startInterval);

    milliSec = 0;
    sec = 0;
    min = 0;
    hour = 0;

    timer.children[1].innerHTML = "00";
    timer.children[2].innerHTML = "00";
    timer.children[3].innerHTML = "00";
    timer.children[4].innerHTML = "00";   
}
