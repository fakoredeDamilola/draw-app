let canvas = document.querySelector("canvas");
let shapes = document.querySelector(".shapes");
let tools = document.querySelector(".tools");
let color = document.querySelector("#color");
let download = document.querySelector(".download");
let lineWidthInput = document.querySelector("#lineWidth");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d"),
  lastX = 0,
  lastY = 0,
  startDrawing = false,
  drawingTool = "freeHand",
  drawingColor = "black",
  lineWidth = 1,
  width = 0,
  height = 0,
  xValue = 0,
  yValue = 0;
ctx.lineJoin = "round";
ctx.lineCap = "round";
// ctx.fillStyle = "#0099ff";

function drawFreeHand(e) {
  if (!startDrawing) return;
  ctx.strokeStyle = drawingColor;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  xValue = e.offsetX;
  yValue = e.offsetY;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
  ctx.lineWidth = lineWidth;
}
function eraserLine(e) {
  if (!startDrawing) return;
  ctx.strokeStyle = "red";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  xValue = e.offsetX;
  yValue = e.offsetY;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
  ctx.lineWidth = lineWidth;
}
function drawStraightLine(e) {
  if (!startDrawing) return;
  ctx.strokeStyle = drawingColor;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  xValue = e.offsetX;
  yValue = e.offsetY;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
  ctx.lineWidth = lineWidth;
}
function drawRectangle(e) {
  if (!startDrawing) return;

  xValue = e.layerX;
  yValue = e.layerY;
  width = xValue - lastX;
  height = yValue - lastY;
  ctx.fillRect(
    lastX, // x coord
    lastY, // y coord
    width, // width
    height
  ); // height
  ctx.fillStyle = drawingColor;
  ctx.lineWidth = lineWidth;
  ctx.fill();
}
function drawCircle(e) {
  if (!startDrawing) return;
  xValue = e.layerX;
  yValue = e.layerY;
  ctx.lineWidth = 0;
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = drawingColor;
  ctx.beginPath();
  ctx.arc(
    lastX, // X coordinate of arc start
    lastY, // Y coordinate of arc start
    xValue - lastX, // Radius
    0, // Start angle
    Math.PI * 2, // End angle
    true
  ); // Anticlockwise

  ctx.fill();
}
let x, y;
function drawLinePattern(e) {
  if (!startDrawing) return;
  ctx.strokeStyle = drawingColor;

  xValue = e.offsetX;
  yValue = e.offsetY;
  ctx.beginPath();
  x = e.offsetX - xValue;
  y = e.offsetY - yValue;

  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.lineWidth = lineWidth;
}
canvas.addEventListener("mousedown", (e) => {
  startDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => (startDrawing = false));
canvas.addEventListener("mousemove", function (e) {
  document.body.cursor = "pointer";
  let same = e;
  if (drawingTool == "freeHand") {
    drawFreeHand(same);
  } else if (drawingTool == "rectangle") {
    drawRectangle(same);
  } else if (drawingTool == "circle") {
    drawCircle(same);
  } else if (drawingTool == "linePattern") {
    drawLinePattern(same);
  } else if (drawingTool == "straightLine") {
    drawStraightLine(same);
  } else if (drawingTool == "eraser") {
    eraserLine(same);
  }
});
canvas.addEventListener("mouseout", () => (startDrawing = false));
shapes.addEventListener("click", function (e) {
  switch (e.target.parentElement.dataset.shape) {
    case "rectangle":
      drawingTool = "rectangle";
      break;
    case "freeHand":
      drawingTool = "freeHand";
      break;
    case "linePattern":
      drawingTool = "linePattern";
      break;
    case "straightLine":
      drawingTool = "straightLine";
      break;
    case "circle":
      drawingTool = "circle";
      break;
    case "eraser":
      drawingTool = "eraser";
      break;

    default:
      drawingTool = "freeHand";
      break;
  }
});

color.addEventListener("change", function () {
  drawingColor = color.value;
});
lineWidthInput.addEventListener("keyup", function () {
  lineWidth = lineWidthInput.value;
});
download.addEventListener("click", function () {
  let canva = document.querySelector("canvas");
  // let img = canva.toDataURL("image/png");

  let a = document.createElement("a");

  a.innerHTML = "you are";

  var img = new Image();
  let link = canva.toDataURL();
  img.src = link;

  a.setAttribute("href", link);
  a.download = "canvas.png";
  a.click();
});
