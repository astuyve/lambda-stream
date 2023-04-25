import Duplex from 'stream'

export class ResponseStream extends Duplex {
  response: any[] 
  _contentType?: string

  constructor() {
    super()
    this.response = []
  }

  // @param chunk Chunk of data to unshift onto the read queue. For streams not operating in object mode, `chunk` must be a string, `Buffer`, `Uint8Array` or `null`. For object mode
  // streams, `chunk` may be any JavaScript value.
  write(chunk: Uint8Array | string | Buffer | null) {
    this.response.unshift(chunk)
  }

  end() {
  }

  _read(): Uint8Array[] {
    return this.response
  }

  setContentType(contentType: string) {
    this._contentType = contentType
  }
}
