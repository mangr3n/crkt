import * as fs from 'fs';
import { SalienceEvaluator } from './SalienceEvaluator';

const arg = process.argv[2];

if (!arg) {
  console.error('Usage: npx tsx examples/word-frequency-analyzer/cli.ts <string or filename>');
  process.exit(1);
}

let content: string;
if (fs.existsSync(arg)) {
  content = fs.readFileSync(arg, 'utf-8');
} else {
  content = arg;
}

const evaluator = SalienceEvaluator(content, 10);

evaluator.on((results) => {
  console.log('\nTop 10 most distinctive words:\n');
  console.log(
    'Rank'.padEnd(6) +
    'Word'.padEnd(20) +
    'Observed %'.padEnd(14) +
    'Expected %'.padEnd(14) +
    'Deviation (x)'
  );
  console.log('-'.repeat(67));

  results.forEach((entry, i) => {
    console.log(
      `${i + 1}`.padEnd(6) +
      entry.word.padEnd(20) +
      `${(entry.observed * 100).toFixed(4)}%`.padEnd(14) +
      `${(entry.expected * 100).toFixed(6)}%`.padEnd(14) +
      `${entry.deviation.toFixed(1)}x`
    );
  });

  console.log();
});

evaluator.send(null);
