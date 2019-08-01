"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var nanoutils_1 = require("nanoutils");
var outputReducer = function (acc, output) {
    acc[output] = __1.Component(function (v, next) {
        if (!nanoutils_1.isNil(v[output]))
            next(v[output]);
    });
    return acc;
};
exports.Demuxer = function () {
    var outputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        outputs[_i] = arguments[_i];
    }
    var components = nanoutils_1.reduce(outputReducer, {}, outputs);
    var connections = nanoutils_1.reduce(nanoutils_1.concat, [['in', 'out']], nanoutils_1.map(function (out) { return [['in', out], [out, "out." + out]]; }, outputs));
    // console.log('Demuxer:', { outputs, components, connections });
    return __1.Component({
        components: components,
        outputs: outputs,
        connections: connections,
    });
};
