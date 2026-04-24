import { describe, it, expect, vi } from 'vitest';
import { LineSplitter } from '../../../examples/word-frequency-analyzer/components/LineSplitter';

describe('LineSplitter', () => {
  it('should emit individual lines and a done signal', (done) => {
    const splitter = LineSplitter();
    const lineHandler = vi.fn();
    const doneHandler = vi.fn();

    splitter.on(lineHandler);
    splitter.on('done', doneHandler);
    splitter.send("the\t23135851162\nof\t13151942776\nand\t12997637966\n");

    setTimeout(() => {
      expect(lineHandler).toHaveBeenCalledTimes(3);
      expect(lineHandler.mock.calls.map(c => c[0])).toEqual([
        "the\t23135851162",
        "of\t13151942776",
        "and\t12997637966",
      ]);
      expect(doneHandler).toHaveBeenCalledTimes(1);
      done();
    }, 20);
  });
});
