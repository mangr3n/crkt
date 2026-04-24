import * as fs from 'fs';
import * as path from 'path';

export const loadZipfReference = (): Map<string, number> => {
  const filePath = path.resolve(__dirname, 'zipf_percentages.tsv');
  const content = fs.readFileSync(filePath, 'utf-8');
  const map = new Map<string, number>();

  for (const line of content.split('\n')) {
    if (!line) continue;
    const [word, pctStr] = line.split('\t');
    map.set(word, Number(pctStr));
  }

  return map;
};
