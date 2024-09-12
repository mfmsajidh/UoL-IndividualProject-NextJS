import Link from 'next/link';

import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="w-full bg-gray-900 py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
              Revolutionary CV Generation
              <br />
              <span className="text-blue-600">
                {' '}
                powered by AI & Blockchain{' '}
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
              Create, Validate, and Securely Share Your Resume
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/sign-up">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
            <Link href="/#features">
              <Button className="bg-gray-800 text-white hover:bg-gray-900">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
