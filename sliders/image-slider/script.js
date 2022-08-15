const imgs = document.getElementById('images'),
  leftBtn = document.getElementById('left'),
  rightBtn = document.getElementById('right'),
  img = document.querySelectorAll('#images img');

let idx = 0;

let interval = setInterval(run, 2000);

leftBtn.addEventListener('click', () => {
  idx--;
  changeImage();
  resetInterval();
});

rightBtn.addEventListener('click', () => {
  idx++;
  changeImage();
  resetInterval();
});

function run() {
  idx++;
  changeImage();
}

function changeImage() {
  if (idx > img.length - 1) {
    idx = 0;
  } else if (idx < 0) {
    idx = img.length - 1;
  }

  imgs.style.transform = `translateX(${-idx * 600}px)`;
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(run, 2000);
}
