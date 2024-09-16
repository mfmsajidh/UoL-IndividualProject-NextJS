import { z } from 'zod';

// Validation for the languages section
export const ProfileLanguageValidation = z.object({
  languages: z.array(
    z.object({
      language: z
        .string()
        .min(1, { message: 'Language is required' })
        .max(50, { message: 'Language must be less than 50 characters' }),
      proficiency: z.string().min(1, { message: 'Proficiency is required' }),
    }),
  ),
});
