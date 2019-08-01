"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("../Component");
exports.Filter = function (cond) { return Component_1.Component(function (v, next) { if (cond(v))
    next(v); }); };
