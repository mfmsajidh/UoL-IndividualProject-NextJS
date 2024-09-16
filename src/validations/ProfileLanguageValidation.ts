import type { useTranslations } from 'next-intl';
import { z } from 'zod';

export const ProfileLanguageValidation = (
  t: ReturnType<typeof useTranslations>,
) => {
  return z.object({
    languages: z.array(
      z.object({
        language: z
          .string()
          .min(1, { message: t('language_validation_1') })
          .max(50, { message: t('language_validation_2') }),
        proficiency: z
          .string()
          .min(1, { message: t('proficiency_validation') }),
      }),
    ),
  });
};
