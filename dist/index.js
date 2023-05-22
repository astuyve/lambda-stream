'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStream = exports.streamifyResponse = exports.isInAWS = exports.STREAM_RESPONSE = exports.HANDLER_STREAMING = void 0;
const ResponseStream_1 = require("./ResponseStream");
exports.HANDLER_STREAMING = Symbol.for('aws.lambda.runtime.handler.streaming');
exports.STREAM_RESPONSE = 'response';
function isInAWS(handler) {
    return (handler[exports.HANDLER_STREAMING] !== undefined &&
        handler[exports.HANDLER_STREAMING] === exports.STREAM_RESPONSE);
}
exports.isInAWS = isInAWS;
function streamifyResponse(handler) {
    // Check for global awslambda
    if (isInAWS(handler)) {
        // @ts-ignore
        return awslambda.streamifyResponse(handler);
    }
    else {
        return new Proxy(handler, {
            apply: async function (target, _, argList) {
                const responseStream = patchArgs(argList);
                await target(...argList);
                return {
                    statusCode: 200,
                    headers: {
                        'content-type': responseStream._contentType || 'application/json',
                    },
                    isBase64Encoded: responseStream._isBase64Encoded,
                    body: responseStream._isBase64Encoded
                        ? responseStream.getBufferedData().toString('base64')
                        : responseStream.getBufferedData().toString(),
                };
            },
        });
    }
}
exports.streamifyResponse = streamifyResponse;
function patchArgs(argList) {
    if (!(argList[1] instanceof ResponseStream_1.ResponseStream)) {
        const responseStream = new ResponseStream_1.ResponseStream();
        argList.splice(1, 0, responseStream);
    }
    return argList[1];
}
var ResponseStream_2 = require("./ResponseStream");
Object.defineProperty(exports, "ResponseStream", { enumerable: true, get: function () { return ResponseStream_2.ResponseStream; } });
//# sourceMappingURL=index.js.map