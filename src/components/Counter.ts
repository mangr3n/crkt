import { Component } from '..';

export const Counter = (initial = 0) => {
  let value = initial;
  return Component((v, next) => {
    value++;
    const result = value;
    next(result);
  });
};
