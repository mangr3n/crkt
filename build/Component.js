"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nanoutils_1 = require("nanoutils");
var args_1 = require("./args");
var FunctionComponent_1 = require("./FunctionComponent");
var GraphComponent_1 = require("./GraphComponent");
/**
 * Args can be:
 * String : name,
 * Func: onNext (v,next) => void
 * Boolean: debug,
 * Array : [name: string,onNext: func, boolean, otherArgs: obj],  in any order
 * Object: args
 * {
 *  name: string,
 *  debug: boolean,
 *
 *  ONE OF:
 *    (
 *     onNext: (v,next) => void, default (v,next) => next(v),
 *     and
 *     type: string 'signal' | 'event'
 *    )
 *    (
 *      components: { componentName: component } : {string:Component},
 *      connections: [
 *        [ 'componentInName(.port?)', 'componentOutName(.port?)' ] |
 *      ]
 *    )
 * }
 */
// 
exports.Component = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var argsObj = args_1.toArgsObject(args);
    if (!nanoutils_1.isNil(argsObj.onNext))
        return FunctionComponent_1.FunctionComponent(argsObj);
    else
        return GraphComponent_1.GraphComponent(argsObj);
};
