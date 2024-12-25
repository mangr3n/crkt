/**
 * Functional programming utilities
 */

export const curry = <T extends any[], R>(
  fn: (...args: T) => R
): ((...args: Partial<T>) => any) => {
  return function curried(...args: Partial<T>) {
    if (args.length >= fn.length) {
      return fn(...(args as T));
    }
    return (...args2: Partial<T>) => curried(...args.concat(args2));
  };
};

export const isNil = (x: any): boolean => x === null || x === undefined;

export const isEmpty = (x: any): boolean => {
  if (isNil(x)) return true;
  if (Array.isArray(x)) return x.length === 0;
  if (typeof x === 'object') return Object.keys(x).length === 0;
  return false;
};

export const map = curry(<T, U>(fn: (x: T) => U, arr: T[]): U[] => arr.map(fn));

export const values = <T>(obj: { [key: string]: T }): T[] => Object.values(obj);

export const keys = <T>(obj: { [key: string]: T }): string[] => Object.keys(obj);

export const uniq = <T>(arr: T[]): T[] => Array.from(new Set(arr));

export const append = curry(<T>(el: T, arr: T[]): T[] => [...arr, el]);

export const fromPairs = <T>(pairs: [string, T][]): { [key: string]: T } => 
  Object.fromEntries(pairs);

export const reduce = curry(<T, U>(fn: (acc: U, val: T) => U, initial: U, arr: T[]): U => 
  arr.reduce(fn, initial));

export const concat = curry(<T>(arr1: T[], arr2: T[]): T[] => arr1.concat(arr2));

export const range = curry((start: number, end: number): number[] => 
  Array.from({ length: end - start }, (_, i) => start + i));

export const is = curry((type: any, val: any): boolean => {
  if (val === null || val === undefined) return false;
  if (type === Array) return Array.isArray(val);
  if (type === Object) return typeof val === 'object' && !Array.isArray(val);
  if (type === String || type === 'string') return typeof val === 'string';
  if (type === Number || type === 'number') return typeof val === 'number';
  if (type === Boolean || type === 'boolean') return typeof val === 'boolean';
  if (type === Function || type === 'function') return typeof val === 'function';
  return val instanceof type;
});

export const assoc = curry(<T>(key: string, val: any, obj: T): T & { [key: string]: any } => ({
  ...obj,
  [key]: val
}));

export const toPairs = <T>(obj: { [key: string]: T }): [string, T][] => 
  Object.entries(obj);

export const dissoc = curry(<T extends object>(key: string, obj: T): Omit<T, keyof T & string> => {
  const { [key]: _, ...rest } = obj;
  return rest;
});

export const length = (x: any): number => {
  if (isNil(x)) return 0;
  if (Array.isArray(x)) return x.length;
  if (typeof x === 'object') return Object.keys(x).length;
  if (typeof x === 'string') return x.length;
  return 0;
};

export const equals = curry(<T>(a: T, b: T): boolean => {
  // Handle simple cases
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  
  // Get the type of both values
  const typeA = typeof a;
  const typeB = typeof b;
  
  // If types don't match, values aren't equal
  if (typeA !== typeB) return false;
  
  // Handle arrays
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((val, i) => equals(val)(b[i]));
  }
  
  // Handle objects
  if (typeA === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => 
      Object.prototype.hasOwnProperty.call(b, key) && 
      equals(a[key])(b[key])
    );
  }
  
  // Handle dates
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }
  
  // Handle other cases (numbers, strings, etc.)
  return a === b;
});
