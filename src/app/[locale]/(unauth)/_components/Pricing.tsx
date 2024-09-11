import { CheckCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Pricing = () => {
  return (
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
  );
};
