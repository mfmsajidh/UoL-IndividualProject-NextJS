import { unstable_setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { AppFooter } from '@/app/[locale]/_components/AppFooter';
import { AppHeader } from '@/app/[locale]/_components/AppHeader';

export default function Layout(props: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      {/* App Bar */}
      <AppHeader />

      {props.children}

      {/* Footer */}
      <AppFooter />
    </div>
  );
}
