import { describe, it, expect, vi } from 'vitest';
import { QueryableMemory } from '../../../examples/word-frequency-analyzer/components/QueryableMemory';

describe('QueryableMemory', () => {
  it('should store values silently and emit the latest on query', (done) => {
    const memory = QueryableMemory();
    const handler = vi.fn();

    memory.on(handler);

    memory.send("a");
    memory.send("b");
    memory.send("c");

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(0);

      memory.send('query', null);

      setTimeout(() => {
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledWith("c");
        done();
      }, 20);
    }, 20);
  });
});
