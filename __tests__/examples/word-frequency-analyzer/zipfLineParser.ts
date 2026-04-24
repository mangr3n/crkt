import { describe, it, expect, vi } from 'vitest';
import { ZipfLineParser } from '../../../examples/word-frequency-analyzer/components/ZipfLineParser';

describe('ZipfLineParser', () => {
  it('should parse a word\\tcount line and emit {word, count}', (done) => {
    const parser = ZipfLineParser();
    const handler = vi.fn();

    parser.on(handler);
    parser.send('the\t23135851162');

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith({ word: 'the', count: 23135851162 });
      done();
    }, 20);
  });
});
