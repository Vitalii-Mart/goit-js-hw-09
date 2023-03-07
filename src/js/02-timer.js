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



const currentDate = Date.now();
let userDate = null;
let setectedTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    userDate = selectedDates;
    setectedTime = userDate.getTime();
    const currentTime = Date.now();
    const deltaTime = setectedTime - currentTime;
    
    
    if (deltaTime <= 0) {
      Notify.failure("Please choose a date in the future");
    }
    // return btnEl.disabled = false;

  },
};

flatpickr(inputEl, options);

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (isActive) {
      return;
    };
    this.isActive - true;
    this.intervalId = setInterval(() => {
      // const deltaTime = selectedDates - currentDate;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
    }, 1000);
  },
};

btnEl.addEventListener('click', () => {
  timer.start();
});

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
