import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import { DashboardFooter } from '@/app/[locale]/(auth)/dashboard/_components/DashboardFooter';
import { DashboardHeader } from '@/app/[locale]/(auth)/dashboard/_components/DashboardHeader';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
  };
}

export default function DashboardLayout(props: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <DashboardHeader />

      <main className="container mx-auto flex-1 px-4 py-12 sm:px-1">
        {props.children}
      </main>

      <DashboardFooter />
    </div>
  );
}

export const dynamic = 'force-dynamic';
