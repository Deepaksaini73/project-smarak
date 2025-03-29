import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { eventSchema } from '@/config/events/schema';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    const event = await prisma.events.findUnique({
      where: { id },
      include: {
        rounds: true,
        registrations: {
          include: {
            teamMembers: {
              include: {
                user: true,
              },
            },
            user: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'Event not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      data: { event },
      message: 'Event retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch event';

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

// PUT - Update an event by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const validatedData = eventSchema.parse(body);
    const { rounds, ...eventData } = validatedData;

    const formattedEventData = {
      ...eventData,
      startTime: new Date(eventData.startTime),
      endTime: new Date(eventData.endTime),
    };

    const result = await prisma.$transaction(async tx => {
      await tx.events.update({
        where: { id },
        data: formattedEventData,
      });

      if (rounds && rounds.length > 0) {
        await tx.round.deleteMany({
          where: { eventId: id },
        });

        await tx.round.createMany({
          data: rounds.map(round => ({
            ...round,
            eventId: id,
          })),
        });
      }

      return tx.events.findUnique({
        where: { id },
        include: {
          rounds: true,
        },
      });
    });

    return NextResponse.json({
      status: 'success',
      data: { event: result },
      message: 'Event updated successfully',
    });
  } catch (error) {
    console.error('Error updating event:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update event';

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

// DELETE - Remove an event by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    const eventExists = await prisma.events.findUnique({
      where: { id },
    });

    if (!eventExists) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'Event not found',
        },
        { status: 404 }
      );
    }

    await prisma.events.delete({
      where: { id },
    });

    return NextResponse.json({
      status: 'success',
      data: null,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    const errorMessage =
      error instanceof Error && error.message.includes('foreign key constraint')
        ? 'Cannot delete event because it has existing registrations'
        : 'Failed to delete event';

    const statusCode =
      error instanceof Error && error.message.includes('foreign key constraint') ? 409 : 500;

    return NextResponse.json(
      {
        status: 'error',
        data: null,
        message: errorMessage,
      },
      { status: statusCode }
    );
  }
}
