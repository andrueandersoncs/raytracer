export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);

export const flipArgs = (f) => (a, b) => f(b, a);

export const partial = (f, ...args) => (...moreArgs) => f(...args, ...moreArgs);