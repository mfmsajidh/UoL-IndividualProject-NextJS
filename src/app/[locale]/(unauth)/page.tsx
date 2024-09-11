import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { FAQ } from '@/app/[locale]/(unauth)/_components/FAQ';
import { Features } from '@/app/[locale]/(unauth)/_components/Features';
import { HeroSection } from '@/app/[locale]/(unauth)/_components/HeroSection';
import { Highlights } from '@/app/[locale]/(unauth)/_components/Highlights';
import { LogoCollection } from '@/app/[locale]/(unauth)/_components/LogoCollection';
import { Pricing } from '@/app/[locale]/(unauth)/_components/Pricing';
import { Testimonials } from '@/app/[locale]/(unauth)/_components/Testimonials';

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

export default function Index(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <HeroSection />

      {/* Logo Collection */}
      <LogoCollection />

      {/* Features */}
      <Features />

      {/* Testimonials */}
      <Testimonials />

      {/* Highlights */}
      <Highlights />

      {/* Pricing */}
      <Pricing />

      {/* FAQ */}
      <FAQ />
    </main>
  );
}
