import { z } from 'zod';

export const EducationSchema = z.object({
  school: z.string().min(1, { message: 'School is required' }),
  startDate: z.string().min(1, { message: 'Start Date is required' }),
  endDate: z.string().min(1, { message: 'End Date is required' }),
  degree: z.string().min(1, { message: 'Degree is required' }),
  fieldOfStudy: z.string().min(1, { message: 'Field of Study is required' }),
  grade: z.string().optional(),
  activities: z.string().optional(),
  description: z.string().optional(),
});

export const ProfileEducationValidation = z.object({
  educations: z.array(EducationSchema),
});
