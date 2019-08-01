"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("../Component");
exports.Repeater = function (times) { return Component_1.Component(function (v, next) {
    for (var i = 0; i <= times; i++)
        next(v);
}); };
