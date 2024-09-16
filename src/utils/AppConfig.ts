import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/routing/types';

const localePrefix: LocalePrefix = 'as-needed';

export const AppConfig = {
  name: 'CV Mate',
  locales: [
    'ar',
    'cs',
    'da',
    'de',
    'el',
    'en',
    'es',
    'fi',
    'fr',
    'it',
    'ja',
    'nl',
    'no',
    'pl',
    'pt',
    'ro',
    'ru',
    'sv',
    'uk',
    'zh',
  ],
  defaultLocale: 'en',
  localePrefix,
};
