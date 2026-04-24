import { Component } from '../../src/Component';
import { Source } from './components/Source';
import { TextSplitter } from './components/TextSplitter';
import { WordCounter } from './components/WordCounter';
import { QueryableMemory } from './components/QueryableMemory';

export const SalienceEvaluator = (content) => {
  const source = Source(content);
  const splitter = TextSplitter();
  const counter = WordCounter();
  const memory = QueryableMemory();

  return Component({
    name: 'SalienceEvaluator',
    components: {
      source,
      splitter,
      counter,
      memory,
    },
    connections: [
      ['in', 'source'],
      ['source', 'splitter'],
      ['splitter', 'counter'],
      ['counter', 'memory'],
      ['splitter.done', 'memory.query'],
      ['memory', 'out'],
    ],
  });
};
