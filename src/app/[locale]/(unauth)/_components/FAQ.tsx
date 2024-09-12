import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const FAQ = () => {
  return (
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
                'Is CV Mate compatible with Applicant Tracking Systems (ATS)?',
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
  );
};
