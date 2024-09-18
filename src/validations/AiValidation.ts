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
  grade: z
    .string()
    .optional()
    .describe(
      'Grade or GPA achieved (Optional. Do not list if below a 2:1 - If still studying state predicted grade OR grade achieved to date)',
    ),
  activities: z
    .string()
    .optional()
    .describe(
      'Extracurricular activities, awards and/or achievements (optional). Note that relevant interests and skills can also be demonstrated through campus and volunteer activities. Explain the duties, role in organisation, describing the difference made. Use action verbs at the beginning of each statement. Describe what is accomplished by giving numbers.',
    ),
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
    .describe(
      'Job description and responsibilities. Begin each line with an action verb and include details that will help the reader understand the accomplishments, skills, knowledge, abilities, or achievements. Describe what is accomplished in the position and give numbers indicating achievements (Quantify accomplishments where possible; be consistent presenting data, use either numerals or words). Do not use personal pronouns; each line should be a phrase rather than a full sentence',
    ),
  location: z
    .string()
    .describe("Location of the job. Format to 'City, Country'"),
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
    about: z
      .string()
      .describe(
        'Brief biography or professional summary. Located directly beneath the heading and contact information. This offers a way to stand out. Keep it concise (between one and four sentences long). Focus on the job description and only include the skills and qualifications that relate to the specific job.',
      ),
    address: z
      .string()
      .describe("Current location or address. Format to 'City, Country'"),
    email: z.string().describe('Email address of the individual'),
    phoneNumber: z.string().describe('Phone number of the individual'),
  }),
  educations: z
    .array(EducationValidation)
    .describe(
      'List of educational experiences. Arrange it according to the most recent.',
    ),
  experiences: z
    .array(ExperienceValidation)
    .describe(
      'List of work experiences. Arrange it according to the most recent position',
    ),
  skills: z.array(z.string()).describe('List of professional skills'),
  languages: z
    .array(LanguageValidation)
    .describe('List of languages and proficiency levels'),
});

export type ProfileContent = z.infer<typeof ProfileContentValidation>;
