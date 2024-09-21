# Lambda-Stream

This library adds types and local support for AWS Lambda Response Streaming. Locally, it'll buffer and return the entire response.

In AWS Lambda, it'll simply use the global `awslambda.streamifyResponse`.

This library exposes a `ResponseStream` class, the `streamifyResponse` method, and `isInAWS` method. Types are also included.

## Why?

AWS added Lambda Response Streaming directly into the NodeJS runtime as a global method, instead of providing it with the AWS-SDK.

This makes functions leveraging Lambda Response Streaming difficult to test, run locally, or even write Lambda functions using a typical editor. Magic, runtime-only methods are a drag on developer experience!

So I wrote this library to fill that gap

## End of Life

This library shouldn't exist.

If or when AWS decides to release and support a library which makes AWS Lambda Streaming Responses usable and testable locally, I'll happily archive this project.

## Examples

Works like this:

```typescript
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { streamifyResponse, ResponseStream } from 'lambda-stream'

export const handler = streamifyResponse(myHandler)

async function myHandler(
  event: APIGatewayProxyEventV2,
  responseStream: ResponseStream
): Promise<void> {
  console.log('Handler got event:', event)
  return new Promise((resolve, reject) => {
    responseStream.setContentType('text/plain')
    responseStream.write('Hello')
    setTimeout(() => {
        responseStream.write('World')
        responseStream.end()
        resolve()
    }, 1000)
  })
}
```

Or in commonjs:

```javascript
'use strict'
const { streamifyResponse } = require('lambda-stream')

module.exports.hello = streamifyResponse(
  async (event, responseStream, context) => {
    responseStream.setContentType('text/plain')
    responseStream.write('Hello, world!')
    responseStream.end()
  }
)
```

Pipelining is also supported:

```javascript
const pipeline = require('util').promisify(require('stream').pipeline)
const { Readable } = require('stream')
const { streamifyResponse } = require('lambda-stream')

const handler = async (event, responseStream, _context) => {
  // As an example, convert event to a readable stream.
  requestStream = Readable.from(Buffer.from(JSON.stringify({ hello: 'world' })))

  await pipeline(requestStream, zlib.createGzip(), responseStream)
}

module.exports.gzip = streamifyResponse(handler)
```

## Headers, Status Code
AWS provides a helper function which allows you to specify additional headers, as well as craft the status code.

```javascript
const { streamifyResponse } = require('lambda-stream')
const stream = require('stream')
module.exports.hello = streamifyResponse(
  async (event, responseStream, context) => {
    const metadata = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "CustomHeader": "outerspace"
      }
    };
    
    // Use global helper to pass metadata and status code
    responseStream = awslambda.HttpResponseStream.from(responseStream, metadata);

    responseStream.write("Streaming with Helper \n");
    await new Promise(r => setTimeout(r, 1000));
    responseStream.write("Hello 0 \n");
    await new Promise(r => setTimeout(r, 1000));
    responseStream.write("Hello 1 \n");
    await new Promise(r => setTimeout(r, 1000));
    responseStream.write("Hello 3 \n");
    responseStream.end();
    // Suggested in Documentation: https://docs.aws.amazon.com/lambda/latest/dg/response-streaming-tutorial.html
    // But NOT defined in node 16 or node 18
    // Only defined in node 14
    await responseStream.finished();
  }
);
```

We are considering shimming our own helper to support types as well.

## Contributors
[AJ Stuyvenberg](https://github.com/astuyve)

[Luka Matic](https://github.com/maticluka999)

[Paulo Ricardo Xavier Giusti](https://github.com/prxg22)
