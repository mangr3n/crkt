import { Component } from '../../../src/Component';

export const PercentageMapper = () => {
  let counts = null;
  let total = null;

  const compute = (next) => {
    if (counts !== null && total !== null) {
      const result = {};
      for (const word of Object.keys(counts)) {
        result[word] = counts[word] / total;
      }
      next(result);
    }
  };

  const store = Component('StoreCounts', (v, next) => {
    counts = v;
    compute(next);
  });

  const storeTotal = Component('StoreTotal', (v, next) => {
    total = v;
    compute(next);
  });

  return Component({
    name: 'PercentageMapper',
    components: {
      store,
      storeTotal,
    },
    inputs: ['total'],
    connections: [
      ['in', 'store'],
      ['in.total', 'storeTotal'],
      ['store', 'out'],
      ['storeTotal', 'out'],
    ],
  });
};
