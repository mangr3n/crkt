"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
exports.Iterator = function (iterable, _a) {
    var _b = (_a === void 0 ? {} : _a).cyclic, cyclic = _b === void 0 ? false : _b;
    var iterator = iterable[Symbol.iterator]();
    return __1.Component(function (v, next) {
        var _a;
        var _b = iterator.next(), value = _b.value, done = _b.done;
        if (done && cyclic) {
            iterator = iterable[Symbol.iterator]();
            (_a = iterator.next(), value = _a.value, done = _a.done);
        }
        if (!done)
            next(value);
    });
};
