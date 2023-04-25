"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStream = void 0;
var stream_1 = __importDefault(require("stream"));
var ResponseStream = /** @class */ (function (_super) {
    __extends(ResponseStream, _super);
    function ResponseStream() {
        var _this = _super.call(this) || this;
        _this.response = [];
        return _this;
    }
    // @param chunk Chunk of data to unshift onto the read queue. For streams not operating in object mode, `chunk` must be a string, `Buffer`, `Uint8Array` or `null`. For object mode
    // streams, `chunk` may be any JavaScript value.
    ResponseStream.prototype.write = function (chunk) {
        this.response.unshift(chunk);
    };
    ResponseStream.prototype.end = function () {
    };
    ResponseStream.prototype._read = function () {
        return this.response;
    };
    ResponseStream.prototype.setContentType = function (contentType) {
        this._contentType = contentType;
    };
    return ResponseStream;
}(stream_1.default));
exports.ResponseStream = ResponseStream;
//# sourceMappingURL=ResponseStream.js.map