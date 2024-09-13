import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import HighlightImage from '@/public/assets/images/highlight.svg';

export const Highlights = () => {
  const t = useTranslations('Highlights');

  return (
    <section className="w-full bg-gray-950 py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
              {t('title')}
            </h2>
            <ul className="space-y-2">
              {[
                t('highlight_1'),
                t('highlight_2'),
                t('highlight_3'),
                t('highlight_4'),
                t('highlight_5'),
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center space-x-2 text-gray-300"
                >
                  <CheckCircle className="size-5 text-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={HighlightImage}
              alt={t('title')}
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
