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
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render({
      name: 'John',
      address: 'Doe',
      email_address: '0652455478',
      phone_number: 'New Website',
    });
    const blob = doc.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    // Output the document using Data-URI
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
