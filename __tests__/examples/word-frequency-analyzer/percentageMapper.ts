import { describe, it, expect, vi } from 'vitest';
import { PercentageMapper } from '../../../examples/word-frequency-analyzer/components/PercentageMapper';

describe('PercentageMapper', () => {
  it('should produce a percentage map from a frequency map and total count', (done) => {
    const mapper = PercentageMapper();
    const handler = vi.fn();

    mapper.on(handler);

    mapper.send({ the: 2, fox: 1, dog: 1 });
    mapper.send('total', 4);

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({ the: 0.5, fox: 0.25, dog: 0.25 });
      done();
    }, 20);
  });
});
