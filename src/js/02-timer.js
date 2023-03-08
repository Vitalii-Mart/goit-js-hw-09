import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnEl.disabled = true;

const currentTime = new Date();
let chosenDate = 0;
let interval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];
    const timeDifference = chosenDate - currentTime;
    if (timeDifference <= 0) {
      Notify.failure('Please choose a date in the future');
      btnEl.disabled = true;
    } else btnEl.disabled = false;
  },
};

btnEl.addEventListener('click', start);

const fp = flatpickr(inputEl, options);

function start() {
  btnEl.disabled = true;
  inputEl.setAttribute('disabled', false);
  inputEl.disabled = true;
  interval = setInterval(() => {
    const backTime = fp.selectedDates[0] - new Date();

    const convertedTime = convertMs(backTime);
    console.log(backTime);

    if (backTime <= 900) {
      clearInterval(interval);
    }

    timeUpdate(convertedTime);
  }, 1000);

  function timeUpdate({ days, hours, minutes, seconds }) {
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
