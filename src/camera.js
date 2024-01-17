import {
  vector,
  divideScalar,
  addVector,
  multiplyScalar,
  subtractVector,
} from "./vector";
import { pipe, partial, flipArgs } from "./functional";
import { ray, rayColor } from "./ray";
import { clamp, interval } from "./interval";
import { randomDouble } from "./utils";

export const camera = (aspectRatio, imageWidth, samplesPerPixel = 10) => {
  let imageHeight = imageWidth / aspectRatio;
  imageHeight = imageHeight < 1 ? 1 : imageHeight;

  const center = vector(0, 0, 0);

  const focalLength = 1;
  const viewportHeight = 2;
  const viewportWidth = viewportHeight * (imageWidth / imageHeight);

  const viewportU = vector(viewportWidth, 0, 0);
  const viewportV = vector(0, -viewportHeight, 0);

  const pixelDeltaU = divideScalar(viewportU, imageWidth);
  const pixelDeltaV = divideScalar(viewportV, imageHeight);

  const viewportUpperLeft = pipe(
    partial(flipArgs(subtractVector), vector(0, 0, focalLength)),
    partial(flipArgs(subtractVector), divideScalar(viewportU, 2)),
    partial(flipArgs(subtractVector), divideScalar(viewportV, 2))
  )(center);

  const pixel00Location = addVector(
    viewportUpperLeft,
    multiplyScalar(addVector(pixelDeltaU, pixelDeltaV), 0.5)
  );

  return {
    aspectRatio,
    imageWidth,
    imageHeight,
    center,
    pixel00Location,
    pixelDeltaU,
    pixelDeltaV,
    samplesPerPixel,
  };
};

const setPixel = (buffer, x, y, color, samplesPerPixel) => {
  const index = (x + y * buffer.width) * 4;
  const scaledColor = divideScalar(color, samplesPerPixel);
  const intensity = interval(0, 0.999);
  buffer.data[index + 0] = clamp(intensity, scaledColor[0]) * 255;
  buffer.data[index + 1] = clamp(intensity, scaledColor[1]) * 255;
  buffer.data[index + 2] = clamp(intensity, scaledColor[2]) * 255;
  buffer.data[index + 3] = 255;
};

export const render = (camera, context, hittables) => {
  const { imageWidth, imageHeight, samplesPerPixel } = camera;

  const buffer = context.createImageData(imageWidth, imageHeight);

  for (let i = 0; i < imageWidth; i++) {
    for (let j = 0; j < imageHeight; j++) {
      const pixelColor = Array(samplesPerPixel)
        .fill(0)
        .reduce((color) => {
          const pixelRay = getPixelRay(camera, i, j);
          return addVector(color, rayColor(pixelRay, hittables));
        }, vector(0, 0, 0));

      setPixel(buffer, i, j, pixelColor, samplesPerPixel);
    }
  }

  context.putImageData(buffer, 0, 0);
};



const getPixelRay = (camera, i, j) => {
  const { pixel00Location, pixelDeltaU, pixelDeltaV, center } = camera;
  const pixelCenter = pipe(
    partial(addVector, multiplyScalar(pixelDeltaU, i)),
    partial(addVector, multiplyScalar(pixelDeltaV, j))
  )(pixel00Location);
  const pixelSample = addVector(pixelCenter, pixelSampleSquare(camera))
  const rayDirection = subtractVector(pixelSample, center);
  return ray(center, rayDirection);
};

const pixelSampleSquare = (camera) => {
  const x = -0.5 * randomDouble()
  const y = -0.5 * randomDouble()
  return addVector(
    multiplyScalar(camera.pixelDeltaU, x),
    multiplyScalar(camera.pixelDeltaV, y)
  )
}