import { initTRPC } from '@trpc/server';
import { z } from 'zod';

import { Article } from "../core/article";

export const t = initTRPC.create();

const ArticleSchema = z.object({
  title: z.string(),
  url: z.string(),
});

export const appRouter = t.router({
  getUser: t.procedure
    .input(z.string())
    .query((req) => {
      return { id: req.input, name: 'Bilbo' };
    }),

  getArticles: t.procedure
    .query(async (r) => {
      return { articles: await Article.list() }
    }),

  createArticle: t.procedure
    .input(ArticleSchema)
    .mutation(async (r) => {
      return { article: await Article.create(r.input) }
    })
  
});

// export type definition of API
export type AppRouter = typeof appRouter;