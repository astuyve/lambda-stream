import { APIGatewayProxyEventV2, Callback, Context } from 'aws-lambda';
import { ResponseStream } from './ResponseStream';
export declare function isInAWS(): boolean;
export type RequestHandler = (ev: APIGatewayProxyEventV2, streamResponse: ResponseStream, ctx?: Context, callback?: Callback) => any | Promise<any>;
export declare function streamifyResponse(handler: RequestHandler): RequestHandler;
export { ResponseStream } from './ResponseStream';
//# sourceMappingURL=index.d.ts.map