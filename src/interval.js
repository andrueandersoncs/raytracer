export const interval = (min, max) => ({
  min,
  max,
});

export const contains = (interval, value) =>
  interval.min <= value && value <= interval.max;

export const surrounds = (interval, value) =>
  interval.min < value && value < interval.max;

export const empty = interval(Infinity, -Infinity);

export const universe = interval(-Infinity, Infinity);

export const clamp = (interval, value) => {
  if (value < interval.min) return interval.min;
  if (value > interval.max) return interval.max;
  return value;
}