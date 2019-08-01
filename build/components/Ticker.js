"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("../Component");
exports.Ticker = function (ms, _a) {
    var _b = _a === void 0 ? { value: {}, initialDelay: false } : _a, _c = _b.value, value = _c === void 0 ? {} : _c, _d = _b.initialDelay, initialDelay = _d === void 0 ? false : _d;
    return Component_1.Component(function (v, next) {
        if (!initialDelay)
            next(value);
        setInterval(function () { return next(value); }, ms);
    });
};
