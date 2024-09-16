import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { logger } from '@/libs/Logger';
import { pinata } from '@/libs/Pinata';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const cid = searchParams.get('cid');

    if (!cid) {
      return NextResponse.json({ error: 'CID is required' }, { status: 400 });
    }

    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);

    const file = await response.json();

    return NextResponse.json(file, { status: 200 });
  } catch (error) {
    logger.error(error, 'An error occurred while retrieving Pinata content');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    const uploadData = await pinata.upload.json(data);

    return NextResponse.json({ cid: uploadData.IpfsHash }, { status: 200 });
  } catch (error) {
    logger.error(error, 'An error occurred while creating a Pinata content');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
