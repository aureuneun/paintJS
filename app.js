const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

const stopPainting = () => (painting = false);

const startPainting = () => (painting = true);

const onMouseMove = (e) => {
  const { offsetX: x, offsetY: y } = e;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const handleColorClick = (e) => {
  const {
    target: {
      style: { backgroundColor: color },
    },
  } = e;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
};

const handleRangeInput = (e) => {
  const {
    target: { value },
  } = e;
  ctx.lineWidth = parseInt(value);
};

const handleModeClick = (e) => {
  const {
    target: { innerHTML },
  } = e;
  console.log(innerHTML);
  if (innerHTML === "Fill") {
    mode.innerHTML = "Paint";
    filling = true;
  } else {
    mode.innerHTML = "Fill";
    filling = false;
  }
};

const handleCanvasClick = () => {
  if (filling === true) ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
};

const handleCM = (e) => {
  e.preventDefault();
};

const handleSaveClick = () => {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "image";
  link.click();
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
  colors.forEach((color) => color.addEventListener("click", handleColorClick));
  range.addEventListener("input", handleRangeInput);
  mode.addEventListener("click", handleModeClick);
  save.addEventListener("click", handleSaveClick);
}
