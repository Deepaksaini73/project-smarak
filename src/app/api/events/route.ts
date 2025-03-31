import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const eventType = url.searchParams.get('eventType');
    const isTeamEvent = url.searchParams.get('isTeamEvent');
    const searchQuery = url.searchParams.get('search');

    const filter: any = {};

    if (eventType) {
      filter.eventType = eventType;
    }

    if (isTeamEvent !== null) {
      filter.isTeamEvent = isTeamEvent === 'true';
    }

    if (searchQuery) {
      filter.OR = [
        { name: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
        { venue: { contains: searchQuery, mode: 'insensitive' } },
      ];
    }

    const events = await prisma.events.findMany({
      where: filter,
      include: {
        rounds: true,
        _count: {
          select: {
            registrations: true,
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    return NextResponse.json({
      status: 'success',
      data: { events },
      message: 'Events retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch events';

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
