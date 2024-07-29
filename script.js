let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function timeToString(time) {
    let hundredths = Math.floor((time % 1000) / 10); // Calculate hundredths of a second
    let diffInSeconds = Math.floor(time / 1000);
    let ss = diffInSeconds % 60;
    let mm = Math.floor(diffInSeconds / 60) % 60;
    let hh = Math.floor(diffInSeconds / 3600);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedHundredths = hundredths.toString().padStart(2, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedHundredths}`;
}

function print(txt) {
    display.textContent = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10); // Update every hundredth of a second (10 milliseconds)
    showButton('STOP');
}

function stop() {
    clearInterval(timerInterval);
    showButton('START');
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00.00");
    elapsedTime = 0;
    lapsContainer.innerHTML = "";
    showButton('START');
    running = false;
}

function showButton(buttonKey) {
    const button = buttonKey === 'START' ? 'Start' : 'Stop';
    startStopButton.textContent = button;
    startStopButton.classList.toggle('neon-button', buttonKey === 'START');
    startStopButton.classList.toggle('creative-button', buttonKey === 'STOP');
}

startStopButton.addEventListener('click', () => {
    if (!running) {
        start();
    } else {
        stop();
    }
    running = !running;
});

resetButton.addEventListener('click', reset);

lapButton.addEventListener('click', () => {
    if (running) {
        const lapTime = timeToString(elapsedTime);
        const lapCard = document.createElement('div');
        lapCard.className = 'lap-card flip-card';
        lapCard.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <p>Lap ${lapsContainer.childElementCount + 1}</p>
                </div>
                <div class="flip-card-back">
                    <p>${lapTime}</p>
                </div>
            </div>
        `;
        lapsContainer.appendChild(lapCard);
    }
});
