const circularProgressBar = document.querySelector('#circularProgressBar');
const circularProgressBarNumber = document.querySelector('#circularProgressBar .progress-value');
const buttonTypePomodoro = document.querySelector('#buttonTypePomodoro');
const buttonTypeShortBreak = document.querySelector('#buttonTypeShortBreak');

const audio = new Audio('Alarm.mp3');
const timerMusic = new Audio('background_music.mp3'); 
timerMusic.loop = true;

const pomodoroTimerInSeconds = 1500; //60segundos *25min
const shortBreakTimerInSeconds = 300; //60seg * 5min
const TIMER_TYPE_POMODORO = 'POMODORO';
const TIMER_TYPE_SHORT_BREAK = 'SHORTBREAK'; 

let progressInterval; //variável q guarda o set interval;
let pomodoroType = TIMER_TYPE_POMODORO;
let timerValue = pomodoroTimerInSeconds;
let multiplierFactor = 360/ timerValue;



//função p transformar segundos no formato MM:SS
function formatNumberInStringMinute(number){
    const minutes = Math.trunc(number / 60) .toString() .padStart(2, '0');

    const seconds = Math.trunc(number % 60) .toString() .padStart(2, '0');

    return `${minutes}: ${seconds}`;

}

const startTimer = () =>{
    timerMusic.play();
    progressInterval = setInterval(() =>{
        timerValue --;
        setInfoCircularProgressBar();
    }, 1000);
}

const stopTimer = () => {
    timerMusic.pause();
    clearInterval(progressInterval);}

const resetTimer = () =>{
    clearInterval(progressInterval);

    timerValue = (pomodoroType === TIMER_TYPE_POMODORO)
                 ? pomodoroTimerInSeconds
                    : shortBreakTimerInSeconds;

    multiplierFactor = 360 / timerValue;
    setInfoCircularProgressBar();
    timerMusic.pause(); // Pausa a música quando resetar
    timerMusic.currentTime = 0;
    audio.pause(); // 
    audio.currentTime = 0; // reinicia o audio
}


function setInfoCircularProgressBar(){

    if(timerValue === 0){
        stopTimer();
        timerMusic.pause();
        audio.play();

    }
    circularProgressBarNumber.textContent = `${formatNumberInStringMinute(timerValue)}`;

    circularProgressBar.style.background =
     `conic-gradient(var(--blue) ${timerValue * multiplierFactor}deg,
               var(--purple) 0deg)`;
}

const setPomodoroType = (type) =>{
    pomodoroType = type;

    if(type === TIMER_TYPE_POMODORO){
        buttonTypeShortBreak.classList.remove("active");
        buttonTypePomodoro.classList.add("active");
    }else{
        buttonTypePomodoro.classList.remove("active");
        buttonTypeShortBreak.classList.add("active");
    }

    resetTimer();
}