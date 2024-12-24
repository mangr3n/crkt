/**
 * Functional programming utilities
 */

export const isNil = (x: any): boolean => x === null || x === undefined;

export const isEmpty = (x: any): boolean => {
  if (isNil(x)) return true;
  if (Array.isArray(x)) return x.length === 0;
  if (typeof x === 'object') return Object.keys(x).length === 0;
  return false;
};

export const map = <T, U>(fn: (x: T) => U, arr: T[]): U[] => arr.map(fn);

export const values = <T>(obj: { [key: string]: T }): T[] => Object.values(obj);

export const keys = <T>(obj: { [key: string]: T }): string[] => Object.keys(obj);

export const uniq = <T>(arr: T[]): T[] => Array.from(new Set(arr));

export const append = <T>(el: T, arr: T[]): T[] => [...arr, el];

export const fromPairs = <T>(pairs: [string, T][]): { [key: string]: T } => 
  Object.fromEntries(pairs);

export const reduce = <T, U>(fn: (acc: U, val: T) => U, initial: U, arr: T[]): U => 
  arr.reduce(fn, initial);

export const concat = <T>(arr1: T[], arr2: T[]): T[] => arr1.concat(arr2);

export const range = (start: number, end: number): number[] => 
  Array.from({ length: end - start }, (_, i) => start + i);

export const is = (type: any, val: any): boolean => {
  if (type === Array) return Array.isArray(val);
  if (type === Object) return val !== null && typeof val === 'object' && !Array.isArray(val);
  return val instanceof type;
};

export const assoc = <T>(key: string, val: any, obj: T): T & { [key: string]: any } => ({
  ...obj,
  [key]: val
});

export const toPairs = <T>(obj: { [key: string]: T }): [string, T][] => 
  Object.entries(obj);
