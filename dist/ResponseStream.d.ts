/// <reference types="node" />
/// <reference types="node" />
import Duplex from 'stream';
export declare class ResponseStream extends Duplex {
    response: any[];
    _contentType?: string;
    constructor();
    write(chunk: Uint8Array | string | Buffer | null): void;
    end(): void;
    _read(): Uint8Array[];
    setContentType(contentType: string): void;
}
//# sourceMappingURL=ResponseStream.d.ts.map