import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { AppConfig } from '@/utils/AppConfig';

const getLocaleName = (localeCode: string): string => {
  try {
    const displayNames = new Intl.DisplayNames([localeCode], {
      type: 'language',
    });
    const name = displayNames.of(localeCode) || localeCode;
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch (error) {
    return localeCode; // fallback to the locale code if there's an error
  }
};

const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
});

export { getLocaleName, usePathname, useRouter };
