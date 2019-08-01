"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _functionTypes = ['[object Function]', '[object AsyncFunction]', '[object GeneratorFunction]', '[object AsyncGeneratorFunction]'];
var _toString = function (x) { return Object.prototype.toString.call(x); };
exports.isNil = function (x) { return x === null || x === undefined; };
exports.contains = function (v, arr) { return exports.indexOf(v, arr) !== -1; };
exports.empty = function (x) { return exports.isArray(x) ? [] : exports.isString(x) ? '' : exports.isObject(x) ? ({}) : void 0; };
exports.eq = function (x, y) { return x === y; };
exports.indexOf = function (x, arr) { return arr.indexOf(x); };
exports.isArray = function (val) { return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]'; };
exports.isFunction = function (x) { return exports.contains(_toString(x), _functionTypes); };
exports.isInteger = function (x) { return _toString(x) === '[]'; };
exports.isNumber = function (x) { return _toString(x) === '[object Number]'; };
exports.isObject = function (x) { return _toString(x) === '[object Object]'; };
exports.isRegExp = function (x) { return _toString(x) === '[object Regexp]'; };
exports.isString = function (x) { return exports.type(x) == '[object String]'; };
exports.merge = function (oldObject, newObject) { return (__assign({}, oldObject, newObject)); };
exports.type = function (x) { return x === null ? 'Null' : x === undefined ? 'Undefined' : _toString(x).slice(8, -1); };
