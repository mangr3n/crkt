import { Component } from '../../../src/Component';

export const Tokenizer = () => Component('Tokenizer', (text, next) => {
  const words = text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 0);
  next(words);
});
