import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const registration = await prisma.registration.findUnique({
      where: { id },
    });

    if (!registration) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'Registration not found',
        },
        { status: 404 }
      );
    }

    // Delete associated team members first if it's a team registration
    if (registration.isTeam) {
      await prisma.participant.deleteMany({
        where: { registrationId: id },
      });
    }

    // Delete the registration
    await prisma.registration.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        status: 'success',
        data: null,
        message: 'Registration deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting registration:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete registration';

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
