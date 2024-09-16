import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { AppFooter } from '@/app/[locale]/_components/AppFooter';
import { AppHeader } from '@/app/[locale]/_components/AppHeader';

export default function CenteredLayout(props: { children: React.ReactNode }) {
  const { userId } = auth();

  if (userId) {
    redirect('/dashboard/');
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-950 text-gray-100">
      {/* App Bar */}
      <AppHeader />

      <div className="grow content-center">{props.children}</div>

      {/* Footer */}
      <AppFooter />
    </div>
  );
}
