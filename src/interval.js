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
