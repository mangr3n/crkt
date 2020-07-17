import { map, values, isEmpty, isNil } from 'nanoutils';
import { syncInvoker, asyncInvoker } from './util/invoker';
import {isSignal} from "./interfaces";
import {debugMessage} from "./util/debug";
import {nextID} from './ID';

const capitalize = (x: string) => {
  if (x.length === 0) return x;
  if (x.length === 1) return x.toUpperCase();
  return x.substring(0, 1).toUpperCase() + x.substring(1);
}

export const FunctionComponent = (arg) => {
  const { name: portName, onNext, type } = arg;
  let { debug: _debug } = arg;

  let _debugId = null;
  let _handlers = {};
  let _valueQueue = [];
  let _currentValue = null;
  let componentId = nextID();
  const DEBUG_LABEL = `${capitalize(type)}(${portName}:${componentId})`;

  function next (v) {
    const handlers = Object.keys(_handlers).map(key => _handlers[key]);
    for (let handler of handlers) {
      if (isSignal(type)) {
        asyncInvoker(v,handler);
      } else {
        handler(v);
      }
    }
  }

  const send = (v) => {
    if (_debug) debugMessage(DEBUG_LABEL, 'send', v);
    _valueQueue.push(v);
    while(!isEmpty(_valueQueue)) {
      let _currentValue = _valueQueue.shift();
      onNext(_currentValue,next);
    }
  };

  const on = (handler) => {
    if (_debug) debugMessage(DEBUG_LABEL, 'on', { handler });
    const result = nextID();
    _handlers[result] = handler;
    if (isSignal(type)) handler(_currentValue);
    return result;
  };

  const off = (id) => {
    if (!isNil(_handlers[id])) {
      delete _handlers[id];
      return true;
    } else {
      return false;
    }
  };

  const _debugHandler = (v) => {
    debugMessage(DEBUG_LABEL, 'out', v);
  }

  const debug = (turnOn: boolean) => {
    if (turnOn && !isNil(_debugId)) return;
    if (!turnOn && isNil(_debugId)) return;
    if (turnOn) {
      _debugId = on(_debugHandler);
      _debug = true;
    } else {
      off(_debugId);
      _debug = false;
    }
  };

  const description = () => ({
    name: portName,
    id: componentId,
    send,
    on,
    off,
    debug,
    description
  });

  const result = {
    send,
    on,
    off,
    description,
    debug,
    id: componentId,
    name: portName,
    inputs: { default: null },
    outputs: { default: null }
  };

  result.inputs.default = result;
  result.outputs.default = result;

  if (_debug) {
    debugMessage(DEBUG_LABEL, 'created', result);
  }
  return result;
};
