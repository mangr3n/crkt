import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import * as path from 'path';

const CLI_PATH = path.resolve(__dirname, '../../../examples/word-frequency-analyzer/cli.ts');
const SAMPLE_FILE = path.resolve(__dirname, '../../../examples/word-frequency-analyzer/input/sample-medical.txt');

const runCli = (arg: string) =>
  execSync(`npx tsx ${CLI_PATH} ${arg}`, { encoding: 'utf-8', cwd: path.resolve(__dirname, '../../..') });

describe('CLI', () => {
  it('should accept a string argument and produce deviation results', () => {
    const output = runCli('"The quick brown fox jumped over the lazy dog."');

    expect(output).toContain('Top 10 most distinctive words');
    expect(output).toContain('Rank');
    expect(output).toContain('Deviation');
    expect(output).toContain('fox');
    expect(output).toContain('lazy');
    expect(output).toContain('jumped');
  }, 15000);

  it('should accept a filename and produce deviation results', () => {
    const output = runCli(SAMPLE_FILE);

    expect(output).toContain('Top 10 most distinctive words');
    // Medical terms should dominate
    expect(output).toContain('myocardial');
    expect(output).toContain('infarction');
  }, 15000);
});
