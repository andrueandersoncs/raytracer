import { multiplyScalar, addVector, vector, normalize } from "./vector";
import { hitAny } from "./hittable";
import { interval } from "./interval";

export const ray = (origin, direction) => ({
  origin,
  direction,
});

export const rayAtTime = (ray, time) =>
  addVector(ray.origin, multiplyScalar(ray.direction, time));

export const rayColor = (ray, hittables) => {
  const [didHit, hitRecord] = hitAny(hittables, ray, interval(0, Infinity));

  if (didHit)
    return multiplyScalar(addVector(hitRecord.normal, vector(1, 1, 1)), 0.5);

  const unitDirection = normalize(ray.direction);
  const a = 0.5 * (unitDirection[1] + 1);

  return addVector(
    multiplyScalar(vector(1, 1, 1), 1 - a),
    multiplyScalar(vector(0.5, 0.7, 1), a)
  );
};
