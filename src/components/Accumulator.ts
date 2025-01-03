import { Component } from '../Component';
import { map, is, assoc, toPairs } from '../util/fp';

export const Accumulator = (initial = {}, name = '') => {
  let obj = initial;
  return Component((v, next) => {
    if (!is(Object, v)) return;
    map(
      ([key, value]: [string, string]) => {
        obj = assoc(key, value, obj);
      },
      toPairs(v)
    );
    next(obj);
  }, { name: `Accumulator(${name})` });
};
