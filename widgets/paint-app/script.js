const canvas = document.getElementById('canvas'),
  increaseBtn = document.getElementById('increase'),
  decreaseBtn = document.getElementById('decrease'),
  sizeEL = document.getElementById('size'),
  colorEl = document.getElementById('color'),
  clearEl = document.getElementById('clear');

const ctx = canvas.getContext('2d');

let size = 10,
  x,
  y;
let isPressed = false;
let color = '#444a1f';

// mouse events managing
canvas.addEventListener('mousedown', (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener('mouseup', (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
});

// drawing functions
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

// decrease and increase buttons for size manage
decreaseBtn.addEventListener('click', () => {
  size -= 5;
  if (size < 5) {
    size = 5;
  }

  updateSizeOnScreen();
});

increaseBtn.addEventListener('click', () => {
  size += 5;
  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

function updateSizeOnScreen() {
  sizeEL.innerText = size;
}

// clear the canvas; color change
colorEl.addEventListener('change', (e) => (color = e.target.value));

clearEl.addEventListener('click', () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);
