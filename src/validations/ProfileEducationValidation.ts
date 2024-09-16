import type { useTranslations } from 'next-intl';
import { z } from 'zod';

export const ProfileEducationValidation = (
  t: ReturnType<typeof useTranslations>,
) => {
  return z.object({
    educations: z.array(
      z.object({
        school: z.string().min(1, { message: t('school_validation') }),
        startDate: z.string().min(1, { message: t('start_date_validation') }),
        endDate: z.string().min(1, { message: t('end_date_validation') }),
        degree: z.string().min(1, { message: t('degree_validation') }),
        fieldOfStudy: z
          .string()
          .min(1, { message: t('field_of_study_validation') }),
        grade: z.string().optional(),
        activities: z.string().optional(),
        description: z.string().optional(),
      }),
    ),
  });
};
