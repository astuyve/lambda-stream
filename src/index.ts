'use strict'

import { APIGatewayProxyEventV2, Callback, Context } from 'aws-lambda'
import { ResponseStream } from './ResponseStream'

export function isInAWS(): boolean {
  return (
    // @ts-ignore
    globalThis.awslambda !== undefined &&
    // @ts-ignore
    awslambda.streamifyResponse !== undefined
  )
}

export type StreamingHandler<
  TEvent = APIGatewayProxyEventV2,
  TResult = void
> = (
  ev: TEvent,
  streamResponse: ResponseStream,
  ctx?: Context,
  callback?: Callback<TResult>
) => TResult | Promise<TResult>

// Provided for backwards compatibility
export type RequestHandler<TResult = any> = StreamingHandler<APIGatewayProxyEventV2, TResult>;

export function streamifyResponse<TEvent = any, TResult = void>(
  handler: StreamingHandler<TEvent, TResult>
): StreamingHandler<TEvent, TResult> {
  // Check for global awslambda
  if (isInAWS()) {
    // @ts-ignore
    return awslambda.streamifyResponse(handler)
  } else {
    return new Proxy(handler, {
      apply: async function (
        target,
        _,
        argList: Parameters<StreamingHandler<TEvent, TResult>>
      ) {
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
