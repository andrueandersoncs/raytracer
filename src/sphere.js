import { determineNormal, hitRecord } from "./hittable";
import { surrounds } from "./interval";
import { rayAtTime } from "./ray";
import {
  subtractVector,
  lengthSquared,
  dotProduct,
  divideScalar,
} from "./vector";

export const sphere = (center, radius) => ({
  type: "sphere",
  center,
  radius,
});

// In "raytracer in a weekend" the hit record is a mutable reference.. disgusting
export const hitSphere = (sphere, ray, timeInterval) => {
  const originToCenter = subtractVector(ray.origin, sphere.center);
  const a = lengthSquared(ray.direction);
  const halfB = dotProduct(originToCenter, ray.direction);
  const c = lengthSquared(originToCenter) - sphere.radius * sphere.radius;
  const discriminant = halfB * halfB - a * c;

  if (discriminant < 0) return [false, null];

  const squareRootOfDiscriminant = Math.sqrt(discriminant);
  const primaryRoot = (-halfB - squareRootOfDiscriminant) / a;
  const primaryRootInRange = surrounds(timeInterval, primaryRoot)

  // Awkward logic to avoid unnecessary computation
  const actualRoot = primaryRootInRange
    ? primaryRoot
    : (-halfB + squareRootOfDiscriminant) / a;

  const actualRootInRange = surrounds(timeInterval, actualRoot);

  if (!actualRootInRange) return [false, null];

  const time = actualRoot;
  const point = rayAtTime(ray, actualRoot);

  const outwardNormal = divideScalar(
    subtractVector(point, sphere.center),
    sphere.radius
  );

  const { normal, rayInsideObject } = determineNormal(ray, outwardNormal);

  return [true, hitRecord(time, point, normal, rayInsideObject)];
};
