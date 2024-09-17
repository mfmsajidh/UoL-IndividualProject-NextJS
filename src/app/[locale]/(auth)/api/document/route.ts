import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export const GET = async () => {
  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      'assets',
      'templates',
      'cv.docx',
    );

    const fileContent = fs.readFileSync(filePath);

    return new NextResponse(fileContent, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="cv.docx"',
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to load the template file' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
};
