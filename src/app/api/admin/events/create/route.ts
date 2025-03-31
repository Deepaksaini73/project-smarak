import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { eventsArraySchema } from '@/config/events/schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedEvents = eventsArraySchema.parse(body);

    const result = await prisma.$transaction(async tx => {
      const eventsData = validatedEvents.map(({ rounds, ...eventDetails }) => ({
        ...eventDetails,
        startTime: new Date(eventDetails.startTime),
        endTime: new Date(eventDetails.endTime),
      }));

      await tx.events.createMany({
        data: eventsData,
        skipDuplicates: true,
      });

      const createdEvents = await tx.events.findMany({
        where: {
          OR: eventsData.map(event => ({
            name: event.name,
            startTime: event.startTime,
            endTime: event.endTime,
            venue: event.venue,
          })),
        },
        orderBy: { createdAt: 'desc' },
        take: eventsData.length,
      });

      const roundsToCreate: {
        eventId: string;
        name: string;
        description: string;
        duration: number;
        qualifyCount?: number | null | undefined;
        criteria?: string | null | undefined;
      }[] = [];
      validatedEvents.forEach((eventData, index) => {
        if (eventData.rounds && eventData.rounds.length > 0) {
          const eventId = createdEvents[index]?.id;
          if (eventId) {
            eventData.rounds.forEach(round => {
              roundsToCreate.push({
                ...round,
                eventId,
              });
            });
          }
        }
      });

      if (roundsToCreate.length > 0) {
        await tx.round.createMany({
          data: roundsToCreate,
          skipDuplicates: true,
        });
      }

      const completeEvents = await tx.events.findMany({
        where: {
          id: {
            in: createdEvents.map(e => e.id),
          },
        },
        include: {
          rounds: true,
        },
      });

      return completeEvents;
    });

    return NextResponse.json(
      {
        status: 'success',
        data: { events: result },
        message: 'Events created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Event creation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create events';

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
