'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC, ReactNode } from 'react';

import { StellarConnectCard } from '@/app/[locale]/(auth)/dashboard/_components/StellarConnectCard';
import { useWallet } from '@/hooks/useWallet';

const ProfileLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const pathname = usePathname();
  const activeTab = pathname.split('/').pop();
  const { publicKey } = useWallet();

  const tabs = ['about', 'experience', 'education', 'skills', 'languages'];

  return publicKey ? (
    <>
      <h1 className="mb-6 text-3xl font-bold text-white">Your Profile</h1>
      <div className="space-y-6">
        <div className="flex space-x-1 overflow-x-auto rounded-lg bg-gray-800 p-1">
          {tabs.map((tab) => (
            <Link href={`/dashboard/profile/${tab}`} key={tab}>
              <button
                type="button"
                key={tab}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </Link>
          ))}
        </div>
        {children}
      </div>
    </>
  ) : (
    <StellarConnectCard />
  );
};

export default ProfileLayout;
