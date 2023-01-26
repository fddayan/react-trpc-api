// import { APIGatewayProxyHandlerV2 } from "aws-lambda";

// export const handler: APIGatewayProxyHandlerV2 = async (event) => {
//   return {
//     statusCode: 200,
//     headers: { "Content-Type": "text/plain" },
//     body: `Hello, World! Your request was received at ${event.requestContext.time}.`,
//   };
// };

import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { z } from 'zod';
import { CreateAWSLambdaContextOptions, awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2, Context as APIGWContext } from 'aws-lambda';

export const t = initTRPC.create();

export const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((req) => {
    req.input; // string
    return { id: req.input, name: 'Bilbo' };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}) // no context

export type Context = inferAsyncReturnType<typeof createContext>;

const apiGatewayHandler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
})

export const handler = (event: APIGatewayProxyEventV2, context: APIGWContext) => {
  event.headers['Access-Control-Allow-Origin'] = '*';
  event.headers['Access-Control-Request-Method'] = '*';
  event.headers['Access-Control-Allow-Methods'] = '*';
  event.headers['Access-Control-Allow-Headers'] = '*';

  if (event.requestContext.http.method === 'OPTIONS') {
    const response: APIGatewayProxyStructuredResultV2 = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Method':'*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers':'*',
      }
    }
    
    return response;
  }


  return apiGatewayHandler(event, context);
}