"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var nanoutils_1 = require("nanoutils");
exports.Accumulator = function (initial, name) {
    if (initial === void 0) { initial = {}; }
    if (name === void 0) { name = ''; }
    var obj = initial;
    return __1.Component(function (v, next) {
        if (!nanoutils_1.is(Object, v))
            return;
        nanoutils_1.map(function (_a) {
            var key = _a[0], value = _a[1];
            obj = nanoutils_1.assoc(key, value, obj);
        }, nanoutils_1.toPairs(v));
        next(obj);
    }, { name: "Accumulator(" + name + ")" });
};
