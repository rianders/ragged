import { z } from 'zod';
import { router, publicProcedure } from '@/lib/trpc/server';
import { prisma } from '@/lib/prisma';

export const ragConfigRouter = router({
  create: publicProcedure
    .input(z.object({
      llmProvider: z.string(),
      embeddingModel: z.string(),
      websiteUrl: z.string().url(),
    }))
    .mutation(async ({ input }) => {
      return prisma.ragConfig.create({
        data: input,
      });
    }),
});

