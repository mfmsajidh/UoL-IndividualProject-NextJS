import { z } from 'zod';

const EducationValidation = z.object({
  school: z.string().describe('Name of the educational institution'),
  startDate: z
    .string()
    .describe('Start date of education. Format to Month and Year'),
  endDate: z
    .string()
    .describe(
      "End date of education (format to Month and Year) or 'Present' if ongoing",
    ),
  degree: z
    .string()
    .describe("Degree obtained or pursued (e.g., Bachelor's, Master's)"),
  fieldOfStudy: z.string().describe('Field of study or major'),
  grade: z.string().optional().describe('Grade or GPA achieved (optional)'),
  activities: z
    .string()
    .optional()
    .describe('Extracurricular activities (optional)'),
  description: z
    .string()
    .optional()
    .describe('Additional description or achievements (optional)'),
});

const ExperienceValidation = z.object({
  title: z.string().describe('Job title or position'),
  company: z.string().describe('Name of the company or organization'),
  startDate: z
    .string()
    .describe('Start date of the job. Format to Month and Year'),
  endDate: z
    .string()
    .optional()
    .describe(
      "End date of employment (format to Month and Year) or 'Present' if current",
    ),
  description: z
    .string()
    .optional()
    .describe('Job description and responsibilities'),
  location: z.string().describe('Location of the job'),
  employmentType: z
    .string()
    .describe('Type of employment (e.g., full-time, part-time, freelance)'),
});

const LanguageValidation = z.object({
  language: z.string().describe('Name of the language'),
  proficiency: z
    .string()
    .describe('Proficiency level (e.g., native, fluent, basic)'),
});

export const ProfileContentValidation = z.object({
  about: z.object({
    name: z.string().describe('Full name of the individual'),
    headline: z.string().describe('Professional headline, title or tagline'),
    about: z.string().describe('Brief biography or professional summary'),
    address: z.string().describe('Current location or address'),
    email: z.string().describe('Email address of the individual'),
    phoneNumber: z.string().describe('Phone number of the individual'),
  }),
  educations: z
    .array(EducationValidation)
    .describe('List of educational experiences'),
  experiences: z
    .array(ExperienceValidation)
    .describe('List of work experiences'),
  skills: z.array(z.string()).describe('List of professional skills'),
  languages: z
    .array(LanguageValidation)
    .describe('List of languages and proficiency levels'),
});

export type ProfileContent = z.infer<typeof ProfileContentValidation>;
