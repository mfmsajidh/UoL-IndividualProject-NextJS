import type { useTranslations } from 'next-intl';
import { z } from 'zod';

export const ProfileSkillsValidation = (
  t: ReturnType<typeof useTranslations>,
) => {
  return z.object({
    skills: z
      .array(
        z.object({
          name: z.string().min(1, { message: t('skill_validation') }),
        }),
      )
      .min(1, { message: t('skills_validation') }),
  });
};
