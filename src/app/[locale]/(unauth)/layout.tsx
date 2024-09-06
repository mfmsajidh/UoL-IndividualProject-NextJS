import { Layout as AppLayout } from 'antd';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { AppFooter } from '@/app/[locale]/(unauth)/_components/AppFooter';
import { AppHeader } from '@/app/[locale]/(unauth)/_components/AppHeader';

export default function Layout(props: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('RootLayout');

  return (
    <AppLayout>
      <AppHeader />
      {props.children}
      <AppFooter stringTranslation={t('made_with')} />
    </AppLayout>
  );
}
