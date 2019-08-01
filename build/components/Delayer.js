"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
exports.Delayer = function (ms) { return __1.Component(function (v, next) {
    setTimeout(function () { return next(v); }, ms);
}); };
