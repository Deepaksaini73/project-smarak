import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'User not registered!',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        data: { user },
        message: 'User details retrieved successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user data';

    return NextResponse.json(
      {
        status: 'error',
        data: null,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
