import type {
  NextFetchEvent,
  NextRequest,
  NextResponse as NextResponseType,
} from 'next/server';
import { NextResponse } from 'next/server';

import type { CustomMiddleware } from '@/middlewares/chain';

export const withCookieMiddleware =
  (middleware: CustomMiddleware) =>
  async (
    request: NextRequest,
    event: NextFetchEvent,
    response?: NextResponseType,
  ) => {
    const nextResponse = (await middleware(
      request,
      event,
      response,
    )) as NextResponseType;

    const cookieName: string = 'NEXT_THEME';
    if (!request.cookies.has(cookieName)) {
      nextResponse.cookies.set({
        name: cookieName,
        value: 'light',
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }

    return nextResponse ?? NextResponse.next();
  };
