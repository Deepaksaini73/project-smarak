import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'You must be logged in to de-register from events',
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    const userId = user?.id;
    if (!userId) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    const { id: eventId } = params;

    const registration = await prisma.registration.findFirst({
      where: {
        eventId,
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
        teamMembers: true,
      },
    });

    if (!registration) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'You are not registered for this event',
        },
        { status: 400 }
      );
    }

    if (registration.isTeam) {
      const participant = registration.teamMembers.find(member => member.userId === userId);

      if (!participant) {
        return NextResponse.json(
          {
            status: 'error',
            data: null,
            message: 'Participant record not found',
          },
          { status: 404 }
        );
      }

      if (participant.isTeamLead) {
        await prisma.participant.deleteMany({
          where: { registrationId: registration.id },
        });

        await prisma.registration.delete({
          where: { id: registration.id },
        });

        return NextResponse.json(
          {
            status: 'success',
            data: null,
            message: 'Successfully de-registered your team from the event',
          },
          { status: 200 }
        );
      } else {
        await prisma.participant.delete({
          where: { id: participant.id },
        });

        return NextResponse.json(
          {
            status: 'success',
            data: null,
            message: 'Successfully left the team for this event',
          },
          { status: 200 }
        );
      }
    } else {
      await prisma.participant.deleteMany({
        where: { registrationId: registration.id },
      });

      await prisma.registration.delete({
        where: { id: registration.id },
      });

      return NextResponse.json(
        {
          status: 'success',
          data: null,
          message: 'Successfully de-registered from the event',
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Event de-registration error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to de-register from event';

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
