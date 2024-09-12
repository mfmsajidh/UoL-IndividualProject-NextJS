import type { FC } from 'react';

interface TitleContentProps {
  title: string;
  content: string;
}

const TitleContent: FC<TitleContentProps> = ({ title, content }) => {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-blue-400">{title}</h2>
      <p className="mb-4">{content}</p>
    </section>
  );
};

export { TitleContent };

export type { TitleContentProps };
