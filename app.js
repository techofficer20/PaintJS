const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "#2c2c2c"; // 그릴 선이 이 색을 갖는다고 설정
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5; // 그릴 선의 너비가 2.5
let painting = false;
let filling = false;
function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  // 마우스가 움직이는 동안..
  // console.log(event)
  // offset X, Y: canvas 내에서의 x, y좌표
  // client X, Y: 전체 내에서의 x, y 좌표
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // painting이 false라면 (기본값)
    // console.log("creating path", x, y);
    ctx.beginPath(); // 클릭하지 않고, 마우스를 이동했을 때는 path 시작
    ctx.moveTo(x, y); // path를 만들면 마우스의 x, y 좌표로 path를 옮김
  } else {
    // painting이 true면
    // console.log("creating line", x, y);
    ctx.lineTo(x, y); // path의 이전 위치에서 지금 위치까지 선을 만든다.
    ctx.stroke(); // 현재의 sub-path를 현재의 stroke style로 획을 그음
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
function handleColorRange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
function handleCM(event) {
  event.preventDefault();
}
function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // 마우스를 움직일 때
  canvas.addEventListener("mousedown", startPainting); // 클릭했을 때 발생하는 이벤트
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

// Array.from 메소드는 object로부터 array를 만든다.
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleColorRange);
}
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
