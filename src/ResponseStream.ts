import { Stream } from 'stream'

export class ResponseStream extends Stream.Writable {
  private response: Buffer[];
  _contentType?: string

  constructor() {
    super()
    this.response = []
  }
  // @param chunk Chunk of data to unshift onto the read queue. For streams not operating in object mode, `chunk` must be a string, `Buffer`, `Uint8Array` or `null`. For object mode
  // streams, `chunk` may be any JavaScript value.
  _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
    this.response.push(Buffer.from(chunk, encoding));
    callback();
  }

  getBufferedData(): Buffer {
    return Buffer.concat(this.response);
  }

  setContentType(contentType: string) {
    this._contentType = contentType
  }
}
