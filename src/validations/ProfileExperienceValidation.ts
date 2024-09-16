import type { useTranslations } from 'next-intl';
import { z } from 'zod';

export const ProfileExperienceValidation = (
  t: ReturnType<typeof useTranslations>,
) => {
  return z.object({
    experiences: z
      .array(
        z.object({
          title: z
            .string()
            .min(2, { message: t('title_validation_1') })
            .max(100, { message: t('title_validation_2') }),
          company: z
            .string()
            .min(2, {
              message: t('company_validation_1'),
            })
            .max(100, { message: t('company_validation_2') }),
          startDate: z.string().min(1, { message: t('start_date_validation') }),
          endDate: z.string().optional(),
          description: z
            .string()
            .max(1000, { message: t('description_validation') })
            .optional(),
          location: z
            .string()
            .min(2, { message: t('location_validation_1') })
            .max(100, { message: t('location_validation_2') }),
          employmentType: z
            .string()
            .min(1, { message: t('employment_validation') }),
        }),
      )
      .min(1, { message: t('experience_validation') }),
  });
};
