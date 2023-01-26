import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { CreateAWSLambdaContextOptions, awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { withCors } from './utils';
import { appRouter } from './router';

export const t = initTRPC.create();

export const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}) // no context

export type Context = inferAsyncReturnType<typeof createContext>;

export const handler = withCors(awsLambdaRequestHandler({
  router: appRouter,
  createContext,
}));