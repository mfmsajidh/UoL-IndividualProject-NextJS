import { chain } from '@/middlewares/chain';
import { withCookieMiddleware } from '@/middlewares/withCookieMiddleware';
import { withI18nAuthMiddleware } from '@/middlewares/withI18nAuthMiddleware';

const middleware = chain([withCookieMiddleware, withI18nAuthMiddleware]);

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|monitoring).*)', '/', '/(api|trpc)(.*)'], // Also exclude tunnelRoute used in Sentry from the matcher
};

export default middleware;
