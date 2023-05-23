import { APIGatewayProxyEvent } from 'aws-lambda'
import { ResponseStream, streamifyResponse } from 'lambda-stream'
import { Readable } from 'stream'
import { pipeline } from 'stream/promises'

export const binaryBase64Handler = streamifyResponse(myHandler)

async function myHandler(
  event: APIGatewayProxyEvent,
  responseStream: ResponseStream
): Promise<void> {
  const source = Readable.from(Buffer.from('hello world'))
  responseStream.setContentType('binary/octet-stream')
  responseStream.setIsBase64Encoded(true)
  await pipeline(source, responseStream)
}
