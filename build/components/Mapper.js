"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("../Component");
exports.Mapper = function (fn) { return Component_1.Component(function (v, next) { return next(fn(v)); }, { name: "Mapper(" + fn.name + ")" }); };
