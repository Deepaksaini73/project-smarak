import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'You must be logged in to view your registrations',
        },
        { status: 200 }
      );
    }

    const userId = session.user.id;

    const registrations = await prisma.registration.findMany({
      where: {
        OR: [
          { userId },
          {
            teamMembers: {
              some: {
                userId,
              },
            },
          },
        ],
      },
      include: {
        event: true,
        teamMembers: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        data: { registrations },
        message: 'Successfully retrieved user registrations',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch registrations';

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
