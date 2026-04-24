import { Component } from '../../../src/Component';

export const WordCounter = () => {
  const counts = {};
  return Component('WordCounter', (word, next) => {
    counts[word] = (counts[word] || 0) + 1;
    next({ ...counts });
  });
};
