import { Component } from '../../../src/Component';

export const DeviationScorer = (reference: Map<string, number>, topN: number = 10) =>
  Component('DeviationScorer', (percentageMap, next) => {
    const results: { word: string; observed: number; expected: number; deviation: number }[] = [];

    for (const [word, observed] of Object.entries(percentageMap)) {
      const expected = reference.get(word);
      if (expected === undefined) continue;
      const deviation = (observed as number) / expected;
      results.push({ word, observed: observed as number, expected, deviation });
    }

    results.sort((a, b) => b.deviation - a.deviation);
    next(results.slice(0, topN));
  });
