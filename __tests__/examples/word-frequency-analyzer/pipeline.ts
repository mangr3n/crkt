import { describe, it, expect, vi } from 'vitest';
import { Source } from '../../../examples/word-frequency-analyzer/components/Source';
import { Tokenizer } from '../../../examples/word-frequency-analyzer/components/Tokenizer';
import { TextSplitter } from '../../../examples/word-frequency-analyzer/components/TextSplitter';
import { WordCount } from '../../../examples/word-frequency-analyzer/components/WordCount';
import { WordCounter } from '../../../examples/word-frequency-analyzer/components/WordCounter';
import { QueryableMemory } from '../../../examples/word-frequency-analyzer/components/QueryableMemory';

describe('Word Frequency Pipeline', () => {
  it('should produce a word frequency map and total count from a text string', (done) => {
    const source = Source("The quick brown fox jumped over the lazy dog.");
    const tokenizer = Tokenizer();
    const splitter = TextSplitter();
    const wordCount = WordCount();
    const wordCountMemory = QueryableMemory();
    const counter = WordCounter();
    const counterMemory = QueryableMemory();
    const mapHandler = vi.fn();
    const countHandler = vi.fn();

    // Wire: Source → Tokenizer → [WordCount, TextSplitter (words)] → WordCounter → counterMemory
    // WordCount must be wired before TextSplitter so it processes before done fires
    source.on(v => tokenizer.send(v));
    tokenizer.on(v => wordCount.send(v));
    tokenizer.on(v => splitter.send(v));
    wordCount.on(v => wordCountMemory.send(v));
    splitter.on(v => counter.send(v));
    counter.on(v => counterMemory.send(v));

    // Wire: TextSplitter done → query both memories
    splitter.on('done', () => counterMemory.send('query', null));
    splitter.on('done', () => wordCountMemory.send('query', null));

    // Listen on outputs
    counterMemory.on(mapHandler);
    wordCountMemory.on(countHandler);

    // Trigger the pipeline
    source.send(null);

    setTimeout(() => {
      expect(mapHandler).toHaveBeenCalledTimes(1);
      expect(mapHandler).toHaveBeenCalledWith({
        the: 2,
        quick: 1,
        brown: 1,
        fox: 1,
        jumped: 1,
        over: 1,
        lazy: 1,
        dog: 1,
      });
      expect(countHandler).toHaveBeenCalledTimes(1);
      expect(countHandler).toHaveBeenCalledWith(9);
      done();
    }, 50);
  });
});
