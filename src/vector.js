import { memo, curry } from "./functional";

// export const vector = (a, b, c) => [a, b, c];

export const negate = (v) => v.map((c) => -c);

export const addVector = (v1, v2) => v1.map((c, i) => c + v2[i]);

export const subtractVector = (v1, v2) => addVector(v1, negate(v2));

export const multiplyScalar = (v, s) => v.map((c) => c * s);

export const multiplyVector = (v1, v2) => v1.map((c, i) => c * v2[i]);

export const divideScalar = (v, s) => multiplyScalar(v, 1 / s);

// export const lengthSquared = (v) => v.reduce((a, c) => a + c * c, 0);
// export const length = (v) => Math.sqrt(lengthSquared(v));

export const dotProduct = (v1, v2) => v1.reduce((a, c, i) => a + c * v2[i], 0);

export const crossProduct = (v1, v2) =>
  vector(
    v1[1] * v2[2] - v1[2] * v2[1],
    v1[2] * v2[0] - v1[0] * v2[2],
    v1[0] * v2[1] - v1[1] * v2[0]
  );

export const normalize = (v) => divideScalar(v, length(v));


// Memoized versions:
export const lengthSquared = memo((v) => v.reduce((a, c) => a + c * c, 0));
export const length = memo((v) => Math.sqrt(lengthSquared(v)));

const mVector = memo(curry((a, b, c) => [a, b, c]));
export const vector = (a, b, c) => mVector(a)(b)(c);

// const mAddVector = memo(curry((v1, v2) => v1.map((c, i) => c + v2[i])));
// export const addVector = (v1, v2) => mAddVector(v1)(v2);