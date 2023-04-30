"use strict";

import { ResponseStream } from './ResponseStream'
export const HANDLER_STREAMING = Symbol.for("aws.lambda.runtime.handler.streaming");
export const STREAM_RESPONSE = "response";

export function isInAWS(handler: any): boolean {
    return handler[HANDLER_STREAMING] !== undefined && handler[HANDLER_STREAMING] === STREAM_RESPONSE
}

export function streamifyResponse(handler: Function): Function {
  let responseStream: ResponseStream
  // Check for global awslambda
  if (isInAWS(handler)) {
    // @ts-ignore
    return awslambda.streamifyResponse(handler)
  } else {
    return new Proxy(handler, {
      apply: async function (target, _, argList) {
        responseStream = new ResponseStream()
        argList.splice(1, 0, responseStream)
        await target(...argList)
        // Todo - honor content type
        return responseStream.getBufferedData().toString()
      }
    })
  }
}


export { ResponseStream } from './ResponseStream'

