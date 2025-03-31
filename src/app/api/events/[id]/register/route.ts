import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

import { nanoid } from 'nanoid';
import { auth } from '@/auth';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'You must be logged in to register for events',
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        transactions: {
          select: {
            status: true,
          },
        },
      },
    });

    const userId = user?.id;
    if (!userId) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'Complete your registeration to register for events',
        },
        { status: 404 }
      );
    }

    const paymentStatus = user?.transactions[0]?.status;
    const hasPaid = paymentStatus === 'verified';
    if (!hasPaid) {
      const message =
        paymentStatus === 'pending'
          ? 'Payment verification is still pending'
          : 'Payment rejected check your profile';
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message,
        },
        { status: 403 }
      );
    }
    const { id: eventId } = await params;
    const body = await req.json();
    const { isTeamRegistration, teamName } = body;

    const event = await prisma.events.findUnique({
      where: { id: eventId },
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

    const existingRegistration = await prisma.registration.findFirst({
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
    });

    if (existingRegistration) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'You are already registered for this event',
        },
        { status: 400 }
      );
    }

    if (!isTeamRegistration || !event.isTeamEvent) {
      const registration = await prisma.registration.create({
        data: {
          eventId,
          userId,
          isTeam: false,
        },
      });

      await prisma.participant.create({
        data: {
          userId,
          registrationId: registration.id,
          isTeamLead: false,
        },
      });

      return NextResponse.json(
        {
          status: 'success',
          data: { registration },
          message: 'Successfully registered for event',
        },
        { status: 201 }
      );
    }

    if (isTeamRegistration && event.isTeamEvent) {
      if (!teamName) {
        return NextResponse.json(
          {
            status: 'error',
            data: null,
            message: 'Team name is required for team registration',
          },
          { status: 400 }
        );
      }

      const teamCode = nanoid(8);

      const registration = await prisma.registration.create({
        data: {
          eventId,
          userId,
          isTeam: true,
          teamName,
          teamCode,
        },
      });

      await prisma.participant.create({
        data: {
          userId,
          registrationId: registration.id,
          isTeamLead: true,
        },
      });

      return NextResponse.json(
        {
          status: 'success',
          data: { registration, teamCode },
          message: 'Team created successfully. Share the team code with your teammates to join.',
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        status: 'error',
        data: null,
        message: 'Invalid registration request',
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Event registration error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to register for event';

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
