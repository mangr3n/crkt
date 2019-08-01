"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var nanoutils_1 = require("nanoutils");
exports.Hub = function () {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    var components = {};
    var connections = [['in', 'out']];
    nanoutils_1.map(function (i) {
        components[i] = __1.Mapper(function (v) {
            var _a;
            return (_a = {}, _a[i] = v, _a);
        });
        connections.push(["in." + i, i], [i, 'out']);
    }, inputs);
    return __1.Component({ components: components, connections: connections, inputs: inputs });
};
