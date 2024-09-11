'use client';

import { useLocale } from 'next-intl';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter } from '@/libs/i18nNavigation';
import { AppConfig } from '@/utils/AppConfig';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleChange = (value: string) => {
    router.push(pathname, { locale: value });
    router.refresh();
  };

  return (
    <Select defaultValue={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[80px] border-gray-800 bg-gray-800 text-gray-300 hover:border-gray-900 hover:bg-gray-900">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="border-gray-800 bg-gray-800">
        {AppConfig.locales.map((loc) => (
          <SelectItem
            key={loc}
            value={loc}
            className="text-gray-300 hover:bg-gray-700"
          >
            {loc.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
