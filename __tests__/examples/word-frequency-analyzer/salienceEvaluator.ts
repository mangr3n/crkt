import { describe, it, expect, vi } from 'vitest';
import { SalienceEvaluator } from '../../../examples/word-frequency-analyzer/SalienceEvaluator';

describe('SalienceEvaluator', () => {
  it('should produce top deviation results from a text string', (done) => {
    const evaluator = SalienceEvaluator("The quick brown fox jumped over the lazy dog.", 10);
    const handler = vi.fn();

    evaluator.on(handler);
    evaluator.send(null);

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(1);
      const result = handler.mock.calls[0][0];

      // Should be an array of deviation entries sorted by deviation descending
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThanOrEqual(10);

      // Each entry should have the right shape
      for (const entry of result) {
        expect(entry).toHaveProperty('word');
        expect(entry).toHaveProperty('observed');
        expect(entry).toHaveProperty('expected');
        expect(entry).toHaveProperty('deviation');
        expect(entry.deviation).toBeGreaterThan(0);
      }

      // Should be sorted by deviation descending
      for (let i = 1; i < result.length; i++) {
        expect(result[i - 1].deviation).toBeGreaterThanOrEqual(result[i].deviation);
      }

      // "the" should have a low deviation (common word, close to expected)
      // Words like "fox", "lazy", "jumped" should have higher deviations
      const theEntry = result.find(e => e.word === 'the');
      const foxEntry = result.find(e => e.word === 'fox');
      if (theEntry && foxEntry) {
        expect(foxEntry.deviation).toBeGreaterThan(theEntry.deviation);
      }

      done();
    }, 100);
  });

  it('should identify domain-specific words as most salient in technical text', (done) => {
    const technicalText = `
      The patient presented with acute myocardial infarction and was treated with
      thrombolytic therapy. The electrocardiogram showed ST elevation in leads V1
      through V4. Cardiac catheterization revealed severe stenosis of the left
      anterior descending artery. The patient was started on aspirin, clopidogrel,
      and heparin. Echocardiography demonstrated reduced ejection fraction.
      The patient underwent percutaneous coronary intervention with stent placement.
    `;

    const evaluator = SalienceEvaluator(technicalText, 10);
    const handler = vi.fn();

    evaluator.on(handler);
    evaluator.send(null);

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(1);
      const result = handler.mock.calls[0][0];
      const topWords = result.map(e => e.word);

      // Medical/technical terms should dominate the top results, not common words
      const commonWords = ['the', 'and', 'was', 'with', 'of', 'in'];
      const topHalf = topWords.slice(0, 5);
      const commonInTop = topHalf.filter(w => commonWords.includes(w));
      expect(commonInTop.length).toBeLessThanOrEqual(1);

      done();
    }, 100);
  });
});
