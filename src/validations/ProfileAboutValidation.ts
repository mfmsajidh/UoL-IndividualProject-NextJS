import type { useTranslations } from 'next-intl';
import { z } from 'zod';

export const ProfileAboutValidation = (
  t: ReturnType<typeof useTranslations>,
) => {
  return z.object({
    name: z.string().min(1, t('full_name_validation')),
    headline: z.string().min(1, 'Professional Headline is required'),
    about: z.string().min(10, 'About must be at least 10 characters long'),
  });
};
