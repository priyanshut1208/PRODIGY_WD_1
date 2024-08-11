let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsContainer = document.getElementById('lapTimesContainer');
const calendarGrid = document.querySelector('.calendar-grid');
const currentMonthYear = document.getElementById('current-month-year');
let currentDate = new Date();

function startTimer() {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateTimer, 10);
    startStopButton.textContent = 'Stop';
    startStopButton.style.backgroundColor = '#f44336';
    running = true;
}

function stopTimer() {
    clearInterval(timerInterval);
    difference = new Date().getTime() - startTime;
    startStopButton.textContent = 'Start';
    startStopButton.style.backgroundColor = '#4caf50';
    running = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.00';
    startStopButton.textContent = 'Start';
    startStopButton.style.backgroundColor = '#4caf50';
    difference = 0;
    lapsContainer.innerHTML = '';
    laps = [];
    running = false;
}

function updateTimer() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    let milliseconds = parseInt((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function recordLap() {
    const lapTime = formatTime(updatedTime);
    const lapElement = document.createElement('div');
    lapElement.className = 'lap-time';
    lapElement.textContent = `Lap ${laps.length + 1}: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
    laps.push(lapTime);
}

function updateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    currentMonthYear.textContent = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    calendarGrid.innerHTML = generateCalendarGrid(year, month);
}

function generateCalendarGrid(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let grid = '';

    for (let i = 0; i < firstDay; i++) {
        grid += '<div></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        grid += `<div class="calendar-date">${day}</div>`;
    }

    return grid;
}

document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

startStopButton.addEventListener('click', function() {
    if (!running) {
        startTimer();
    } else {
        stopTimer();
    }
});

resetButton.addEventListener('click', function() {
    resetTimer();
});

lapButton.addEventListener('click', function() {
    if (running) {
        recordLap();
    }
});

function updateCurrentTime() {
    document.getElementById('current-time').textContent = new Date().toLocaleTimeString();
}

setInterval(updateCurrentTime, 1000);
updateCalendar();
updateCurrentTime();
