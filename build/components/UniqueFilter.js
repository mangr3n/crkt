"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
exports.UniqueFilter = function (initialValue) {
    var lastValue = initialValue;
    return __1.Component(function (v, next) {
        if (v !== lastValue) {
            lastValue = v;
            next(v);
        }
    });
};
