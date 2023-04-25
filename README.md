# Lambda-Stream

This library adds types and local support for AWS Lambda Response Streaming. Locally, it'll buffer and return the entire response.

Works like this:

```javascript
import { APIGatewayProxyEvent } from "aws-lambda";
import { streamifyResponse, ResponseStream } from 'lambda-stream'

export const handler = streamifyResponse(myHandler)

async function myHandler (event: APIGatewayProxyEvent, responseStream: ResponseStream): Promise<void> {
        console.log('Handler got event:', event)
        responseStream.setContentType("text/plain");
        responseStream.write("Hello, world!");
        responseStream.end();
}
```
