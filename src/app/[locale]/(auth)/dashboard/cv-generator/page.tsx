'use client';

import { FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function CVGeneratorPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [generatedDocument, setGeneratedDocument] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulating document generation
    setTimeout(() => {
      setGeneratedDocument(`Generated document based on the job description:

Job Title: Software Engineer

Key Requirements:
1. Strong proficiency in JavaScript and TypeScript
2. Experience with React and Next.js
3. Familiarity with RESTful APIs and GraphQL
4. Understanding of version control systems (Git)
5. Knowledge of cloud platforms (preferably AWS or Azure)

Responsibilities:
- Develop and maintain web applications using React and Next.js
- Collaborate with cross-functional teams to define and implement new features
- Optimize application for maximum speed and scalability
- Write clean, maintainable, and efficient code
- Participate in code reviews and contribute to team's best practices

Qualifications:
- Bachelor's degree in Computer Science or related field
- 3+ years of experience in web development
- Strong problem-solving skills and attention to detail
- Excellent communication and teamwork abilities
- Continuous learner, keeping up with the latest web technologies

This job requires a skilled developer with a strong foundation in modern web technologies, particularly in the React ecosystem. The ideal candidate should be able to write efficient, scalable code and work collaboratively in a team environment.`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container mx-auto flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="size-6 text-blue-500" />
            <span className="font-bold">Job Description Analyzer</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto flex-1 py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <Card className="flex-1 border-gray-700 bg-gray-800">
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="flex h-full flex-col">
              <Textarea
                placeholder="Paste your job description here..."
                className="min-h-[300px] grow border-gray-600 bg-gray-700 lg:min-h-[500px]"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <Button
                className="mt-4 self-start bg-blue-600 hover:bg-blue-700"
                onClick={handleGenerate}
                disabled={isGenerating || !jobDescription.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Document'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="flex-1 border-gray-700 bg-gray-800">
            <CardHeader>
              <CardTitle>Generated Document</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px] overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-600 bg-gray-700 p-4 lg:min-h-[500px]">
                {generatedDocument ||
                  'Your generated document will appear here...'}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
