'use client';
import React, { Suspense, useEffect } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { ERR_DETAILS } from '@/config/payment/constants';

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const details = searchParams.get('details');
  const isReqValid = searchParams.get('error');

  useEffect(() => {
    if (!isReqValid) {
      router.push('/');
    }
  }, [isReqValid, router]);

  if (!isReqValid) {
    return null;
  }

  return (
    <div className="bg-reg min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center max-w-lg">
        <h1 className="text-2xl font-bold font-Spirits">Payment Failed</h1>
        {ERR_DETAILS.find(err => err.id === details) && (
          <p className="text-xl font-Spirits text-center mt-4">
            {ERR_DETAILS.find(err => err.id === details)?.message}
          </p>
        )}
        <Link
          className="flex items-center px-5 py-3 text-white font-semibold 
            bg-[#003955]
          rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105 font-Spirits mt-10"
          href="/"
        >
          Go To Home
        </Link>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentFailedContent />
    </Suspense>
  );
}
