import { Component } from '../../../src/Component';

export const Source = (content) => Component('Source', (v, next) => next(content));
