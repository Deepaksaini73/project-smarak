import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const { amount, paymentScreenshot } = await req.json();

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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'User not registered!',
        },
        { status: 404 }
      );
    }

    const existingPayment = await prisma.transaction.findFirst({
      where: { userId: user.id, status: 'pending' },
    });

    if (existingPayment) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'Payment already initiated!',
        },
        { status: 400 }
      );
    }

    const payment = await prisma.transaction.create({
      data: {
        userId: user.id,
        amount,
        paymentScreenshot,
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        data: { payment },
        message: 'Payment verification initiated successfully!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating payment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create payment';

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
