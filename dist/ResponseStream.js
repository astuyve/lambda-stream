"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStream = void 0;
const stream_1 = require("stream");
class ResponseStream extends stream_1.Stream.Writable {
    constructor() {
        super();
        this.response = [];
    }
    // @param chunk Chunk of data to unshift onto the read queue. For streams not operating in object mode, `chunk` must be a string, `Buffer`, `Uint8Array` or `null`. For object mode
    // streams, `chunk` may be any JavaScript value.
    _write(chunk, encoding, callback) {
        this.response.push(Buffer.from(chunk, encoding));
        callback();
    }
    getBufferedData() {
        return Buffer.concat(this.response);
    }
    setContentType(contentType) {
        this._contentType = contentType;
    }
    setIsBase64Encoded(isBase64Encoded) {
        this._isBase64Encoded = isBase64Encoded;
    }
}
exports.ResponseStream = ResponseStream;
//# sourceMappingURL=ResponseStream.js.map