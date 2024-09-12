import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Testimonials = () => {
  return (
    <section className="w-full bg-gray-900 py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          What Our Users Say
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: 'Sharon Elsa James',
              role: 'Social Media Coordinator',
              content:
                'CV Mate helped me land my dream job. The AI-generated content was spot-on!',
            },
            {
              name: 'Trisha Venkat',
              role: 'Research Assistant',
              content:
                'The blockchain verification feature gave me an edge in a competitive job market.',
            },
            {
              name: 'Shubhamommy Baruli',
              role: 'Gay Housewife',
              content:
                'The skill gap analysis provided invaluable insights for my career development.',
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
