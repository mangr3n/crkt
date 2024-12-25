import { Component } from '../Component';
import { map } from '../util/fp';
import { Mapper } from './Mapper';

export const Hub = (...inputs) => {
  let components = {};
  let connections = [['in', 'out']];
  map(
    i => {
      components[i] = Mapper(v => ({ [i]: v }));
      connections.push([`in.${i}`, i], [i, 'out']);
    },
    inputs
  );
  return Component({ components, connections, inputs });
};
