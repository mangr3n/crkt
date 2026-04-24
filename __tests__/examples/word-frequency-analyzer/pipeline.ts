import { describe, it, expect, vi } from 'vitest';
import { Source } from '../../../examples/word-frequency-analyzer/components/Source';
import { TextSplitter } from '../../../examples/word-frequency-analyzer/components/TextSplitter';
import { WordCounter } from '../../../examples/word-frequency-analyzer/components/WordCounter';
import { QueryableMemory } from '../../../examples/word-frequency-analyzer/components/QueryableMemory';

describe('Word Frequency Pipeline', () => {
  it('should produce a word frequency map from a text string', (done) => {
    const source = Source("The quick brown fox jumped over the lazy dog.");
    const splitter = TextSplitter();
    const counter = WordCounter();
    const memory = QueryableMemory();
    const handler = vi.fn();

    // Wire: Source → TextSplitter (words) → WordCounter → QueryableMemory (store)
    source.on(v => splitter.send(v));
    splitter.on(v => counter.send(v));
    counter.on(v => memory.send(v));

    // Wire: TextSplitter done → QueryableMemory query
    splitter.on('done', () => memory.send('query', null));

    // Listen on the final output
    memory.on(handler);

    // Trigger the pipeline
    source.send(null);

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({
        the: 2,
        quick: 1,
        brown: 1,
        fox: 1,
        jumped: 1,
        over: 1,
        lazy: 1,
        dog: 1,
      });
      done();
    }, 50);
  });
});
