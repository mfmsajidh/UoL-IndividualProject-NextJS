import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

const TermsLayout = (props: {
  children: ReactNode;
  params: { locale: string };
}) => {
  unstable_setRequestLocale(props.params.locale);
  const t = useTranslations('TermsLayout');

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container flex h-14 items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:text-gray-400"
          >
            <ArrowLeft className="ml-2 size-6 text-blue-500" />
            <span className="font-bold text-gray-300 hover:text-white ">
              {t('back_to_home_link')}
            </span>
          </Link>
        </div>
      </header>
      <main className="container mx-auto flex-1 py-12 md:py-24 lg:py-32">
        {props.children}
      </main>
    </div>
  );
};

export default TermsLayout;
