import { describe, it, expect, vi } from 'vitest';
import { SumCounts } from '../../../examples/word-frequency-analyzer/components/SumCounts';

describe('SumCounts', () => {
  it('should accumulate the count field and emit running total', (done) => {
    const sum = SumCounts();
    const handler = vi.fn();

    sum.on(handler);
    sum.send({ word: 'the', count: 100 });
    sum.send({ word: 'of', count: 50 });
    sum.send({ word: 'and', count: 30 });

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(3);
      expect(handler.mock.calls[0][0]).toBe(100);
      expect(handler.mock.calls[1][0]).toBe(150);
      expect(handler.mock.calls[2][0]).toBe(180);
      done();
    }, 20);
  });
});
