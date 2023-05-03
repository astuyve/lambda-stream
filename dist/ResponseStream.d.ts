/// <reference types="node" />
import { Stream } from 'stream'
export declare class ResponseStream extends Stream.Writable {
  private response
  _contentType?: string
  constructor()
  _write(
    chunk: any,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void
  getBufferedData(): Buffer
  setContentType(contentType: string): void
}
//# sourceMappingURL=ResponseStream.d.ts.map
