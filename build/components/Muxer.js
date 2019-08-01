"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
exports.Muxer = function () {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return __1.Chain(__1.Hub.apply(void 0, inputs), __1.Accumulator(), __1.Filter(function (v) { return inputs.every(function (i) { return v[i] !== undefined; }); }));
};
