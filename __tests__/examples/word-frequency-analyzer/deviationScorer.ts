import { describe, it, expect, vi } from 'vitest';
import { DeviationScorer } from '../../../examples/word-frequency-analyzer/components/DeviationScorer';

describe('DeviationScorer', () => {
  it('should compute deviation ratios and return top N results sorted by deviation', (done) => {
    // Mock reference: "the" is common (3.9%), "fox" is rare (0.001%), "zzz" not in reference
    const mockReference = new Map<string, number>([
      ['the', 0.039],
      ['fox', 0.001],
      ['quick', 0.0005],
    ]);

    const scorer = DeviationScorer(mockReference, 2);
    const handler = vi.fn();

    scorer.on(handler);

    // observed percentages: each word is 25% of a 4-word text
    scorer.send({ the: 0.25, fox: 0.25, quick: 0.25, zzz: 0.25 });

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(1);
      const result = handler.mock.calls[0][0];
      expect(result).toHaveLength(2);

      // quick: 0.25 / 0.0005 = 500x overrepresented — highest
      expect(result[0].word).toBe('quick');
      expect(result[0].deviation).toBeCloseTo(500);
      expect(result[0].observed).toBeCloseTo(0.25);
      expect(result[0].expected).toBeCloseTo(0.0005);

      // fox: 0.25 / 0.001 = 250x overrepresented
      expect(result[1].word).toBe('fox');
      expect(result[1].deviation).toBeCloseTo(250);

      done();
    }, 20);
  });

  it('should skip words not found in the reference', (done) => {
    const mockReference = new Map<string, number>([
      ['hello', 0.001],
    ]);

    const scorer = DeviationScorer(mockReference, 10);
    const handler = vi.fn();

    scorer.on(handler);
    scorer.send({ hello: 0.5, unknownword: 0.5 });

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(1);
      const result = handler.mock.calls[0][0];
      expect(result).toHaveLength(1);
      expect(result[0].word).toBe('hello');
      done();
    }, 20);
  });
});
