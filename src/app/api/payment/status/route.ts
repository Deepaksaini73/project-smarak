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
    const paymentStatus = await prisma.transaction.findFirst({
      where: {
        user: {
          email: session.user.email,
        },
      },
      select: {
        status: true,
      },
    });

    const hasPaid = paymentStatus?.status === 'verified' || 'pending' ? true : false;

    return NextResponse.json(
      {
        status: 'success',
        data: { hasPaid },
        message: 'Payment status fetched successfully!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching amount status:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch payment amount status';

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
