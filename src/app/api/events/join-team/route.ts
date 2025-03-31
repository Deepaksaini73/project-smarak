import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session?.user?.email) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'You must be logged in to join teams',
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
          message: 'Complete your registration to join teams',
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

    const body = await req.json();

    const { teamCode, eventId } = body;

    if (!teamCode) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'Team code is required',
        },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.findUnique({
      where: { teamCode },
      include: {
        event: true,
        teamMembers: true,
      },
    });

    if (!registration) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'Invalid team code',
        },
        { status: 404 }
      );
    }

    if (registration.event.id !== eventId) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'Invalid team code',
        },
        { status: 404 }
      );
    }

    if (
      registration.event.maxParticipants &&
      registration.teamMembers.length >= registration.event.maxParticipants
    ) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'This team is already full',
        },
        { status: 400 }
      );
    }

    const existingParticipation = await prisma.participant.findFirst({
      where: {
        userId,
        registration: {
          eventId: registration.eventId,
        },
      },
    });

    if (existingParticipation) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'You are already registered for this event',
        },
        { status: 400 }
      );
    }

    const participant = await prisma.participant.create({
      data: {
        userId,
        registrationId: registration.id,
        isTeamLead: false,
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        data: { participant },
        message: `Successfully joined team ${registration.teamName}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Join team error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to join team';

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
