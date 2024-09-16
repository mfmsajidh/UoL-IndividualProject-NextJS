'use client';

import JsPDF from 'jspdf';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { StellarConnectCard } from '@/app/[locale]/(auth)/dashboard/_components/StellarConnectCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/hooks/useWallet';
import { fetchFromIPFS } from '@/libs/Pinata';
import { fetchLatestSectionCIDs } from '@/libs/Stellar';

interface ProfileData {
  about: any;
  education: any;
  experience: any;
  skills: any[];
  languages: any;
}

export default function CVGeneratorPage() {
  const t = useTranslations('CVGenerator');
  const { publicKey } = useWallet();

  const [jobDescription, setJobDescription] = useState('');
  const [generatedDocument, setGeneratedDocument] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    about: null,
    education: null,
    experience: null,
    skills: [],
    languages: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fetch the latest profile data from Stellar and IPFS on page load
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!publicKey) return;

      try {
        setIsLoading(true);

        const latestCIDs = await fetchLatestSectionCIDs(publicKey);

        // Fetch each section's data from IPFS using the CID
        const aboutData = latestCIDs.about
          ? await fetchFromIPFS(latestCIDs.about.latestCID)
          : null;
        const educationData = latestCIDs.education
          ? await fetchFromIPFS(latestCIDs.education.latestCID)
          : null;
        const experienceData = latestCIDs.experience
          ? await fetchFromIPFS(latestCIDs.experience.latestCID)
          : null;
        const skillsData = latestCIDs.skills
          ? await fetchFromIPFS(latestCIDs.skills.latestCID)
          : null;
        const languagesData = latestCIDs.languages
          ? await fetchFromIPFS(latestCIDs.languages.latestCID)
          : null;

        // Set the fetched profile data
        setProfileData({
          about: aboutData,
          education: educationData,
          experience: experienceData,
          skills:
            skillsData?.skills.map((item: { name: string }) => item.name) || [],
          languages: languagesData,
        });

        setIsLoading(false);
      } catch (error) {
        throw new Error('Error fetching profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [publicKey]);

  // Format the fetched profile data
  const formatProfileData = (): string => {
    const { about, education, experience, skills, languages } = profileData;

    return `
      Name: ${about?.name || 'N/A'}
      Headline: ${about?.headline || 'N/A'}
      About: ${about?.about || 'N/A'}

      Education:
      ${
        education?.educations
          ?.map(
            (edu: any) => `
        School: ${edu.school}, Degree: ${edu.degree}
        Field of Study: ${edu.fieldOfStudy}, Grade: ${edu.grade}
        Start Date: ${edu.startDate}, End Date: ${edu.endDate}
      `,
          )
          .join('\n') || 'N/A'
      }

      Experience:
      ${
        experience?.experiences
          ?.map(
            (exp: any) => `
        Job Title: ${exp.title}, Company: ${exp.company}
        Location: ${exp.location}, Employment Type: ${exp.employmentType}
        Start Date: ${exp.startDate}, End Date: ${exp.endDate}
        Description: ${exp.description}
      `,
          )
          .join('\n') || 'N/A'
      }

      Skills: ${skills?.join(', ') || 'N/A'}

      Languages:
      ${
        languages?.languages
          ?.map(
            (lang: any) => `
        Language: ${lang.language}, Proficiency: ${lang.proficiency}
      `,
          )
          .join('\n') || 'N/A'
      }
    `;
  };

  // Function to handle document generation
  const handleGenerate = () => {
    setIsGenerating(true);
    const profileContent = formatProfileData();

    setTimeout(() => {
      setGeneratedDocument(profileContent);
      setIsGenerating(false);
    }, 2000);
  };

  // Function to export the document as a PDF
  const handleExportPDF = () => {
    const doc = new JsPDF();
    doc.text(generatedDocument, 10, 10);
    doc.save('profile.pdf');
  };

  return publicKey ? (
    <>
      <h1 className="mb-6 text-3xl font-bold text-white">{t('title')}</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-white">{t('job_description')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={t('paste_your_description')}
              className="min-h-[300px] border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <Button
              className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleGenerate}
              disabled={isGenerating || !jobDescription.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  {t('generating')}
                </>
              ) : (
                t('generate_document')
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-white">
              {t('generated_document')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[300px] overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-600 bg-gray-700 p-4 text-white">
              {isLoading
                ? t('loading_profile_data')
                : generatedDocument || t('generated_document_placeholder')}
            </div>
            {generatedDocument && (
              <Button
                className="mt-4 bg-green-600 hover:bg-green-700"
                onClick={handleExportPDF}
              >
                {t('export_pdf')}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  ) : (
    <StellarConnectCard />
  );
}
