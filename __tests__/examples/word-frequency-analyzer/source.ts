import { describe, it, expect, vi } from 'vitest';
import { Source } from '../../../examples/word-frequency-analyzer/components/Source';

describe('Source', () => {
  it('should emit the provided content when triggered', (done) => {
    const content = "The quick brown fox jumped over the lazy dog.";
    const source = Source(content);
    const handler = vi.fn();

    source.on(handler);
    source.send(null);

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(content);
      done();
    }, 20);
  });
});
