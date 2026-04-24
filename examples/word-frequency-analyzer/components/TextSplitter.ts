import { Component, Demuxer, Chain } from '../../../src';

export const TextSplitter = () => {
  const tokenizer = Component('Tokenizer', (text, next) => {
    const words = text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 0);
    for (const word of words) next({ value: word });
    next({ done: true });
  });

  const splitter = Demuxer('value', 'done');

  return Component({
    name: 'TextSplitter',
    components: {
      tokenizer,
      splitter,
    },
    outputs: ['done'],
    connections: [
      ['in', 'tokenizer'],
      ['tokenizer', 'splitter'],
      ['splitter.value', 'out'],
      ['splitter.done', 'out.done'],
    ],
  });
};
