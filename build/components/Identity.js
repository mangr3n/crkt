"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("../Component");
exports.Identity = function (name, debug) {
    if (name === void 0) { name = "Identity"; }
    if (debug === void 0) { debug = false; }
    return Component_1.Component(name, function (v, next) { return next(v); }, debug);
};
