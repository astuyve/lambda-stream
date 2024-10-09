import { APIGatewayProxyEventV2, Callback, Context } from 'aws-lambda';
import { ResponseStream } from './ResponseStream';
export declare function isInAWS(): boolean;
export type RequestHandler<Event extends Record<string, any> = APIGatewayProxyEventV2> = (ev: Event, streamResponse: ResponseStream, ctx?: Context, callback?: Callback) => any | Promise<any>;
export declare function streamifyResponse<Event extends Record<string, any>>(handler: RequestHandler<Event>): RequestHandler<Event>;
export { ResponseStream } from './ResponseStream';
//# sourceMappingURL=index.d.ts.map