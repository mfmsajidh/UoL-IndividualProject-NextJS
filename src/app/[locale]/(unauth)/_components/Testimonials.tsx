import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Testimonials = () => {
  const t = useTranslations('Testimonials');

  return (
    <section className="w-full bg-gray-900 py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          {t('title')}
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: t('testimonial_1_name'),
              role: t('testimonial_1_role'),
              content: t('testimonial_1_content'),
            },
            {
              name: t('testimonial_2_name'),
              role: t('testimonial_2_role'),
              content: t('testimonial_2_content'),
            },
            {
              name: t('testimonial_3_name'),
              role: t('testimonial_3_role'),
              content: t('testimonial_3_content'),
            },
          ].map((testimonial) => (
            <Card
              key={testimonial.name}
              className="border-gray-700 bg-gray-800"
            >
              <CardHeader>
                <CardTitle className="text-blue-400">
                  {testimonial.name}
                </CardTitle>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  &quot;{testimonial.content}&quot;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
