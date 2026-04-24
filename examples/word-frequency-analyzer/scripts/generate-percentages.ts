import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

const INPUT = path.resolve(__dirname, '../data/count_1w.txt');
const OUTPUT = path.resolve(__dirname, '../data/zipf_percentages.tsv');
const TOP_N = 50000;

async function generate() {
  const entries: { word: string; count: number }[] = [];
  let total = 0;

  const rl = readline.createInterface({ input: fs.createReadStream(INPUT) });

  for await (const line of rl) {
    if (!line) continue;
    const [word, countStr] = line.split('\t');
    const count = Number(countStr);
    entries.push({ word, count });
    total += count;
  }

  const top = entries.slice(0, TOP_N);
  const lines = top.map(({ word, count }) => `${word}\t${(count / total).toFixed(15)}`);
  fs.writeFileSync(OUTPUT, lines.join('\n') + '\n');

  console.log(`Total words: ${total}`);
  console.log(`Wrote ${top.length} entries to ${OUTPUT}`);
  console.log(`First 5:`);
  lines.slice(0, 5).forEach(l => console.log(`  ${l}`));
}

generate();
