'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

import { getUserPaymentStatus } from '@/actions/payments';

export default function PaymentStatusPage() {
  const [paymentStatus, setPaymentStatus] = useState({
    hasPaid: false,
    loading: true,
  });
  const [loading, setLoading] = useState(true);
  const session = useSession();
  const user = session?.data?.user;

  useEffect(() => {
    const checkPaymentStatus = async () => {
      setLoading(true);
      if (!user) return;
      try {
        const response = await getUserPaymentStatus(user?.email);
        if (response?.status === 'error') {
          throw new Error('Failed to fetch payment status');
        }
        const hasPaid = response?.status === 'COMPLETED';
        setPaymentStatus({
          hasPaid,
          loading: false,
        });
      } catch (error: unknown) {
        toast.error('Failed to fetch payment status. Please try again later.');
        console.error(error);
        setPaymentStatus({
          hasPaid: false,
          loading: false,
        });
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [user?.id]);

  return (
    <div className="bg-reg min-h-screen flex items-center justify-center flex-col">
      {loading || paymentStatus.loading ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold font-Spirits">Loading...</h1>
          <p className="mt-4 font-Spirits">Please wait while we fetch your details.</p>
        </div>
      ) : paymentStatus.hasPaid ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-600 font-Spirits">Payment Successful!</h1>
          <p className="mt-4 font-Spirits">Thank you for your payment.</p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold font-Spirits">Payment Details Not Found</h1>
          <p className="mt-4 font-Spirits">Please try again later.</p>
        </div>
      )}
      {!loading && !paymentStatus.loading && <Link href="/">Go To Home</Link>}
    </div>
  );
}
