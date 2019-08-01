"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
exports.Checker = function (cond) { return __1.Chain(__1.Mapper(function (v) { return cond(v) ? { true: v } : { false: v }; }), __1.Demuxer('true', 'false')); };
