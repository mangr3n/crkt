import { Component } from '../../../src/Component';

export const SumCounts = () => {
  let total = 0;
  return Component('SumCounts', (entry, next) => {
    total += entry.count;
    next(total);
  });
};
