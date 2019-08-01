"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nanoutils_1 = require("nanoutils");
exports.EVENT = 'event';
exports.SIGNAL = 'signal';
exports.isSignal = nanoutils_1.equals(exports.SIGNAL);
exports.isEvent = nanoutils_1.equals(exports.EVENT);
