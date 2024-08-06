import { Layout as AppLayout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import LocaleSwitcher from '@/components/LocaleSwitcher';
import logo from '@/public/assets/images/cv_mate_logo.svg';
import { BaseTemplate } from '@/templates/BaseTemplate';
import { AppConfig } from '@/utils/AppConfig';

export default function Layout(props: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('RootLayout');

  return (
    <AppLayout>
      <Header className="flex items-center">
        <Image src={logo} alt="Logo of CV Mate" className="w-40" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            {
              key: 'sign-in',
              label: <Link href="/sign-in/">{t('sign_in_link')}</Link>,
            },
            {
              key: 'sign-up',
              label: <Link href="/sign-up/">{t('sign_up_link')}</Link>,
            },
          ]}
          className="min-w-0 flex-1 justify-end"
        />
        <LocaleSwitcher />
      </Header>
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
      <Footer className="text-center">
        © Copyright {new Date().getFullYear()} {AppConfig.name}.
        {` ${t('made_with')} 🖤 `}
        <a
          href="https://github.com/mfmsajidh/"
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
        >
          Sajidh Farook
        </a>
        .
      </Footer>
    </AppLayout>
  );
}
