import { Component } from '../../src/Component';
import { Source } from './components/Source';
import { Tokenizer } from './components/Tokenizer';
import { TextSplitter } from './components/TextSplitter';
import { WordCount } from './components/WordCount';
import { WordCounter } from './components/WordCounter';
import { QueryableMemory } from './components/QueryableMemory';
import { PercentageMapper } from './components/PercentageMapper';

export const SalienceEvaluator = (content) => {
  const source = Source(content);
  const tokenizer = Tokenizer();
  const splitter = TextSplitter();
  const wordCount = WordCount();
  const wordCountMemory = QueryableMemory();
  const counter = WordCounter();
  const counterMemory = QueryableMemory();
  const percentageMapper = PercentageMapper();

  return Component({
    name: 'SalienceEvaluator',
    components: {
      source,
      tokenizer,
      splitter,
      wordCount,
      wordCountMemory,
      counter,
      counterMemory,
      percentageMapper,
    },
    connections: [
      ['in', 'source'],
      ['source', 'tokenizer'],
      ['tokenizer', 'splitter'],
      ['tokenizer', 'wordCount'],
      ['wordCount', 'wordCountMemory'],
      ['splitter', 'counter'],
      ['counter', 'counterMemory'],
      ['splitter.done', 'wordCountMemory.query'],
      ['splitter.done', 'counterMemory.query'],
      ['counterMemory', 'percentageMapper'],
      ['wordCountMemory', 'percentageMapper.total'],
      ['percentageMapper', 'out'],
    ],
  });
};
