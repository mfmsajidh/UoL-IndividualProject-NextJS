import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
      <section className="w-full bg-gray-900 py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                Revolutionary CV Generation with ML & Blockchain
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                Create cutting-edge resumes powered by machine learning and
                secured by blockchain technology.
              </p>
            </div>
            <div className="space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Collection */}
      <section className="w-full bg-gray-900 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Trusted by Industry Leaders
          </h2>
          <div className="grid grid-cols-2 items-center justify-center gap-8 md:grid-cols-3 lg:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=40&width=150"
                  alt={`Logo ${i}`}
                  width={150}
                  height={40}
                  className="max-h-12 w-auto opacity-50 transition-opacity hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="w-full bg-gray-950 py-12 md:py-24 lg:py-32"
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Powerful Features
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'AI-Powered Content Generation',
                description:
                  'Our ML algorithms create tailored content based on your experience and industry trends.',
              },
              {
                title: 'Blockchain Verification',
                description:
                  'Ensure the authenticity of your CV with our blockchain-based verification system.',
              },
              {
                title: 'Real-time Updates',
                description:
                  'Your CV evolves with you, automatically updating as you gain new skills and experiences.',
              },
              {
                title: 'Multi-format Export',
                description:
                  'Generate your CV in various formats, from traditional PDFs to interactive web profiles.',
              },
              {
                title: 'ATS Optimization',
                description:
                  'Our AI ensures your CV is optimized for Applicant Tracking Systems, increasing your chances of getting noticed.',
              },
              {
                title: 'Skill Gap Analysis',
                description:
                  'Receive personalized recommendations on skills to acquire based on your career goals.',
              },
            ].map((feature) => (
              <Card key={feature.title} className="border-gray-700 bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-blue-400">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full bg-gray-900 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            What Our Users Say
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Alex Johnson',
                role: 'Software Engineer',
                content:
                  'ML-Block CV helped me land my dream job. The AI-generated content was spot-on!',
              },
              {
                name: 'Sarah Lee',
                role: 'Marketing Manager',
                content:
                  'The blockchain verification feature gave me an edge in a competitive job market.',
              },
              {
                name: 'Michael Brown',
                role: 'Data Scientist',
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
                    `&quot;{testimonial.content}`&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="w-full bg-gray-950 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
                Why Choose ML-Block CV?
              </h2>
              <ul className="space-y-2">
                {[
                  'Cutting-edge AI technology',
                  'Blockchain-powered verification',
                  'Continuous learning and improvement',
                  'Tailored to your industry',
                  'Time-saving automation',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center space-x-2 text-gray-300"
                  >
                    <CheckCircle className="size-5 text-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="ML-Block CV Highlights"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="w-full bg-gray-900 py-12 md:py-24 lg:py-32"
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Choose Your Plan
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Basic',
                price: '$9.99',
                features: [
                  'AI-generated content',
                  'PDF export',
                  'Basic blockchain verification',
                ],
              },
              {
                title: 'Pro',
                price: '$19.99',
                features: [
                  'Everything in Basic',
                  'Multi-format export',
                  'Advanced AI customization',
                  'Priority support',
                ],
              },
              {
                title: 'Enterprise',
                price: 'Custom',
                features: [
                  'Everything in Pro',
                  'Dedicated account manager',
                  'Custom integrations',
                  'Advanced analytics',
                ],
              },
            ].map((plan, index) => (
              <Card
                key={plan.title}
                className="flex flex-col border-gray-700 bg-gray-800"
              >
                <CardHeader>
                  <CardTitle className="text-blue-400">{plan.title}</CardTitle>
                  <p className="text-2xl font-bold text-white">{plan.price}</p>
                  {index === 1 && (
                    <Badge className="w-fit bg-blue-600 text-white">
                      Most Popular
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center space-x-2 text-gray-300"
                      >
                        <CheckCircle className="size-5 text-blue-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    {index === 2 ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="w-full bg-gray-950 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="mx-auto w-full max-w-3xl"
          >
            {[
              {
                question: 'How does the AI generate CV content?',
                answer:
                  'Our AI analyzes your input, industry trends, and job market data to create tailored, professional content for your CV.',
              },
              {
                question: 'Is my data secure with blockchain verification?',
                answer:
                  'Yes, blockchain technology ensures that your CV data is securely stored and verifiable, protecting against unauthorized changes.',
              },
              {
                question: 'Can I edit the AI-generated content?',
                answer:
                  'While our AI provides a strong foundation, you have full control to edit and personalize your CV content.',
              },
              {
                question: 'How often can I update my CV?',
                answer:
                  'You can update your CV as often as you like. Our system allows for real-time updates and continuous improvement of your profile.',
              },
              {
                question:
                  'Is ML-Block CV compatible with Applicant Tracking Systems (ATS)?',
                answer:
                  'Yes, our AI is trained to optimize your CV for ATS, increasing your chances of getting past initial screening processes.',
              },
            ].map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="border-b border-gray-800"
              >
                <AccordionTrigger className="text-white hover:text-blue-400">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  );
}
