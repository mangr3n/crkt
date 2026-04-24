import { Component, Demuxer } from '../../../src';

export const TextSplitter = () => {
  const serializer = Component('Serializer', (words, next) => {
    for (const word of words) next({ value: word });
    next({ done: true });
  });

  const splitter = Demuxer('value', 'done');

  return Component({
    name: 'TextSplitter',
    components: {
      serializer,
      splitter,
    },
    outputs: ['done'],
    connections: [
      ['in', 'serializer'],
      ['serializer', 'splitter'],
      ['splitter.value', 'out'],
      ['splitter.done', 'out.done'],
    ],
  });
};
