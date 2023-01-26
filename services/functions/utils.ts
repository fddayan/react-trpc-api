import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2,  Context as APIGWContext  } from "aws-lambda";

export type ApiGatewayHandler = (event: APIGatewayProxyEventV2, context: APIGWContext) => Promise<APIGatewayProxyStructuredResultV2>

export const withCors = (apiGatewayHandler: ApiGatewayHandler) => {
  return (event: APIGatewayProxyEventV2, context: APIGWContext) => {
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
}