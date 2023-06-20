'use strict'

import { ResponseStream } from './ResponseStream'

export function isInAWS(): boolean {
  // @ts-ignore
  return globalThis.awslambda !== undefined && awslambda.streamifyResponse !== undefined
}

export function streamifyResponse(handler: Function): Function {
  // Check for global awslambda
  if (isInAWS()) {
    // @ts-ignore
    return awslambda.streamifyResponse(handler)
  } else {
    return new Proxy(handler, {
      apply: async function (target, _, argList) {
        const responseStream: ResponseStream = patchArgs(argList)
        await target(...argList)
        return {
          statusCode: 200,
          headers: {
            'content-type': responseStream._contentType || 'application/json',
          },
          ...(responseStream._isBase64Encoded
            ? { isBase64Encoded: responseStream._isBase64Encoded }
            : {}),
          body: responseStream._isBase64Encoded
            ? responseStream.getBufferedData().toString('base64')
            : responseStream.getBufferedData().toString(),
        }
      },
    })
  }
}

function patchArgs(argList: any[]): ResponseStream {
  if (!(argList[1] instanceof ResponseStream)) {
    const responseStream = new ResponseStream()
    argList.splice(1, 0, responseStream)
  }
  return argList[1]
}

export { ResponseStream } from './ResponseStream'
