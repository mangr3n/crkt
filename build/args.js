"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nanoutils_1 = require("nanoutils");
var interfaces_1 = require("./interfaces");
var funcs_1 = require("./util/funcs");
var fromNoArgs = function () { return ({
    name: 'Identity',
    onNext: function (v, next) { return next(v); },
    debug: false,
    type: interfaces_1.EVENT
}); };
// A String by itself in the arg list is the name of the Component
var fromStringArg = function (original, arg) { return funcs_1.merge(original, { name: arg }); };
// A Boolean value by itself in the arg list is the debug arg.
var fromBooleanArg = function (original, arg) { return funcs_1.merge(original, { debug: arg }); };
// A Function value by itself in the arg list is the function that takes value and the next function and invokes next with the resulting value.
var fromFunctionArg = function (original, arg) { return funcs_1.merge(original, { name: "Function{" + arg.name + "}", onNext: arg }); };
// An Array value, 
var fromArrayArg = function (original, argArray) { return nanoutils_1.reduce(function (acc, v) { return processArg(acc, v); }, original, argArray); };
// 
var fromObjectArg = function (original, argObject) {
    if (!nanoutils_1.isNil(argObject.components))
        original = nanoutils_1.dissoc('onNext', original);
    return funcs_1.merge(original, argObject);
};
var processArg = function (original, arg) {
    if (nanoutils_1.is(String, arg))
        return fromStringArg(original, arg);
    else if (nanoutils_1.is(Boolean, arg))
        return fromBooleanArg(original, arg);
    else if (nanoutils_1.is(Function, arg))
        return fromFunctionArg(original, arg);
    else if (nanoutils_1.is(Array, arg))
        return fromArrayArg(original, arg);
    else if (nanoutils_1.is(Object, arg))
        return fromObjectArg(original, arg);
    else
        throw new Error("Component/processOneArg, arg can't be processed: " + arg);
};
exports.toArgsObject = function (args) { return nanoutils_1.length(args) === 0 ? fromNoArgs() : fromArrayArg(fromNoArgs(), args); };
