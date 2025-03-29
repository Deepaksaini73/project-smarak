'use server';
import { prisma } from '@/lib/prisma';

type PaymentDetails = {
  userId: string;
  amount: number;
  transactionId: string;
  merchantTransactionId: string;
  merchantId: string;
  status: string;
};

export const createPaymentRecord = async (details: PaymentDetails) => {
  try {
    const payment = await prisma.transaction.create({
      data: {
        userId: details.userId,
        amount: details.amount,
        transactionId: details.transactionId,
        merchantTransactionId: details.merchantTransactionId,
        merchantId: details.merchantId,
        status: details.status,
      },
    });
    await prisma.user.update({
      where: {
        id: details.userId,
      },
      data: {
        hasPaid: true,
      },
    });

    return payment;
  } catch (e) {
    console.error('Error creating payment record:', e);
    return null;
  }
};

export const getUserPaymentStatus = async (email: string) => {
  try {
    return await prisma.transaction.findFirst({
      where: {
        user: {
          email: email,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching payment status:', error);
    return null;
  }
};
