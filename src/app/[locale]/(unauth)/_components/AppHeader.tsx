import { Button, Flex, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { MobileAppHeader } from '@/app/[locale]/(unauth)/_components/MobileAppHeader';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import logo from '@/public/assets/images/cv_mate_logo.svg';

interface NavigationProps {
  signInTranslation: string;
  signUpTranslation: string;
}

const DesktopNavigation: FC<NavigationProps> = ({
  signInTranslation,
  signUpTranslation,
}) => {
  return (
    <>
      <Menu
        mode="horizontal"
        disabledOverflow
        items={[
          {
            key: 'logo',
            disabled: true,
            label: (
              <Link href="/">
                <Image src={logo} alt="Logo of CV Mate" className="w-28" />
              </Link>
            ),
          },
          {
            key: 'features',
            label: 'Features',
          },
          {
            key: 'testimonials',
            label: 'Testimonials',
          },
          {
            key: 'highlights',
            label: 'Highlights',
          },
          {
            key: 'pricing',
            label: 'Pricing',
          },
          {
            key: 'faq',
            label: 'FAQ',
          },
        ]}
        className="flex flex-wrap items-center !border-b-0 !bg-transparent max-lg:hidden "
      />
      <Menu
        mode="horizontal"
        disabledOverflow
        items={[
          {
            disabled: true,
            key: 'sign-in',
            label: (
              <Link href="/sign-in/">
                <Button type="primary">{signInTranslation}</Button>
              </Link>
            ),
          },
          {
            disabled: true,
            key: 'sign-up',
            label: (
              <Link href="/sign-up/">
                <Button type="primary">{signUpTranslation}</Button>
              </Link>
            ),
          },
          {
            disabled: true,
            key: 'language-switcher',
            label: <LocaleSwitcher />,
          },
        ]}
        className="flex flex-wrap items-center !border-b-0 !bg-transparent max-lg:hidden"
      />
    </>
  );
};

const AppHeader = () => {
  const t = useTranslations('RootLayout');

  return (
    <Flex justify="center">
      <Header
        className="fixed z-10 m-5 !bg-white/[.4] max-lg:w-[80vw] lg:w-[95vw]"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          borderRadius: '999px',
          backdropFilter: 'blur(24px)',
          maxHeight: 40,
          borderColor: 'divider',
          boxShadow:
            '0 0 1rem rgba(85, 166, 246, 0.1), 1rem 1.5rem 2rem -1rem rgba(85, 166, 246, 0.15), 4rem 4rem 12rem -2.5rem rgba(85, 166, 246, 0.15)',
          padding: '2rem',
        }}
      >
        <DesktopNavigation
          signInTranslation={t('sign_in_link')}
          signUpTranslation={t('sign_up_link')}
        />
        <MobileAppHeader
          signInTranslation={t('sign_in_link')}
          signUpTranslation={t('sign_up_link')}
        />
      </Header>
    </Flex>
  );
};

export { AppHeader };
export type { NavigationProps };
