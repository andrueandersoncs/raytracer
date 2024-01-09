import { vector } from "./vector";
import { sphere } from "./sphere";
import { camera, render } from "./camera";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const clearCanvas = () => {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
};

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  clearCanvas();
};

window.addEventListener("resize", resizeCanvas);

window.addEventListener("load", () => {
  resizeCanvas();
  clearCanvas();
  document.body.appendChild(canvas);
  main();
});

const main = () => {
  const hittables = [
    sphere(vector(0, 0, -1), 0.5),
    sphere(vector(0, -100.5, -1), 100),
  ];

  const c = camera(16 / 9, window.innerWidth);

  render(c, context, hittables);
};
