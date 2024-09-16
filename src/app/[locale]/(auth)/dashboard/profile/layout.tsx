'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { FC, ReactNode } from 'react';

import { StellarConnectCard } from '@/app/[locale]/(auth)/dashboard/_components/StellarConnectCard';
import { TabLink } from '@/app/[locale]/(auth)/dashboard/profile/_components/TabLink';
import { useWallet } from '@/hooks/useWallet';

const ProfileLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const pathname = usePathname();
  const activeTab = pathname.split('/').pop();
  const { publicKey } = useWallet();

  const t = useTranslations('Profile');

  return publicKey ? (
    <>
      <h1 className="mb-6 text-3xl font-bold text-white">{t('title')}</h1>
      <div className="space-y-6">
        <div className="flex space-x-1 overflow-x-auto rounded-lg bg-gray-800 p-1">
          <TabLink tabLink="about" tabName={t('about')} activeTab={activeTab} />
          <TabLink
            tabLink="experience"
            tabName={t('experience')}
            activeTab={activeTab}
          />
          <TabLink
            tabLink="education"
            tabName={t('education')}
            activeTab={activeTab}
          />
          <TabLink
            tabLink="skills"
            tabName={t('skills')}
            activeTab={activeTab}
          />
          <TabLink
            tabLink="languages"
            tabName={t('languages')}
            activeTab={activeTab}
          />
        </div>
        {children}
      </div>
    </>
  ) : (
    <StellarConnectCard />
  );
};

export default ProfileLayout;
