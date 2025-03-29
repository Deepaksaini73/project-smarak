import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const eventId = url.searchParams.get('eventId');
    const status = url.searchParams.get('status');

    const filter: any = {};
    if (eventId) filter.eventId = eventId;
    if (status) filter.status = status;

    const registrations = await prisma.registration.findMany({
      where: filter,
      include: {
        event: {
          select: {
            id: true,
            name: true,
            eventType: true,
            isTeamEvent: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            institute: true,
            hasPaid: true,
          },
        },
        teamMembers: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                institute: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        data: registrations,
        message: 'Registrations fetched successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching registrations:', error);
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
