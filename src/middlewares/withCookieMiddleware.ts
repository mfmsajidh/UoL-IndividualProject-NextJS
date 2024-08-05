import type {
  NextFetchEvent,
  NextRequest,
  NextResponse as NextResponseType,
} from 'next/server';
import { NextResponse } from 'next/server';

import type { CustomMiddleware } from '@/middlewares/chain';

const themeModeCookie = 'NEXT_THEME';

const themeCookieOptions: object = {
  path: '/',
  maxAge: 60 * 60 * 24 * 365, // 1 year
  sameSite: 'lax',
};

const withCookieMiddleware =
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

    if (!request.cookies.has(themeModeCookie)) {
      nextResponse.cookies.set({
        name: themeModeCookie,
        value: 'light',
        ...themeCookieOptions,
      });
    }

    return nextResponse ?? NextResponse.next();
  };

export { themeCookieOptions, themeModeCookie };

export default withCookieMiddleware;
