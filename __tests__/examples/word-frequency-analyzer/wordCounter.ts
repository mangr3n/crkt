import { describe, it, expect, vi } from 'vitest';
import { WordCounter } from '../../../examples/word-frequency-analyzer/components/WordCounter';

describe('WordCounter', () => {
  it('should emit the accumulated word frequency map on every input', (done) => {
    const counter = WordCounter();
    const handler = vi.fn();

    counter.on(handler);
    counter.send("the");
    counter.send("fox");
    counter.send("the");

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(3);
      expect(handler.mock.calls[0][0]).toEqual({ the: 1 });
      expect(handler.mock.calls[1][0]).toEqual({ the: 1, fox: 1 });
      expect(handler.mock.calls[2][0]).toEqual({ the: 2, fox: 1 });
      done();
    }, 20);
  });
});
