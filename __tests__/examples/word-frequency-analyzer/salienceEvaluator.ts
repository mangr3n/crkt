import { describe, it, expect, vi } from 'vitest';
import { SalienceEvaluator } from '../../../examples/word-frequency-analyzer/SalienceEvaluator';

describe('SalienceEvaluator', () => {
  it('should produce a word percentage map from a text string', (done) => {
    const evaluator = SalienceEvaluator("The quick brown fox jumped over the lazy dog.");
    const handler = vi.fn();

    evaluator.on(handler);
    evaluator.send(null);

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(1);
      const result = handler.mock.calls[0][0];
      expect(result.the).toBeCloseTo(2 / 9);
      expect(result.quick).toBeCloseTo(1 / 9);
      expect(result.brown).toBeCloseTo(1 / 9);
      expect(result.fox).toBeCloseTo(1 / 9);
      expect(result.jumped).toBeCloseTo(1 / 9);
      expect(result.over).toBeCloseTo(1 / 9);
      expect(result.lazy).toBeCloseTo(1 / 9);
      expect(result.dog).toBeCloseTo(1 / 9);
      done();
    }, 50);
  });
});
