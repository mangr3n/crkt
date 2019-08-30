import {isNil,reduce,dissoc,is,length} from "nanoutils";

import { EVENT } from './interfaces';
import { merge } from './util/funcs';

const fromNoArgs = () => ({
  onNext: (v, next) => next(v),
  debug: false,
  type: EVENT
});

// A String by itself in the arg list is the name of the Component
const fromStringArg = (original, arg) => merge(original, { name: arg });

// A Boolean value by itself in the arg list is the debug arg.
const fromBooleanArg = (original, arg) => merge(original, { debug: arg });
// A Function value by itself in the arg list is the function that takes value and the next function and invokes next with the resulting value.
const fromFunctionArg = (original, arg) => {
  let result = {onNext:arg};
  if (!original.hasOwnProperty('name')) {
    result['name'] = `Function [${arg.name}]`;
  }
  return merge(original, result);
}
// An Array value, 
const fromArrayArg = (original, argArray) => reduce((acc, v) => processArg(acc, v), original, argArray);
// 
const fromObjectArg = (original, argObject) => {
  if (!isNil(argObject.components)) original = dissoc('onNext', original);
  return merge(original, argObject);
};

const processArg = (original, arg) => {
  if (is(Function, arg)) return fromFunctionArg(original, arg);
  if (is(String, arg)) return fromStringArg(original, arg);
  if (is(Boolean, arg)) return fromBooleanArg(original, arg);
  if (is(Array, arg)) return fromArrayArg(original, arg);
  if (is(Object, arg)) return fromObjectArg(original, arg);
  throw new Error(`Component/processOneArg, arg can't be processed: ${arg}`);
};

export const toArgsObject = (args: any[]) => {
  return length(args) === 0 ? fromNoArgs() : fromArrayArg(fromNoArgs(), args);
};
