import { Layout as AppLayout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { AppFooter } from '@/app/[locale]/(unauth)/_components/AppFooter';
import { AppHeader } from '@/app/[locale]/(unauth)/_components/AppHeader';
import { BaseTemplate } from '@/templates/BaseTemplate';

export default function Layout(props: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('RootLayout');

  return (
    <AppLayout>
      <AppHeader />
      <Content className="p-12">
        <div className="min-h-72 rounded-md bg-white p-6">
          <BaseTemplate
            leftNav={
              <>
                <li>
                  <Link
                    href="/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    {t('home_link')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    {t('about_link')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guestbook/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    {t('guestbook_link')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    {t('portfolio_link')}
                  </Link>
                </li>
              </>
            }
          >
            {props.children}
          </BaseTemplate>
        </div>
      </Content>
      <AppFooter stringTranslation={t('made_with')} />
    </AppLayout>
  );
}
