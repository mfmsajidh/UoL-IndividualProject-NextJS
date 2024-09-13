import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Dominos_Logo from '@/public/assets/images/dominos_logo.png';
import Harvard_logo from '@/public/assets/images/harvard_logo.png';
import Oxford_Logo from '@/public/assets/images/oxford_logo.png';
import Samsung_Logo from '@/public/assets/images/samsung_logo.png';
import UoL_Logo from '@/public/assets/images/uol_logo.png';
import UoN_Logo from '@/public/assets/images/uon_logo.png';

interface ILogoCollectionProps {
  image: StaticImageData;
}

const RenderLogo: FC<ILogoCollectionProps> = ({ image }) => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={image}
        alt={`Logo ${image.src}`}
        width={150}
        height={40}
        className="max-h-12 w-auto bg-white opacity-50 transition-opacity hover:opacity-100"
      />
    </div>
  );
};

export const LogoCollection = () => {
  const t = useTranslations('LogoCollection');

  return (
    <section className="w-full bg-gray-900 py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">
          {t('title')}
        </h2>
        <div className="grid grid-cols-2 items-center justify-center gap-8 md:grid-cols-3 lg:grid-cols-6">
          <RenderLogo image={UoL_Logo} />
          <RenderLogo image={Harvard_logo} />
          <RenderLogo image={Dominos_Logo} />
          <RenderLogo image={UoN_Logo} />
          <RenderLogo image={Samsung_Logo} />
          <RenderLogo image={Oxford_Logo} />
        </div>
      </div>
    </section>
  );
};
