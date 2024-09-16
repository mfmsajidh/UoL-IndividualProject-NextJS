import { z } from 'zod';

// Zod validation schema for the profile experience section
export const ProfileExperienceValidation = z.object({
  experiences: z
    .array(
      z.object({
        title: z
          .string()
          .min(2, { message: 'Title must be at least 2 characters long' })
          .max(100, { message: 'Title cannot exceed 100 characters' }),
        company: z
          .string()
          .min(2, {
            message: 'Company name must be at least 2 characters long',
          })
          .max(100, { message: 'Company name cannot exceed 100 characters' }),
        startDate: z.string().min(1, { message: 'Start date is required' }),
        endDate: z.string().optional(),
        description: z
          .string()
          .max(1000, { message: 'Description cannot exceed 1000 characters' })
          .optional(),
        location: z
          .string()
          .min(2, { message: 'Location must be at least 2 characters long' })
          .max(100, { message: 'Location cannot exceed 100 characters' }),
        employmentType: z
          .string()
          .min(1, { message: 'Employment type is required' }),
      }),
    )
    .min(1, { message: 'At least one experience is required' }),
});
