import { addVector, vector } from "./vector";
import { sphere } from "./sphere";
import { camera, render } from "./camera";
// import { curry, memo } from "./functional";

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
  // const mAddVector = memo(curry(addVector));
  // const mVector = memo(curry(vector));
  // console.log(mAddVector(mVector(0)(0)(0))(mVector(1)(2)(3)));
  // console.log(mAddVector(mVector(0)(0)(0))(mVector(1)(2)(3)));
  // console.log(mAddVector(mVector(0)(0)(0))(mVector(1)(2)(3)));
  // console.log(mAddVector(mVector(0)(0)(0))(mVector(1)(2)(3)));
  // console.log(mAddVector(mVector(0)(0)(0))(mVector(1)(2)(3)));
  // console.log(mAddVector(mVector(0)(0)(0))(mVector(1)(2)(3)));

  // console.log(vector(1, 2, 3));

  // console.log(addVector(vector(1, 2, 3), vector(1, 2, 3)));
  // console.log(addVector(vector(1, 2, 3), vector(1, 2, 3)));
  // console.log(addVector(vector(1, 2, 3), vector(1, 2, 3)));
  // console.log(addVector(vector(1, 2, 3), vector(1, 2, 3)));

  const hittables = [
    sphere(vector(0, 0, -1), 0.5),
    sphere(vector(0, -100.5, -1), 100),
  ];

  const c = camera(16 / 9, window.innerWidth, 10);

  render(c, context, hittables);
};
