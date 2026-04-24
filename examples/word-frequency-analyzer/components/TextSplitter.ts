import { Component } from '../../../src/Component';

export const TextSplitter = () => Component('TextSplitter', (text, next) => {
  const words = text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 0);
  for (const word of words) next(word);
});
