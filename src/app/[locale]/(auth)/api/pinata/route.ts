import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { SignedUrlOptions } from 'pinata';

import { logger } from '@/libs/Logger';
import { pinata } from '@/libs/Pinata';

const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const cid = searchParams.get('cid');

    if (!cid) {
      return NextResponse.json({ error: 'CID is required' }, { status: 400 });
    }

    const url = await pinata.gateways.createSignedURL(<SignedUrlOptions>{
      cid,
      expires: 3600, // URL expires in 1 hour
    });

    return NextResponse.json(url, { status: 200 });
  } catch (error) {
    logger.error(error, 'An error occurred while retrieving a Pinata content');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
};

const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    const uploadData = await pinata.upload.json(data);

    return NextResponse.json(uploadData, { status: 200 });
  } catch (error) {
    logger.error(error, 'An error occurred while creating a Pinata content');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
};

export { GET, POST };
