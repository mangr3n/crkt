import { Component, Demuxer } from '../../../src';

export const LineSplitter = () => {
  const serializer = Component('LineSerializer', (text, next) => {
    const lines = text.split('\n').filter(l => l.length > 0);
    for (const line of lines) next({ value: line });
    next({ done: true });
  });

  const splitter = Demuxer('value', 'done');

  return Component({
    name: 'LineSplitter',
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
