import { createOpenAI } from '@ai-sdk/openai';

export const openai = createOpenAI({
  apiKey: `${process.env.OPENAI_API_KEY}`,
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
});
