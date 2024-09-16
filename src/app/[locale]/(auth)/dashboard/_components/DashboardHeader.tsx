import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { LogOutButton } from '@/app/[locale]/_components/LogOutButton';
import { MobileDashboardHeader } from '@/app/[locale]/(auth)/dashboard/_components/MobileDashboardHeader';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Button } from '@/components/ui/button';
import Logo from '@/public/assets/images/cv_mate_logo.svg';

interface DashboardNavigationProps {
  title: string;
  cvGeneratorTranslation: string;
  profileLinkTranslation: string;
  settingsTranslation: string;
}

const DesktopNavigation: FC<DashboardNavigationProps> = ({
  title,
  cvGeneratorTranslation,
  profileLinkTranslation,
  settingsTranslation,
}) => {
  return (
    <>
      <div className="mr-4 hidden md:flex">
        <Link
          className="mr-6 flex items-center hover:opacity-75 "
          href="/dashboard/cv-generator"
        >
          <Image src={Logo} alt="Logo of CV Mate" className="w-28" />
          <span className="text-xl font-bold text-[#FFA857]">{title}</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/dashboard/cv-generator"
            className="text-gray-300 hover:text-white"
          >
            {cvGeneratorTranslation}
          </Link>
          <Link
            href="/dashboard/profile"
            className="text-gray-300 hover:text-white"
          >
            {profileLinkTranslation}
          </Link>
        </nav>
      </div>
      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <div className="w-full flex-1 space-x-2 md:w-auto md:flex-none">
          <div className="hidden md:inline-flex">
            <LocaleSwitcher />
          </div>
          <Link href="/dashboard/settings">
            <Button className="hidden bg-gray-800 hover:bg-gray-900 md:inline-flex">
              {settingsTranslation}
            </Button>
          </Link>
          <LogOutButton />
        </div>
      </div>
    </>
  );
};

const DashboardHeader = () => {
  const t = useTranslations('DashboardHeader');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container mx-auto flex h-14 items-center">
        <DesktopNavigation
          title={t('title')}
          cvGeneratorTranslation={t('cv_generator_link')}
          profileLinkTranslation={t('profile_link')}
          settingsTranslation={t('settings_link')}
        />

        <MobileDashboardHeader
          title={t('title')}
          cvGeneratorTranslation={t('cv_generator_link')}
          profileLinkTranslation={t('profile_link')}
          settingsTranslation={t('settings_link')}
        />
      </div>
    </header>
  );
};

export { DashboardHeader };
export type { DashboardNavigationProps };
