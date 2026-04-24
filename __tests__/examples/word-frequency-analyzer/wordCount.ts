import { describe, it, expect, vi } from 'vitest';
import { WordCount } from '../../../examples/word-frequency-analyzer/components/WordCount';

describe('WordCount', () => {
  it('should emit the length of the input array', (done) => {
    const count = WordCount();
    const handler = vi.fn();

    count.on(handler);
    count.send(["the", "quick", "brown", "fox"]);

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(4);
      done();
    }, 20);
  });
});
