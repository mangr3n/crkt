"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Serializer_1 = require("./Serializer");
var Mapper_1 = require("./Mapper");
var Chain_1 = require("./Chain");
var toArray = function (v) { return [].concat(v); };
exports.ArraySerializer = function () { return Chain_1.Chain(Mapper_1.Mapper(toArray), Serializer_1.Serializer()); };
