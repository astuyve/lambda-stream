import { APIGatewayProxyEventV2, Callback, Context } from 'aws-lambda';
import { ResponseStream } from './ResponseStream';
export declare function isInAWS(): boolean;
export type StreamingHandler<TEvent = APIGatewayProxyEventV2, TResult = void> = (ev: TEvent, streamResponse: ResponseStream, ctx?: Context, callback?: Callback<TResult>) => TResult | Promise<TResult>;
export type RequestHandler<TResult = any> = StreamingHandler<APIGatewayProxyEventV2, TResult>;
export declare function streamifyResponse<TEvent = any, TResult = void>(handler: StreamingHandler<TEvent, TResult>): StreamingHandler<TEvent, TResult>;
export { ResponseStream } from './ResponseStream';
//# sourceMappingURL=index.d.ts.map