import { z } from 'zod';
import { router, publicProcedure } from '@/lib/trpc/server';
import { prisma } from '@/lib/prisma';

export const chatLogRouter = router({
  create: publicProcedure
    .input(z.object({
      userId: z.string(),
      message: z.string(),
      response: z.string(),
    }))
    .mutation(async ({ input }) => {
      return prisma.chatLog.create({
        data: input,
      });
    }),
});

