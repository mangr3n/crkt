declare var require;

const setAsap = require('setasap');

export const asyncInvoker = (v, handler) => {
  setAsap(function _asyncInvoker() { handler(v); });
};
export const syncInvoker = (v, handler) => handler(v);
