import type { useTranslations } from 'next-intl';
import { z } from 'zod';

export const ProfileAboutValidation = (
  t: ReturnType<typeof useTranslations>,
) => {
  return z.object({
    name: z.string().min(1, t('full_name_validation')),
    headline: z.string().min(1, t('headline_validation')),
    about: z.string().min(10, t('about_validation')),
    address: z.string().min(1, t('address_validation')),
    email: z.string().email().min(1, t('email_validation')),
    phoneNumber: z.string().min(1, t('phone_number_validation')),
  });
};
