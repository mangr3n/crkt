"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ID_1 = require("./ID");
var debug_1 = require("./util/debug");
var interfaces_1 = require("./interfaces");
var funcs_1 = require("./util/funcs");
var csp = require('js-csp');
var capitalize = function (x) {
    if (x.length === 0)
        return x;
    if (x.length === 1)
        return x.toUpperCase();
    return x.substring(0, 1).toUpperCase() + x.substring(1);
};
exports.FunctionComponent = function (arg) {
    var portName = arg.name, onNext = arg.onNext, type = arg.type;
    var _debug = arg.debug;
    var _debugId = null;
    var _handlerDisconnectChannels = {};
    var componentId = ID_1.nextID();
    var _inChannel = csp.chan();
    var _outSource = csp.chan();
    var _outMult = csp.operations.mult(_outSource);
    var _currentOutput = null;
    var DEBUG_LABEL = capitalize(type) + "(" + portName + ":" + componentId;
    var _debugHandler = function (v) {
        debug_1.debugMessage(DEBUG_LABEL, 'out', v);
    };
    // Value from the _inChannel
    var next = function (v) {
        _currentOutput = v;
        csp.putAsync(_outSource, v);
    };
    csp.go(function () {
        var inValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!true) return [3 /*break*/, 2];
                    return [4 /*yield*/, csp.take(_inChannel)];
                case 1:
                    inValue = _a.sent();
                    if (_debug) {
                        debug_1.debugMessage(DEBUG_LABEL, 'from _inChannel', inValue);
                    }
                    onNext(inValue, next);
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
    var send = function (v) {
        if (_debug)
            debug_1.debugMessage(DEBUG_LABEL, 'send', v);
        csp.putAsync(_inChannel, v);
    };
    var on = function (handler) {
        if (_debug)
            debug_1.debugMessage(DEBUG_LABEL, 'on', { handler: handler });
        var _id = ID_1.nextID();
        var _onChan = csp.chan();
        var _offChan = csp.chan();
        _handlerDisconnectChannels[_id] = _offChan;
        csp.operations.mult.tap(_outMult, _onChan);
        csp.go(function () {
            var received;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3 /*break*/, 2];
                        return [4 /*yield*/, csp.alts([_onChan, _offChan])];
                    case 1:
                        received = _a.sent();
                        if (received.channel == _offChan) {
                            _offChan.close();
                            delete _handlerDisconnectChannels[_id];
                            csp.operations.mult.untap(_onChan);
                            return [2 /*return*/, null];
                        }
                        else {
                            handler(received.value);
                        }
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        });
        if (interfaces_1.isSignal(type)) {
            handler(_currentOutput);
        }
        return _id;
    };
    var off = function (id) {
        var _offChan = _handlerDisconnectChannels[id];
        if (!funcs_1.isNil(_offChan)) {
            csp.putAsync(_offChan, true);
        }
    };
    var debug = function (turnOn) {
        if (turnOn && !funcs_1.isNil(_debugId))
            return;
        if (!turnOn && funcs_1.isNil(_debugId))
            return;
        if (turnOn) {
            _debugId = on(_debugHandler);
            _debug = true;
        }
        else {
            off(_debugId);
            _debug = false;
        }
    };
    var result = {
        send: send,
        on: on,
        off: off,
        debug: debug,
        id: componentId,
        name: portName,
        inputs: { default: null },
        outputs: { default: null }
    };
    result.inputs.default = result;
    result.outputs.default = result;
    if (_debug) {
        debug_1.debugMessage(DEBUG_LABEL, 'created', result);
    }
    return result;
};
