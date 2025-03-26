import { APIGatewayProxyEventV2, Callback, Context, LambdaFunctionURLEvent, LambdaFunctionURLResult } from 'aws-lambda';
import { ResponseStream } from './ResponseStream';
export declare function isInAWS(): boolean;
export type StreamingHandler<TEvent = LambdaFunctionURLEvent, TResult = LambdaFunctionURLResult> = (ev: TEvent, streamResponse: ResponseStream, ctx?: Context, callback?: Callback<TResult>) => TResult | Promise<TResult>;
export type RequestHandler<TResult = any> = StreamingHandler<APIGatewayProxyEventV2, TResult>;
export declare function streamifyResponse<TEvent = any, TResult = void>(handler: StreamingHandler<TEvent, TResult>): StreamingHandler<TEvent, TResult>;
export { ResponseStream } from './ResponseStream';
//# sourceMappingURL=index.d.ts.map