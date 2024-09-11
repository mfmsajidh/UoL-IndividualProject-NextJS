import { unstable_setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

// import { AppFooter } from '@/app/[locale]/(unauth)/_components/AppFooter';
// import { AppHeader } from '@/app/[locale]/(unauth)/_components/AppHeader';

export default function Layout(props: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);
  // const t = useTranslations('RootLayout');

  return props.children;
}
