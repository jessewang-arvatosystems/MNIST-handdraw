// Constants
const MNIST_PX_SIZE = 28;
const CANVAS_SIZE = 280; // The bigger this is, the less precise the final image will be. I found 280 to be the sweet spot

// Selectors
const canvas = document.getElementById('canvas');
const resetBtn = document.getElementById('reset');
const downloadBtn = document.getElementById('download');
const downloadLink = document.getElementById('downloadLink');
const filenameInput = document.getElementById('filenameInput');
const incrementEnabled = document.getElementById('incrementEnabled');
const resetEnabled = document.getElementById('resetEnabled');
const invertColors = document.getElementById('invertColors');
const strokeWidthInput = document.getElementById('strokeWidthInput');
const currentWidth = document.getElementById('currentWidth');

// Initialize Canvas
let backgroundColor = '#000';
let lineColor = '#FFF';
let lineWidth = strokeWidthInput.value;
currentWidth.innerText = lineWidth;
invertColors.checked = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
const ctx = canvas.getContext('2d', { alpha: false });
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
let xOffset = 0;
let yOffset = 0;
let pos = { x: xOffset, y: yOffset };
updateScreen();

// Event listeners
window.addEventListener('resize', updateScreen);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', setPosition);
canvas.addEventListener('mouseenter', setPosition);
resetBtn.addEventListener('click', reset);
downloadBtn.addEventListener('click',  downloadHandler);
strokeWidthInput.addEventListener('change', updateStrokeWidth);
invertColors.addEventListener('change', invertColorsHandler);

function setPosition(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

function draw(e) {
  if (e.buttons !== 1) {
      return;
  }

  ctx.beginPath();

  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.strokeStyle = lineColor;

  ctx.moveTo(pos.x - xOffset, pos.y - yOffset);
  setPosition(e);
  ctx.lineTo(pos.x - xOffset, pos.y - yOffset);

  ctx.stroke();
}

function reset() {
  ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateScreen() {
  const canvasPosition = canvas.getBoundingClientRect();
  xOffset = canvasPosition.x;
  yOffset = canvasPosition.y;
}

function downloadHandler() {
  const newCanvas = document.createElement('canvas');
  const context = newCanvas.getContext('2d', { alpha: false });
  newCanvas.width = MNIST_PX_SIZE;
  newCanvas.height = MNIST_PX_SIZE;

  const scaleFactor = MNIST_PX_SIZE / canvas.width;

  context.scale(scaleFactor, scaleFactor);
  context.drawImage(canvas, 0, 0);

  const image = IJS.Image.fromCanvas(newCanvas);
  const url = image.grey().toDataURL();

  const currentFileName = filenameInput.value;
  downloadLink.setAttribute('href', url);
  downloadLink.setAttribute('download', currentFileName);
  downloadLink.click();

  if (incrementEnabled.checked) {
    filenameInput.value = String(Number(currentFileName.substring(0, currentFileName.indexOf('.'))) + 1) + '.png';
  }
  if (resetEnabled.checked) {
    reset();
  }
}

function updateStrokeWidth() {
  lineWidth = strokeWidthInput.value;
  currentWidth.innerText = lineWidth;
}

function invertColorsHandler() {
  if (invertColors.checked) {
    backgroundColor = '#FFF';
    lineColor = '#000';
  } else {
    backgroundColor = '#000';
    lineColor = '#FFF';
  }
  reset();
}
