import { describe, it, expect, vi } from 'vitest';
import { TextSplitter } from '../../../examples/word-frequency-analyzer/components/TextSplitter';

describe('TextSplitter', () => {
  it('should split a sentence into individual lowercase words, stripping punctuation', (done) => {
    const splitter = TextSplitter();
    const handler = vi.fn();

    splitter.on(handler);
    splitter.send("The quick brown fox jumped over the lazy dog.");

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(9);
      expect(handler.mock.calls.map(c => c[0])).toEqual([
        "the", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"
      ]);
      done();
    }, 20);
  });
});
