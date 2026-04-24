import { Component, Demuxer } from '../../../src';
import * as fs from 'fs';
import * as readline from 'readline';

export const LineReader = () => {
  const reader = Component('Reader', (filePath, next) => {
    const rl = readline.createInterface({ input: fs.createReadStream(filePath) });
    rl.on('line', (line) => next({ value: line }));
    rl.on('close', () => next({ done: true }));
  });

  const splitter = Demuxer('value', 'done');

  return Component({
    name: 'LineReader',
    components: {
      reader,
      splitter,
    },
    outputs: ['done'],
    connections: [
      ['in', 'reader'],
      ['reader', 'splitter'],
      ['splitter.value', 'out'],
      ['splitter.done', 'out.done'],
    ],
  });
};
