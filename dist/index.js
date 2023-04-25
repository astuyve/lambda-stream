"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStream = exports.streamifyResponse = exports.isInAWS = exports.STREAM_RESPONSE = exports.HANDLER_STREAMING = void 0;
var ResponseStream_1 = require("./ResponseStream");
exports.HANDLER_STREAMING = Symbol.for("aws.lambda.runtime.handler.streaming");
exports.STREAM_RESPONSE = "response";
function isInAWS(handler) {
    return handler[exports.HANDLER_STREAMING] !== undefined && handler[exports.HANDLER_STREAMING] === exports.STREAM_RESPONSE;
}
exports.isInAWS = isInAWS;
function streamifyResponse(handler) {
    var response = '';
    var responseStream;
    // Check for global awslambda
    if (isInAWS(handler)) {
        // @ts-ignore
        return awslambda.streamifyResponse(handler);
    }
    else {
        return new Proxy(handler, {
            apply: function (target, _, argList) {
                responseStream = new ResponseStream_1.ResponseStream();
                argList.splice(1, 0, responseStream);
                target.apply(void 0, __spreadArray([], __read(argList), false));
                response = responseStream._read().toString();
                return response;
            }
        });
    }
}
exports.streamifyResponse = streamifyResponse;
var ResponseStream_2 = require("./ResponseStream");
Object.defineProperty(exports, "ResponseStream", { enumerable: true, get: function () { return ResponseStream_2.ResponseStream; } });
//# sourceMappingURL=index.js.map