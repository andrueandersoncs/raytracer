import { dotProduct, negate } from "./vector";
import { hitSphere } from "./sphere";
import { interval } from "./interval";

export const hitRecord = (time, point, normal, rayInsideObject) => ({
  time,
  point,
  normal,
  rayInsideObject,
});

export const determineNormal = (ray, outwardNormal) => {
  const rayInsideObject = dotProduct(ray.direction, outwardNormal) > 0;
  const normal = rayInsideObject ? negate(outwardNormal) : outwardNormal;
  return { normal, rayInsideObject };
};

export const hit = (hittable, ray, timeInterval) => {
  switch (hittable.type) {
    case "sphere":
      return hitSphere(hittable, ray, timeInterval);
    default:
      throw new Error("Unknown hittable type");
  }
};

export const hitAny = (hittables, ray, timeInterval) =>
  hittables.reduce(
    ([hitAnything, closestHit], hittable) => {
      const actualMaxTime = closestHit ? closestHit.time : timeInterval.max;

      const [didHit, hitRecord] = hit(
        hittable,
        ray,
        interval(timeInterval.min, actualMaxTime)
      );

      if (didHit) return [true, hitRecord];

      return [hitAnything, closestHit];
    },
    [false, null]
  );
