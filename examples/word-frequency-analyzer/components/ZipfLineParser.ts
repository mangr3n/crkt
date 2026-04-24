import { Component } from '../../../src/Component';

export const ZipfLineParser = () => Component('ZipfLineParser', (line, next) => {
  const [word, countStr] = line.split('\t');
  next({ word, count: Number(countStr) });
});
