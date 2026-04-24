import { describe, it, expect, vi } from 'vitest';
import { LineReader } from '../../../examples/word-frequency-analyzer/components/LineReader';
import { ZipfLineParser } from '../../../examples/word-frequency-analyzer/components/ZipfLineParser';
import { SumCounts } from '../../../examples/word-frequency-analyzer/components/SumCounts';
import { QueryableMemory } from '../../../examples/word-frequency-analyzer/components/QueryableMemory';
import * as path from 'path';

describe('Zipf Total Count Pipeline', () => {
  it('should compute the total word count from the Norvig data file', (done) => {
    const filePath = path.resolve(__dirname, '../../../examples/word-frequency-analyzer/data/count_1w.txt');
    const reader = LineReader();
    const parser = ZipfLineParser();
    const sum = SumCounts();
    const memory = QueryableMemory();
    const handler = vi.fn();

    reader.on(v => parser.send(v));
    parser.on(v => sum.send(v));
    sum.on(v => memory.send(v));
    reader.on('done', () => memory.send('query', null));
    memory.on(handler);

    reader.send(filePath);

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(588124220187);
      done();
    }, 5000);
  }, 10000);
});
