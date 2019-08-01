"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
exports.Memorizer = function (initialMemory) {
    if (initialMemory === void 0) { initialMemory = null; }
    var memory = initialMemory;
    return __1.Component({
        inputs: ['memory', 'value'],
        components: {
            memory: __1.Component(function (v) { memory = v; }),
            mapper: __1.Mapper(function (value) { return ({ value: value, memory: memory }); }),
            demuxer: __1.Demuxer('memory', 'value')
        },
        connections: [
            ['in.memory', 'memory'],
            ['in.value', 'mapper'],
            ['mapper', 'out'],
            ['in', 'demuxer'],
            ['demuxer.memory', 'memory'],
            ['demuxer.value', 'mapper']
        ],
    });
};
