import { Component } from '../../../src/Component';

export const WordCount = () => Component('WordCount', (arr, next) => next(arr.length));
