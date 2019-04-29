console.log("ready");
// Initial Setup
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var x = 100;
var y = 100;
var radius = 30;
var color = 'black';
var dx = 2;
var dy = 5;
var gravity = 0.6;
var damping = 0.8;
var paused = false;

function animate() {

	context.clearRect(0, 0, canvas.width, canvas.height);
  if (!paused) {
    requestAnimationFrame(animate);
  }

  if(y + radius + dy > canvas.height) {
    dy = -dy;
    dy = dy * damping;
    dx = dx * damping;
  } else {
    dy += gravity;
  }

  if(x + radius + dx > canvas.width || x - radius < 0) {
    dx = -dx * damping;
  }

  y += dy;
  x += dx;

  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.fillStyle = color;
  context.fill();
  context.stroke();
  context.closePath();

}

animate();

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);

function handleMouseDown(e) {
  x = e.pageX - canvas.offsetLeft;
  y = e.pageY - canvas.offsetTop;
  dx = dy = 0;
  paused = true;
}

function handleMouseUp(e) {
  x = e.pageX - canvas.offsetLeft - dx;
  y = e.pageY - canvas.offsetTop - dy;
  paused = false;
  animate();
}
