import { APIGatewayProxyEvent } from 'aws-lambda'
import { streamifyResponse, ResponseStream } from 'lambda-stream'

export const handler = streamifyResponse(myHandler)

async function myHandler(
  event: APIGatewayProxyEvent,
  responseStream: ResponseStream
): Promise<void> {
  responseStream.setContentType('text/plain')
  responseStream.write('Hello, world!')
  responseStream.end()
}
