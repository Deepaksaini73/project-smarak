import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const paymentCount = await prisma.transaction.count({
      where: {
        status: 'verified',
      },
    });

    const paymentAmount = paymentCount > 100 ? 749 : 599;

    return NextResponse.json(
      {
        status: 'success',
        data: { paymentAmount },
        message: 'Payment amount fetched successfully!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching amount data:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to fetch payment amount data';

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
