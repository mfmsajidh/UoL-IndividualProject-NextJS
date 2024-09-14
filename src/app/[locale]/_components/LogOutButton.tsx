'use client';

import { useClerk } from '@clerk/nextjs';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';

const LogOutButton: FC<{
  isMobile?: boolean;
}> = ({ isMobile = false }) => {
  const router = useRouter();
  const { signOut } = useClerk();
  const t = useTranslations('DashboardHeader');

  return (
    <Button
      className={clsx(
        isMobile && 'w-full',
        !isMobile && 'hidden md:inline-flex',
        'bg-blue-600 hover:bg-blue-700',
      )}
      onClick={() => signOut(() => router.push('/'))}
    >
      {t('sign_out_link')}
    </Button>
  );
};

export { LogOutButton };
