'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Loading() {
  const t = useTranslations('Loading');
  const [loadingText, setLoadingText] = useState(t('loading'));

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prevText) => {
        if (prevText === `${t('loading')}...`) return t('loading');
        return `${prevText}.`;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [t]);

  return (
    <div className="flex min-h-96 flex-col items-center justify-center bg-gray-950 text-gray-100">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 size-16 animate-spin text-blue-500" />
        <h1 className="mb-2 text-2xl font-bold">{loadingText}</h1>
        <p className="text-gray-400">{t('description')}</p>
      </div>
    </div>
  );
}
