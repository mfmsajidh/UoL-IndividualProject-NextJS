import type { FC } from 'react';

export const Heading: FC<{
  title: string;
}> = ({ title }) => {
  return <h1 className="mb-8 text-4xl font-bold text-white">{title}</h1>;
};
