const startEl = document.querySelector('[data-start]');
const stopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let timerId = null;

stopEl.disabled = true;

startEl.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  setTimeout(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 0);
  startEl.disabled = true;
  stopEl.disabled = false;
});
stopEl.addEventListener('click', () => {
  clearInterval(timerId);

  startEl.disabled = false;
  stopEl.disabled = true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
