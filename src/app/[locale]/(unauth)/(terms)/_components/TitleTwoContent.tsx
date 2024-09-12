import type { FC } from 'react';

import type { TitleContentProps } from '@/app/[locale]/(unauth)/(terms)/_components/TitleContent';

interface TitleTwoContentProps extends TitleContentProps {
  content2: string;
}

export const TitleTwoContent: FC<TitleTwoContentProps> = ({
  title,
  content,
  content2,
}) => {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-blue-400">{title}</h2>
      <p className="mb-4">{content}</p>
      <p>{content2}</p>
    </section>
  );
};
