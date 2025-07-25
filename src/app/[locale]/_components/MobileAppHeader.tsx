'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { type FC, useState } from 'react';

import type { NavigationProps } from '@/app/[locale]/_components/AppHeader';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/public/assets/images/cv_mate_logo.svg';

export const MobileAppHeader: FC<NavigationProps> = ({
  signInTranslation,
  signUpTranslation,
  featuresTranslation,
  pricingTranslation,
  faqTranslation,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Link
        href="/"
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Image src={Logo} alt="Logo of CV Mate" className="w-28" />
      </Link>
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="md:hidden"
            aria-label="Toggle Menu"
          >
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] bg-gray-900 p-0 text-gray-100"
          showClose={false}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-gray-800 p-4">
              <LocaleSwitcher />
              <Button
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X className="size-6" />
              </Button>
            </div>
            <nav className="flex flex-col p-4">
              <Link
                href="/#features"
                className="py-2 text-lg hover:text-blue-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {featuresTranslation}
              </Link>
              <Link
                href="/#pricing"
                className="py-2 text-lg hover:text-blue-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {pricingTranslation}
              </Link>
              <Link
                href="/#faq"
                className="py-2 text-lg hover:text-blue-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {faqTranslation}
              </Link>
            </nav>
            <div className="mt-auto p-4">
              <Link href="/sign-in">
                <Button
                  className="mb-2 w-full bg-gray-800 hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {signInTranslation}
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {signUpTranslation}
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
