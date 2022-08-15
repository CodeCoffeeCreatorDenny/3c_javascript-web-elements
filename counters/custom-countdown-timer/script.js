const countdownForm = document.getElementById('countdownForm'),
  inputContainer = document.getElementById('input-container'),
  dateEl = document.getElementById('date-picker'),
  countdownEl = document.getElementById('countdown'),
  countdownElTitle = document.getElementById('countdown-title'),
  countdownBtn = document.getElementById('countdown-button'),
  timeElements = document.querySelectorAll('span'),
  completeEl = document.getElementById('complete'),
  completeElInfo = document.getElementById('complete-info'),
  completeBtn = document.getElementById('complete-button');

let countdownTitle = '',
  countdownDate = '',
  countdownValue = Date,
  countdownActive,
  savedCountdown;

const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

// Set Date input min value (we can't set the Past timer) & target value with today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime(),
      distance = countdownValue - now,
      days = Math.floor(distance / day),
      hours = Math.floor((distance % day) / hour),
      minutes = Math.floor((distance % hour) / minute),
      seconds = Math.floor((distance % minute) / second);

    inputContainer.hidden = true;
    // If the countdown has ended, show final state
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // else, show the countdown in progress
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days < 10 ? `0${days}` : days}`;
      timeElements[1].textContent = `${hours < 10 ? `0${hours}` : hours}`;
      timeElements[2].textContent = `${minutes < 10 ? `0${minutes}` : minutes}`;
      timeElements[3].textContent = `${seconds < 10 ? `0${seconds}` : seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

function updateCountdown(e) {
  e.preventDefault();
  // Set title and date, save to localStorage
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  // Check if no date entered
  if (countdownDate === '') {
    alert('Please select a date for the countdown.');
  } else {
    // Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function reset() {
  // Hide countdowns, show input form
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  // Stop the countdown
  clearInterval(countdownActive);
  // Reset values, remove localStorage item
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
  // Get countdown from localStorage if available
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load, check localStorage
restorePreviousCountdown();
