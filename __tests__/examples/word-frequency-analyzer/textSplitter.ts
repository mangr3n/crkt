import { describe, it, expect, vi } from 'vitest';
import { TextSplitter } from '../../../examples/word-frequency-analyzer/components/TextSplitter';

describe('TextSplitter', () => {
  it('should serialize an array of words into individual word emissions', (done) => {
    const splitter = TextSplitter();
    const handler = vi.fn();

    splitter.on(handler);
    splitter.send(["the", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"]);

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(9);
      expect(handler.mock.calls.map(c => c[0])).toEqual([
        "the", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"
      ]);
      done();
    }, 20);
  });

  it('should emit a done signal on the done port after all words are emitted', (done) => {
    const splitter = TextSplitter();
    const wordHandler = vi.fn();
    const doneHandler = vi.fn();

    splitter.on(wordHandler);
    splitter.on('done', doneHandler);
    splitter.send(["the", "quick", "brown", "fox"]);

    setTimeout(() => {
      expect(wordHandler).toHaveBeenCalledTimes(4);
      expect(doneHandler).toHaveBeenCalledTimes(1);
      done();
    }, 20);
  });
});
