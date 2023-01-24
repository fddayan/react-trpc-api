import { StackContext, Api, StaticSite } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "functions/lambda.handler",
      "ANY /trpc/{proxy+}": "functions/lambda.handler",
    },
  });

  new StaticSite(stack, "react", {
    path: "site",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      // Pass in the API endpoint to our app
      VITE_API_URL: api.url,
    }, 
  });
}
