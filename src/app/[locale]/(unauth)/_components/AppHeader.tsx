import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { MobileAppHeader } from '@/app/[locale]/(unauth)/_components/MobileAppHeader';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Button } from '@/components/ui/button';
import Logo from '@/public/assets/images/cv_mate_logo.svg';

interface NavigationProps {
  signInTranslation: string;
  signUpTranslation: string;
  featuresTranslation: string;
  pricingTranslation: string;
  faqTranslation: string;
}

const DesktopNavigation: FC<NavigationProps> = ({
  signInTranslation,
  signUpTranslation,
  featuresTranslation,
  pricingTranslation,
  faqTranslation,
}) => {
  return (
    <>
      <div className="mr-4 hidden md:flex">
        <Link className="mr-6 hover:opacity-75" href="/">
          <Image src={Logo} alt="Logo of CV Mate" className="w-28" />
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="#features" className="text-gray-300 hover:text-white">
            {featuresTranslation}
          </Link>
          <Link href="#pricing" className="text-gray-300 hover:text-white">
            {pricingTranslation}
          </Link>
          <Link href="#faq" className="text-gray-300 hover:text-white">
            {faqTranslation}
          </Link>
        </nav>
      </div>
      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <div className="w-full flex-1 space-x-2 md:w-auto md:flex-none">
          <div className="hidden md:inline-flex">
            <LocaleSwitcher />
          </div>
          <Link href="/sign-in">
            <Button className="hidden bg-gray-800 hover:bg-gray-900 md:inline-flex">
              {signInTranslation}
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="hidden bg-blue-600 hover:bg-blue-700 md:inline-flex">
              {signUpTranslation}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

const AppHeader = () => {
  const t = useTranslations('RootLayout');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container mx-auto flex h-14 items-center">
        <DesktopNavigation
          signInTranslation={t('sign_in_link')}
          signUpTranslation={t('sign_up_link')}
          featuresTranslation={t('features_link')}
          pricingTranslation={t('pricing_link')}
          faqTranslation={t('faq_link')}
        />
        <MobileAppHeader
          signInTranslation={t('sign_in_link')}
          signUpTranslation={t('sign_up_link')}
          featuresTranslation={t('features_link')}
          pricingTranslation={t('pricing_link')}
          faqTranslation={t('faq_link')}
        />
      </div>
    </header>
  );
};

export { AppHeader };
export type { NavigationProps };
