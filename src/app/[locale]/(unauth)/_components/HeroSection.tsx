import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
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
  );
};
