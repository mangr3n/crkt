"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nanoutils_1 = require("nanoutils");
var ID_1 = require("./ID");
var debug_1 = require("./util/debug");
var index_1 = require("./index");
var selectNode = function (name, components, io) {
    if (io === void 0) { io = 'inputs'; }
    var direction = io === 'inputs' ? 'inputs' : 'outputs';
    var _a = name.split('.', 2), componentName = _a[0], _b = _a[1], nodeName = _b === void 0 ? 'default' : _b;
    var component = components[componentName];
    if (nanoutils_1.isNil(component)) {
        throw new Error("Component(" + componentName + ") not found!");
    }
    var nodes = component[direction];
    if (nanoutils_1.isNil(nodes) || nanoutils_1.isNil(nodes[nodeName])) {
        throw new Error("Port(" + name + ") not found!");
    }
    return nodes[nodeName];
};
var _debugLabel = function (name, id) { return "Component(" + name + ":" + id + ")"; };
// Default inputs and outputs, 'in','out'
exports.GraphComponent = function (arg) {
    var components = arg.components, _a = arg.connections, connections = _a === void 0 ? [] : _a, _b = arg.inputs, inputs = _b === void 0 ? [] : _b, _c = arg.outputs, outputs = _c === void 0 ? [] : _c, _d = arg.debug, debug = _d === void 0 ? [] : _d, _e = arg.name, name = _e === void 0 ? 'Anonymous' : _e;
    var _debugMap = {};
    var componentID = ID_1.nextID();
    var DEBUG_LABEL = _debugLabel(name, componentID);
    var _inputNames = nanoutils_1.uniq(nanoutils_1.append('default', inputs));
    var _outputNames = nanoutils_1.uniq(nanoutils_1.append('default', outputs));
    var toNode = function (i) { return [i, index_1.Identity(i)]; };
    var inNodes = nanoutils_1.fromPairs(nanoutils_1.map(toNode, _inputNames));
    var outNodes = nanoutils_1.fromPairs(nanoutils_1.map(toNode, _outputNames));
    components.in = {
        inputs: inNodes,
        outputs: inNodes
    };
    components.out = {
        inputs: outNodes,
        outputs: outNodes
    };
    nanoutils_1.map(function (_a) {
        var from = _a[0], to = _a[1];
        var outNode = selectNode(from, components, 'outputs');
        var inNode = selectNode(to, components, 'inputs');
        outNode.on(function (v) { return inNode.send(v); });
    }, connections);
    nanoutils_1.map(function (debugPort) {
        var debugNode = selectNode(debugPort, components, 'outputs');
        var debugId = debugNode.on(function (v) { return debug_1.debugMessage(DEBUG_LABEL, "." + debugPort + " emit", v); });
        _debugMap[debugNode] = debugId;
    }, debug);
    var on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // console.log('GraphComponent/on', { args });
        var _a = args.splice(0, 2).reverse(), handler = _a[0], _b = _a[1], nodeName = _b === void 0 ? 'default' : _b;
        // console.log('GraphComponent/on', { handler, nodeName });
        if (nanoutils_1.isNil(outNodes[nodeName]))
            throw new Error(DEBUG_LABEL + "/on: outNodes[" + nodeName + "] not found");
        return outNodes[nodeName].on(handler);
    };
    var off = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a = args.splice(0, 2).reverse(), id = _a[0], _b = _a[1], nodeName = _b === void 0 ? 'default' : _b;
        if (nanoutils_1.isNil(outNodes[nodeName]))
            throw new Error(DEBUG_LABEL + "/off: outNodes[" + nodeName + "] not found");
        return outNodes[nodeName].off(id);
    };
    var send = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a = args.splice(0, 2).reverse(), _b = _a[0], value = _b === void 0 ? {} : _b, _c = _a[1], nodeName = _c === void 0 ? 'default' : _c;
        if (nanoutils_1.isNil(inNodes[nodeName]))
            throw new Error(DEBUG_LABEL + "/off: outNodes[" + nodeName + "] not found");
        inNodes[nodeName].send(value);
    };
    var _debug = function (turnOn) {
        if (turnOn) {
            nanoutils_1.map(function (v) { return off(v); }, nanoutils_1.keys(_debugMap));
        }
        else {
            nanoutils_1.map(function (compName) {
                _debugMap[compName] = components[compName].on(function (v) { return debug_1.debugMessage(DEBUG_LABEL, "." + compName + " emit", v); });
            }, nanoutils_1.keys(components));
        }
    };
    var description = function () { return ({
        name: name,
        id: componentID,
        inputs: inputs,
        outputs: outputs,
        connections: connections,
        components: nanoutils_1.map(function (v) { return v.description; }, components)
    }); };
    var result = {
        // This is the Connection API
        send: send,
        on: on,
        off: off,
        inputs: inNodes,
        outputs: outNodes,
        id: componentID,
        name: name,
        description: description,
        debug: _debug
    };
    if (debug) {
        debug_1.debugMessage(DEBUG_LABEL, 'created', result);
    }
    return result;
};
