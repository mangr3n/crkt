declare var require;

const setAsap = require('setasap');

export const asyncInvoker = (v, handler) => {
  setAsap(() => handler(v));
};
export const syncInvoker = (v, handler) => handler(v);
