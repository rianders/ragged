import { router } from '@/lib/trpc/server';
import { ragConfigRouter } from './routers/ragConfig';
import { chatLogRouter } from './routers/chatLog';

export const appRouter = router({
  ragConfig: ragConfigRouter,
  chatLog: chatLogRouter,
});

export type AppRouter = typeof appRouter;

