import { describe, it, expect, vi } from 'vitest';
import { FileReader } from '../../../examples/word-frequency-analyzer/components/FileReader';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('FileReader', () => {
  it('should read a file and emit its contents as a string', (done) => {
    const tmpFile = path.join(os.tmpdir(), 'filereader-test.txt');
    fs.writeFileSync(tmpFile, 'hello\nworld\n');

    const reader = FileReader();
    const handler = vi.fn();

    reader.on(handler);
    reader.send(tmpFile);

    setTimeout(() => {
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith('hello\nworld\n');
      fs.unlinkSync(tmpFile);
      done();
    }, 50);
  });
});
