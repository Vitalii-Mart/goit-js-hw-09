import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const delayEL = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

formEl.addEventListener('submit', start);

function start(e) {
  e.preventDefault();

  let delay = Number(delayEL.value);
  const step = Number(stepEl.value);
  const amount = Number(amountEl.value);

  for (let position = 0; position < amount; position += 1) {
    createPromise(position + 1, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }, delay)
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }, delay);
    delay += step;
  }
  e.target.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = { position, delay };

  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res(promise);
      } else {
        rej(promise);
      }
    },delay);
  });
}
