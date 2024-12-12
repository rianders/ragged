import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  return {
    ...opts,
  };
};

export type TRPCContext = inferAsyncReturnType<typeof createTRPCContext>;

