import type { NextMiddlewareResult } from 'next/dist/server/web/types';
import type {
  NextFetchEvent,
  NextRequest,
  NextResponse as NextResponseType,
} from 'next/server';
import { NextResponse } from 'next/server';

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response?: NextResponseType,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;

export const chain = (
  functions: MiddlewareFactory[],
  index = 0,
): CustomMiddleware => {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return (
    _request: NextRequest,
    _event: NextFetchEvent,
    response?: NextResponseType,
  ) => {
    return response ?? NextResponse.next();
  };
};
