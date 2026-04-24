import { describe, it, expect, vi } from 'vitest';
import { SalienceEvaluator } from '../../../examples/word-frequency-analyzer/SalienceEvaluator';

describe('SalienceEvaluator', () => {
  it('should produce a word frequency map from a text string', (done) => {
    const evaluator = SalienceEvaluator("The quick brown fox jumped over the lazy dog.");
    const handler = vi.fn();

    evaluator.on(handler);
    evaluator.send(null);

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
