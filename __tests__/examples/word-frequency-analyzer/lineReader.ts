import { describe, it, expect, vi } from 'vitest';
import { LineReader } from '../../../examples/word-frequency-analyzer/components/LineReader';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('LineReader', () => {
  it('should emit each line from a file and a done signal', (done) => {
    const tmpFile = path.join(os.tmpdir(), 'linereader-test.txt');
    fs.writeFileSync(tmpFile, 'the\t23135851162\nof\t13151942776\nand\t12997637966\n');

    const reader = LineReader();
    const lineHandler = vi.fn();
    const doneHandler = vi.fn();

    reader.on(lineHandler);
    reader.on('done', doneHandler);
    reader.send(tmpFile);

    setTimeout(() => {
      expect(lineHandler).toHaveBeenCalledTimes(3);
      expect(lineHandler.mock.calls.map(c => c[0])).toEqual([
        'the\t23135851162',
        'of\t13151942776',
        'and\t12997637966',
      ]);
      expect(doneHandler).toHaveBeenCalledTimes(1);
      fs.unlinkSync(tmpFile);
      done();
    }, 100);
  });
});
