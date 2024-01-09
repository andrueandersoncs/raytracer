import {
  vector,
  divideScalar,
  addVector,
  multiplyScalar,
  subtractVector,
} from "./vector";
import { pipe, partial, flipArgs } from "./functional";
import { ray, rayColor } from "./ray";

export const camera = (aspectRatio, imageWidth) => {
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
  };
};

const setPixel = (buffer, x, y, color) => {
  const index = (x + y * buffer.width) * 4;
  buffer.data[index + 0] = color[0] * 255;
  buffer.data[index + 1] = color[1] * 255;
  buffer.data[index + 2] = color[2] * 255;
  buffer.data[index + 3] = 255;
};

export const render = (camera, context, hittables) => {
  const {
    imageWidth,
    imageHeight,
    pixel00Location,
    pixelDeltaU,
    pixelDeltaV,
    center,
  } = camera;

  const buffer = context.createImageData(imageWidth, imageHeight);

  for (let i = 0; i < imageWidth; i++) {
    for (let j = 0; j < imageHeight; j++) {
      const pixelCenter = pipe(
        partial(addVector, multiplyScalar(pixelDeltaU, i)),
        partial(addVector, multiplyScalar(pixelDeltaV, j))
      )(pixel00Location);

      const rayDirection = subtractVector(pixelCenter, center);
      const pixelRay = ray(center, rayDirection);
      const pixelColor = rayColor(pixelRay, hittables);

      setPixel(buffer, i, j, pixelColor);
    }
  }

  context.putImageData(buffer, 0, 0);
};
