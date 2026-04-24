import { Component } from '../../../src/Component';

export const QueryableMemory = () => {
  let stored = undefined;

  const store = Component('Store', (v, next) => {
    stored = v;
  });

  const query = Component('Query', (v, next) => {
    if (stored !== undefined) next(stored);
  });

  return Component({
    name: 'QueryableMemory',
    components: {
      store,
      query,
    },
    inputs: ['query'],
    connections: [
      ['in', 'store'],
      ['in.query', 'query'],
      ['query', 'out'],
    ],
    debug: [],
  });
};
