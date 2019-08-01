"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var nanoutils_1 = require("nanoutils");
exports.Guard = function (conds) { return __1.Chain(__1.Component(function (v, next) {
    // console.log('flow/component/Guard entered', { v });
    var matches = [];
    var others = [];
    var match = false;
    var processConds = function (_a) {
        var name = _a[0], cond = _a[1];
        // console.log('flow/component/Guard/processConds: ', { name, cond });
        if (cond === 'otherwise') {
            others.push(name);
        }
        else if (nanoutils_1.is(Function, cond) && cond(v)) {
            matches.push(name);
            match = true;
        }
    };
    nanoutils_1.map(processConds, nanoutils_1.toPairs(conds));
    // console.log('flow/component/Guard', { matches, others });
    nanoutils_1.map(function (name) {
        var _a;
        return next((_a = {}, _a[name] = v, _a));
    }, match ? matches : others);
}), __1.Demuxer.apply(void 0, nanoutils_1.keys(conds))); };
