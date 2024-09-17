'use client';

import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import React from 'react';

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

const profileContent: ProfileContent = {
  about: {
    name: 'Sajidh',
    headline: 'Head',
    about: 'Abpurasdkbhajksdhka',
    address: 'adddress',
    email: 'email@email.com',
    phoneNumber: 'phone',
  },
  educations: [
    {
      school: 'Zahirq',
      startDate: '2024-09-05',
      endDate: '2024-09-05',
      degree: 'asd',
      fieldOfStudy: 'asdsad',
      grade: '',
      activities: 'asdasd',
      description: 'asdasd',
    },
    {
      school: 'dd',
      startDate: '2024-08-29',
      endDate: '2024-09-04',
      degree: 'asd',
      fieldOfStudy: 'asd',
      grade: '',
      activities: '',
      description: '',
    },
  ],
  experiences: [
    {
      title: 'asd',
      company: 'asd',
      startDate: '2024-09-12',
      endDate: '',
      description: '',
      location: 'asdasd',
      employmentType: 'part-time',
    },
  ],
  skills: ['wait', 'brother', 'ui/ux backend', 'ai'],
  languages: [
    {
      language: 'English',
      proficiency: 'native',
    },
  ],
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

const generateDocument = () => {
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
      address: profileContent.about.address,
      email_address: profileContent.about.email,
      phone_number: profileContent.about.phoneNumber,
      educations: profileContent.educations,
      experiences: profileContent.experiences,
      skills: profileContent.skills,
      languages: profileContent.languages,
    });

    const blob = doc.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    saveAs(blob, 'output.docx');
  });
};

const Home: React.FC = () => {
  return (
    <main>
      <div>
        <div>
          <h1> Test Docxtemplater</h1>
        </div>
        <button type="button" onClick={generateDocument}>
          Generate document
        </button>
        <p>Click the button above to generate a document using Next.js</p>
        <p>
          You can edit the data in your code in this example. In your app, the
          data would come from your database for example.
        </p>
      </div>
    </main>
  );
};

export default Home;
