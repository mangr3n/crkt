"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugMessage = function (label, message, value) {
    var _debugMsg = "DEBUG - " + label + ", " + message;
    console.log(_debugMsg + ":", value);
};
