import { StackContext, Api, StaticSite, RDS } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  const rds = new RDS(stack, "db", {
    engine: "postgresql11.13",
    defaultDatabaseName: "main",
    migrations: "services/migrations",
    types: "services/core/sql.generated.ts",
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [rds],
      },
    },
    routes: {
      "ANY /trpc/{proxy+}": "functions/lambda.handler",
    },
  });

  const site = new StaticSite(stack, "react", {
    path: "site",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      // Pass in the API endpoint to our app
      VITE_API_URL: api.url + "/trpc",
    }, 
  });

  stack.addOutputs({
    webUrl: site.url,
    apiUrl: api.url
  })
}
