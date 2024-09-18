import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import type { NextRequest } from 'next/server';

import { ProfileContentValidation } from '@/validations/AiValidation';

export const POST = async (request: NextRequest) => {
  const {
    userProfile,
    jobDescription,
  }: { userProfile: object; jobDescription: string } = await request.json();

  const result = await generateObject({
    model: openai('gpt-4o-2024-08-06', {
      structuredOutputs: true,
    }),
    system: `You are a professional resume writer specializing in optimizing resumes for Applicant Tracking Systems (ATS). Your goal is to analyze the job description and user profile and optimize the resume to match the job description for ATS. Include keywords, rephrase sections, and align the user's experience and skills with the job requirements.`,
    prompt: `
    Here is the user's profile in JSON format:
    
    ${JSON.stringify(userProfile, null, 2)}
    
    Here is the job description:
    
    ${jobDescription}
    
    Optimize the profile to match the job description, making it ATS-friendly. Rewrite sections like About, Experience, Education, Skills, and Languages.`,
    schemaName: 'A optimised profile',
    schemaDescription:
      'A structured profile content including about, education, experience, skills, and languages.',
    schema: ProfileContentValidation,
  });

  return result.toJsonResponse();
};
