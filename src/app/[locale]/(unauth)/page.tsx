import { Button } from 'antd';
import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import image from '@/public/assets/images/cv.svg';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const Hero = () => {
  return (
    <div
      id="hero"
      className="w-full bg-gradient-to-b from-blue-100 to-white dark:from-blue-900 dark:to-transparent"
    >
      <div className="container mx-auto flex flex-col items-center pb-8 pt-14 sm:pb-12 sm:pt-32">
        <div className="w-full space-y-4 sm:w-4/5 lg:w-2/3">
          <div className="flex flex-col items-center justify-center text-center text-4xl sm:text-5xl md:text-6xl">
            Transform Your CV with{' '}
            <span className="text-blue-600 dark:text-blue-400">
              AI & Blockchain
            </span>
          </div>
          <div className="mx-auto w-full text-center text-gray-600 md:w-4/5 dark:text-gray-300">
            Create, Validate, and Securely Share Your CV with the Power of
            Machine Learning and Decentralisation. Automate your CV creation,
            optimise it, and ensure its authenticity with blockchain technology.
            Your career journey begins here.
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 pt-4 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Link href="/sign-up/">
              <Button type="primary" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="block text-center text-xs text-gray-500 dark:text-gray-400">
            By clicking &quot;Get Started&quot; you agree to our{' '}
            <Link href="/#" className="text-blue-600 dark:text-blue-400">
              Terms & Conditions
            </Link>
            .
          </div>
        </div>
        <div
          id="image"
          className="mt-8 h-48 w-full rounded-lg border border-gray-200 bg-cover bg-center shadow-lg sm:mt-10 sm:h-[700px] dark:border-gray-800"
          style={{
            backgroundImage: `url(${image.src})`,
          }}
        />
      </div>
    </div>
  );
};

export default function Index(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);

  return <Hero />;
}
