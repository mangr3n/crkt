"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
exports.Serializer = function () { return __1.Component(function (iterable, next) {
    if (iterable[Symbol.iterator]) {
        for (var _i = 0, iterable_1 = iterable; _i < iterable_1.length; _i++) {
            var i = iterable_1[_i];
            next(i);
        }
    }
}); };
