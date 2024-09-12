import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Features = () => {
  const t = useTranslations('Features');

  return (
    <section
      id="features"
      className="w-full bg-gray-950 py-12 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          {t('title')}
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: t('feature_1_title'),
              description: t('feature_1_description'),
            },
            {
              title: t('feature_2_title'),
              description: t('feature_2_description'),
            },
            {
              title: t('feature_3_title'),
              description: t('feature_3_description'),
            },
            {
              title: t('feature_4_title'),
              description: t('feature_4_description'),
            },
            {
              title: t('feature_5_title'),
              description: t('feature_5_description'),
            },
            {
              title: t('feature_6_title'),
              description: t('feature_6_description'),
            },
          ].map((feature) => (
            <Card key={feature.title} className="border-gray-700 bg-gray-800">
              <CardHeader>
                <CardTitle className="text-blue-400">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
