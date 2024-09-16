import { z } from 'zod';

export const ProfileAboutValidation = z.object({
  name: z.string().min(1, 'Full Name is required'),
  headline: z.string().min(1, 'Professional Headline is required'),
  about: z.string().min(10, 'About must be at least 10 characters long'),
});
