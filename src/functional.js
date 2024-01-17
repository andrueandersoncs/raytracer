export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);

export const flipArgs = (f) => (a, b) => f(b, a);

export const partial =
  (f, ...args) =>
  (...moreArgs) =>
    f(...args, ...moreArgs);

export const memo = (f) => {
  if (f.length !== 1)
    throw new Error("Memoized function must have exactly 1 argument");
  const cache = new Map();
  return (arg) => {
    if (cache.has(arg)) {
      // console.log("hit!", f);
      return cache.get(arg);
    } else {
      // console.log("miss!", f);
      const result = f(arg);
      cache.set(arg, result);
      return result;
    }
  };
};

export const curry = memo((f) =>
  memo((arg) => (f.length > 1 ? curry(f.bind(undefined, arg)) : f(arg)))
);
