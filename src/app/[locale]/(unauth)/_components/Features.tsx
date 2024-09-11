import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Features = () => {
  return (
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
