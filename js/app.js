let timerId = null;
function timer(seconds){
    clearInterval(timerId);
    if(seconds <= 0)
        return;
    const now = (new Date()).getTime();
    const then = now + seconds * 1000;

    displayCountdown(seconds);
    const endTime = new Date(then);
    const endHours = endTime.getHours();
    const endMinutes = endTime.getMinutes()
    displayEndTime(`Be back at ${formatHours(endHours)}:${formatMinutesOrSeconds(endMinutes)}`);

    timerId = setInterval(()=>{
        seconds--;
        if(seconds < 0){
            clearInterval(timerId);
            return;
        }
        displayCountdown(seconds);
    },1000);
}
const countdownEle = document.getElementById('countdown');
function displayCountdown(seconds){
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    countdownEle.innerText = `${formatMinutesOrSeconds(minutes)}:${formatMinutesOrSeconds(secondsLeft)}`;
}

function displayEndTime(endTime){
    document.getElementById('final-time').innerText = endTime;
}

function formatMinutesOrSeconds(digit){
    return digit < 10 ? `0${digit}`: digit;
}

function formatHours(hours){
    return hours > 12 ? `${hours - 12}`: hours;
}

document.querySelector('.wrapper').addEventListener('click',function(event){
    console.log();
    if(event.target.tagName == 'BUTTON'){
        const ele = event.target;
        timer(+ele.dataset.min * 60);
    }
});

const timeInput = document.getElementById('time-input');

timeInput.addEventListener('input',function(){
    this.value = this.value.replace(/[^\d\.]/g,'');
})

timeInput.addEventListener('keydown',function(){
    if(event.keyCode == 13){
        timer(+this.value * 60 );
    }
})