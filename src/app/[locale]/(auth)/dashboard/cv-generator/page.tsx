'use client';

import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { Clipboard, Download, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils';
import { useEffect, useState } from 'react';

import { StellarConnectCard } from '@/app/[locale]/(auth)/dashboard/_components/StellarConnectCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/hooks/useWallet';
import { fetchFromIPFS } from '@/libs/Pinata';
import { fetchLatestSectionCIDs } from '@/libs/Stellar';

interface Education {
  school: string;
  startDate: string;
  endDate: string;
  degree: string;
  fieldOfStudy: string;
  grade: string;
  activities: string;
  description: string;
}

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
  employmentType: string;
}

interface Language {
  language: string;
  proficiency: string;
}

interface ProfileContent {
  about: {
    name: string;
    headline: string;
    about: string;
    address: string;
    email: string;
    phoneNumber: string;
  };
  educations: Education[];
  experiences: Experience[];
  skills: string[];
  languages: Language[];
}

const replaceWhitespaceWithUnderscore = (str: string) => {
  return str.replace(/\s+/g, '_');
};

const loadFile = (
  url: string,
  callback: (error: Error | null, content: string | null) => void,
) => {
  PizZipUtils.getBinaryContent(url, (error, content) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, content);
    }
  });
};

const generateDocument = (profileContent: ProfileContent) => {
  loadFile('/api/document', (error, content) => {
    if (error) {
      return;
    }

    const zip = new PizZip(content as string);
    const doc = new Docxtemplater(zip, {
      linebreaks: true,
      paragraphLoop: true,
    });

    doc.render({
      name: profileContent.about.name,
      headline: profileContent.about.headline,
      address: profileContent.about.address,
      email_address: profileContent.about.email,
      phone_number: profileContent.about.phoneNumber,
      about: profileContent.about.about,
      experiences: profileContent.experiences,
      educations: profileContent.educations,
      skills: profileContent.skills,
      languages: profileContent.languages,
    });

    const blob = doc.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    saveAs(
      blob,
      `${replaceWhitespaceWithUnderscore(profileContent.about.name)}_CV.docx`,
    );
  });
};

export default function CVGeneratorPage() {
  const router = useRouter();
  const t = useTranslations('CVGenerator');
  const { publicKey } = useWallet();
  const { toast } = useToast();

  const [jobDescription, setJobDescription] = useState('');
  const [generatedDocument, setGeneratedDocument] = useState<
    ProfileContent | undefined
  >();
  const [isGenerating, setIsGenerating] = useState(false);
  const [profileData, setProfileData] = useState<ProfileContent>({
    about: {
      name: '',
      headline: '',
      about: '',
      address: '',
      email: '',
      phoneNumber: '',
    },
    educations: [],
    experiences: [],
    skills: [],
    languages: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!publicKey) return;

      try {
        setIsLoading(true);

        const latestCIDs = await fetchLatestSectionCIDs(publicKey);

        if (latestCIDs.about?.latestVersion === 0) {
          router.push('/dashboard/profile/about');
          return;
        }
        if (latestCIDs.education?.latestVersion === 0) {
          router.push('/dashboard/profile/education');
          return;
        }
        if (latestCIDs.experience?.latestVersion === 0) {
          router.push('/dashboard/profile/experience');
          return;
        }
        if (latestCIDs.skills?.latestVersion === 0) {
          router.push('/dashboard/profile/skills');
          return;
        }
        if (latestCIDs.languages?.latestVersion === 0) {
          router.push('/dashboard/profile/languages');
          return;
        }

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

        setProfileData({
          about: aboutData,
          educations: educationData.educations,
          experiences: experienceData.experiences,
          skills:
            skillsData?.skills.map((item: { name: string }) => item.name) || [],
          languages: languagesData.languages,
        });

        setIsLoading(false);
      } catch (error) {
        throw new Error('Error fetching profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [publicKey, router]);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);

      await fetch('/api/ai', {
        method: 'POST',
        body: JSON.stringify({
          userProfile: profileData,
          jobDescription,
        }),
      }).then(async (response) => {
        const content = await response.json();
        setGeneratedDocument(content);
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedDocument) {
      generateDocument(generatedDocument);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJobDescription(text);
      toast({
        title: t('paste_toast_title'),
        description: t('paste_toast_description'),
        duration: 3000,
        action: (
          <ToastAction
            altText={t('paste_toast_undo')}
            onClick={() => setJobDescription('')}
          >
            {t('paste_toast_undo')}
          </ToastAction>
        ),
      });
    } catch (err) {
      toast({
        title: t('failed_paste_toast_title'),
        description: t('failed_paste_toast_description'),
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  return publicKey ? (
    <>
      <h1 className="mb-6 text-3xl font-bold text-white">{t('title')}</h1>
      <Card className="border-gray-700 bg-gray-800">
        <CardContent className="space-y-4 pt-6">
          <Textarea
            placeholder={t('paste_your_description')}
            className="min-h-[200px] border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={20}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              className="h-full bg-gray-700 text-white hover:bg-gray-600"
              onClick={handlePasteFromClipboard}
              title={t('paste_from_clipboard')}
            >
              <Clipboard className="mr-2 size-4" />
              {t('paste_from_clipboard')}
            </Button>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleGenerate}
              disabled={isGenerating || !jobDescription.trim() || isLoading}
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
            {generatedDocument && (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleDownload}
              >
                <Download className="mr-2 size-4" />
                {t('export_pdf')}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  ) : (
    <StellarConnectCard />
  );
}
