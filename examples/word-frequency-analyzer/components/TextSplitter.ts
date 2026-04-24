import { Component } from '../../../src/Component';

export const TextSplitter = () => {
  const wordEmitter = Component('WordEmitter', (text, next) => {
    const words = text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 0);
    for (const word of words) next(word);
  });

  const doneEmitter = Component('DoneEmitter', (text, next) => {
    next(true);
  });

  return Component({
    name: 'TextSplitter',
    components: {
      wordEmitter,
      doneEmitter,
    },
    outputs: ['done'],
    connections: [
      ['in', 'wordEmitter'],
      ['in', 'doneEmitter'],
      ['wordEmitter', 'out'],
      ['doneEmitter', 'out.done'],
    ],
    debug: [],
  });
};
