// @ts-nocheck
/* eslint-disable */
'use client';

import React from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
let PizZipUtils = null;
if (typeof window !== 'undefined') {
  import('pizzip/utils/index.js').then(function (r) {
    PizZipUtils = r;
  });
}

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

const profileContent = {
  "about": {
    "name": "Sajidh",
    "headline": "Head",
    "about": "Abpurasdkbhajksdhka",
    "address": "adddress",
    "email": "email@email.com",
    "phoneNumber": "phone"
  },
  "educations": [
    {
      "school": "Zahirq",
      "startDate": "2024-09-05",
      "endDate": "2024-09-05",
      "degree": "asd",
      "fieldOfStudy": "asdsad",
      "grade": "",
      "activities": "asdasd",
      "description": "asdasd"
    },
    {
      "school": "dd",
      "startDate": "2024-08-29",
      "endDate": "2024-09-04",
      "degree": "asd",
      "fieldOfStudy": "asd",
      "grade": "",
      "activities": "",
      "description": ""
    }
  ],
  "experiences": [
    {
      "title": "asd",
      "company": "asd",
      "startDate": "2024-09-12",
      "endDate": "",
      "description": "",
      "location": "asdasd",
      "employmentType": "part-time"
    }
  ],
  "skills": [
    "wait",
    "brother",
    "ui/ux backend",
    "ai"
  ],
  "languages": [
    {
      "language": "English",
      "proficiency": "native"
    }
  ]
}

const generateDocument = () => {
  loadFile('/api/document', function (error, content) {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
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

export default function Home() {
  return (
    <main>
      <div>
        <div>
          <h1> Test Docxtemplater</h1>
        </div>
        <button onClick={generateDocument}>Generate document</button>
        <p>Click the button above to generate a document using NextJS</p>
        <p>
          You can edit the data in your code in this example. In your app, the
          data would come from your database for example.
        </p>
      </div>
    </main>
  );
}
