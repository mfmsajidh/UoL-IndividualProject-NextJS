'use client';

import { Layout, Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import LocaleSwitcher from '@/components/LocaleSwitcher';
import logo from '@/public/assets/images/cv_mate_logo.svg';

const { Header } = Layout;

const AppHeader = () => {
  const t = useTranslations('RootLayout');

  return (
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
  );
};

export default AppHeader;
