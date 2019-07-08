const canvas = document.getElementById("jsCanvas");
let painting = false;
function onMouseMove(event) {
  // console.log(event)
  // offset X, Y: canvas 내에서의 x, y좌표
  // client X, Y: 전체 내에서의 x, y 좌표
  const x = event.offsetX;
  const y = event.offsetY;
}
function onMouseDown(event) {
  painting = true;
}
function onMouseUp(event) {
  painting = false;
}
function onMouseLeave(event) {
  painting = false;
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown); // 클릭했을 때 발생하는 이벤트
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", onMouseLeave);
}
