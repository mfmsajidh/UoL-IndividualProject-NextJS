import Image from 'next/image';

export const LogoCollection = () => {
  return (
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
  );
};
