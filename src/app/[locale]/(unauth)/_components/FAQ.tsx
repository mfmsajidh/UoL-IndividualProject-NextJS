import { useTranslations } from 'next-intl';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const FAQ = () => {
  const t = useTranslations('FAQ');

  return (
    <section id="faq" className="w-full bg-gray-950 py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          {t('title')}
        </h2>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-3xl"
        >
          {[
            {
              question: t('question_1_title'),
              answer: t('question_1_content'),
            },
            {
              question: t('question_2_title'),
              answer: t('question_2_content'),
            },
            {
              question: t('question_3_title'),
              answer: t('question_3_content'),
            },
            {
              question: t('question_4_title'),
              answer: t('question_4_content'),
            },
            {
              question: t('question_5_title'),
              answer: t('question_5_content'),
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
