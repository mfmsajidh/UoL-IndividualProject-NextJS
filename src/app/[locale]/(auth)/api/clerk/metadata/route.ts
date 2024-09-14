import { clerkClient } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { logger } from '@/libs/Logger';

interface RequestBody {
  userId: string;
  metadataKey: string;
  metadataValue: string | number;
}

const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const userId = searchParams.get('userId');
    const metadataKey = searchParams.get('metadataKey');

    if (!userId || !metadataKey) {
      return NextResponse.json(
        { error: 'userId and metadataKey are required' },
        { status: 400 },
      );
    }

    const user = await clerkClient.users.getUser(userId);

    logger.info(user, 'user');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const metadataValue = user.privateMetadata?.[metadataKey];

    if (!metadataValue) {
      return NextResponse.json(
        { error: `Metadata key "${metadataKey}" not found` },
        { status: 404 },
      );
    }

    return NextResponse.json({ metadataValue }, { status: 200 });
  } catch (error) {
    logger.error(error, 'Error fetching metadata');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
};

const POST = async (request: NextRequest) => {
  try {
    const { userId, metadataKey, metadataValue }: RequestBody =
      await request.json();

    if (!userId || !metadataKey || !metadataValue) {
      return NextResponse.json(
        { error: 'userId, metadataKey and metadataValue are required' },
        { status: 400 },
      );
    }

    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        [metadataKey]: metadataValue,
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('Error updating metadata:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
};

export { GET, POST };
