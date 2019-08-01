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
var __1 = require("..");
var nanoutils_1 = require("nanoutils");
exports.Chain = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var lastIndex = args.length - 1;
    var _a = [args[0], args[lastIndex]], first = _a[0], last = _a[1];
    var index = 0;
    var components = nanoutils_1.reduce(function (acc, value) {
        var _a;
        return (__assign({}, acc, (_a = {}, _a["c" + index++] = value, _a)));
    }, {}, args);
    var inputs = nanoutils_1.keys(first.inputs);
    var outputs = nanoutils_1.keys(last.outputs);
    var componentKeys = nanoutils_1.range(0, lastIndex);
    var internalConnections = nanoutils_1.map(function (i) { return (["c" + i, "c" + (i + 1)]); }, componentKeys);
    // console.log('component/Chain ', { internalConnections, componentKeys });
    var inputConnections = nanoutils_1.map(function (input) { return (["in." + input, "c0." + input]); }, inputs);
    var outputConnections = nanoutils_1.map(function (output) { return (["c" + lastIndex + "." + output, "out." + output]); }, outputs);
    var connections = nanoutils_1.concat(internalConnections, nanoutils_1.concat(inputConnections, outputConnections));
    var result = {
        components: components,
        connections: connections,
        inputs: inputs,
        outputs: outputs,
        name: 'Chain'
    };
    // console.log('flow/component/Chain', result);
    return __1.Component(result);
};
