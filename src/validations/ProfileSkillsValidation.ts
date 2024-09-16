import { z } from 'zod';

export const ProfileSkillsValidation = z.object({
  skills: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Skill is required' }), // Ensure each skill has a non-empty 'name'
      }),
    )
    .min(1, { message: 'At least one skill is required' }), // Ensure at least one skill is present
});
