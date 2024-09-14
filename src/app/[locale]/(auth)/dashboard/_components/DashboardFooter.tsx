import { useTranslations } from 'next-intl';

import { AppConfig } from '@/utils/AppConfig';

export const DashboardFooter = () => {
  const t = useTranslations('AppFooter');

  return (
    <footer className="w-full bg-gray-900 py-6 text-gray-300">
      <div className="container mx-auto text-center text-sm">
        {`© ${new Date().getFullYear()} ${AppConfig.name}. ${t('all_rights_reserved')}`}
      </div>
    </footer>
  );
};
