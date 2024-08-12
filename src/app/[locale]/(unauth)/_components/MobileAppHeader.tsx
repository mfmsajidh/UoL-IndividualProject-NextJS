'use client';

import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { type FC, useState } from 'react';

import type { NavigationProps } from '@/app/[locale]/(unauth)/_components/AppHeader';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import logo from '@/public/assets/images/cv_mate_logo.svg';

export const MobileAppHeader: FC<NavigationProps> = ({
  signInTranslation,
  signUpTranslation,
}) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer onClose={onClose} open={open} extra={<LocaleSwitcher />}>
        <Menu
          disabledOverflow
          items={[
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
            {
              disabled: true,
              key: 'sign-in',
              label: (
                <Link href="/sign-in/">
                  <Button type="primary" className="w-full">
                    {signInTranslation}
                  </Button>
                </Link>
              ),
            },
            {
              disabled: true,
              key: 'sign-up',
              label: (
                <Link href="/sign-up/">
                  <Button type="primary" className="w-full">
                    {signUpTranslation}
                  </Button>
                </Link>
              ),
            },
          ]}
          className="!border-e-transparent"
        />
      </Drawer>
      <Link
        href="/"
        className="flex flex-wrap items-center !border-b-0 lg:hidden"
      >
        <Image src={logo} alt="Logo of CV Mate" className="w-28" />
      </Link>
      <div className="lg:hidden">
        <Button
          type="primary"
          onClick={showDrawer}
          icon={<MenuOutlined style={{ color: 'white' }} />}
          className="flex flex-wrap items-center !border-b-0"
        />
      </div>
    </>
  );
};
