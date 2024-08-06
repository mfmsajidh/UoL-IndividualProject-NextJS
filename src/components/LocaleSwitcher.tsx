'use client';

import { Select } from 'antd';
import { useLocale } from 'next-intl';

import { usePathname, useRouter } from '@/libs/i18nNavigation';
import { AppConfig } from '@/utils/AppConfig';

const selectOptions = AppConfig.locales.map((elt) => ({
  value: elt,
  label: elt.toUpperCase(),
}));

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (value: string) => {
    router.push(pathname, { locale: value });
    router.refresh();
  };

  return (
    <Select
      defaultValue={locale}
      onChange={handleChange}
      options={selectOptions}
    />
  );
}
