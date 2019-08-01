"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
exports.Counter = function (initial) {
    if (initial === void 0) { initial = 0; }
    var value = initial;
    return __1.Component(function (v, next) {
        value++;
        var result = value;
        next(result);
    });
};
