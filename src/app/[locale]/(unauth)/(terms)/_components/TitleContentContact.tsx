import type { FC } from 'react';

import type { TitleContentProps } from '@/app/[locale]/(unauth)/(terms)/_components/TitleContent';

interface TitleContentContactProps extends TitleContentProps {
  contentList: {
    name: string;
    url: string;
    contact: string;
  }[];
}

export const TitleContentContact: FC<TitleContentContactProps> = ({
  title,
  content,
  contentList,
}) => {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-blue-400">{title}</h2>
      <p className="mb-4">{content}</p>
      <ul className="ml-4 list-inside list-disc space-y-2">
        {contentList.map((item) => (
          <li key={item.name}>
            {item.name}{' '}
            <a href={item.url} className="hover:underline">
              {item.contact}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
