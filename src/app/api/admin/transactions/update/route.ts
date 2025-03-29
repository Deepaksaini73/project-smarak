import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transactionId, status, notes } = body;

    if (!transactionId || !status || (status === 'rejected' && !notes)) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: { user: true },
    });

    if (!transaction) {
      return NextResponse.json(
        {
          status: 'error',
          data: null,
          message: 'Transaction not found',
        },
        { status: 404 }
      );
    }

    const updatedTransaction = await prisma.$transaction(async tx => {
      const txResult = await tx.transaction.update({
        where: { id: transactionId },
        data: {
          status,
          notes: notes || null,
        },
      });

      if (status === 'verified') {
        await tx.user.update({
          where: { id: transaction.userId },
          data: { hasPaid: true },
        });
      }

      return txResult;
    });

    return NextResponse.json(
      {
        status: 'success',
        data: { transaction: updatedTransaction },
        message: `Transaction ${status === 'verified' ? 'verified' : 'rejected'} successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Transaction update error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update transaction';

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
