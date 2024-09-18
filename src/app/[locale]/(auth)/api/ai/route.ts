import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { zodResponseFormat } from 'openai/helpers/zod';

import { logger } from '@/libs/Logger';
import { openai } from '@/libs/OpenAI';
import type { ProfileContent } from '@/validations/AiValidation';
import { ProfileContentValidation } from '@/validations/AiValidation';

export const POST = async (request: NextRequest) => {
  try {
    const {
      userProfile,
      jobDescription,
    }: { userProfile: ProfileContent; jobDescription: string } =
      await request.json();

    const response = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-2024-08-06',
      messages: [
        {
          role: 'system',
          content:
            "You are a professional resume writer specializing in optimizing resumes for Applicant Tracking Systems (ATS). Your goal is to analyze the job description and user profile and optimize the resume to match the job description for ATS. Include keywords, rephrase sections, and align the user's experience and skills with the job requirements. Do not remove any work experiences",
        },
        {
          role: 'user',
          content: `
            Here is the user's profile in JSON format:
            ${JSON.stringify(userProfile, null, 2)}

            Here is the job description:
            ${jobDescription}

            Your Goal: Optimize the profile to match the job description, making it ATS-friendly. Rewrite sections like About, Experience, Education, Skills, and Languages.
          `,
        },
      ],
      response_format: zodResponseFormat(
        ProfileContentValidation,
        'optimised_profile_content',
      ),
    });

    const assistantMessage = response.choices[0]?.message;

    if (assistantMessage?.refusal) {
      logger.error('No content received from OpenAI');
      return NextResponse.json(
        {
          error: 'No content received from OpenAI',
          response: assistantMessage?.refusal,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(assistantMessage?.parsed);
  } catch (error: any) {
    if (error.constructor.name === 'LengthFinishReasonError') {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
