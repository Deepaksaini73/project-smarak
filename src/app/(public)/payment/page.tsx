'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PaymentDetails } from '@/components/payment/PaymentDetails';
import { PaymentInstructions } from '@/components/payment/PaymentInstructions';
import { ScreenshotUploader } from '@/components/payment/ScreenshotUploader';
import { usePayment } from '@/hooks/usePayment';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { PaymentWillStartSoon } from '@/components/payment/PaymentSoon';

export default function Page() {
  const [userVerified, setUserVerified] = useState(false);
  const router = useRouter();
  const { makeRequest, isLoading: usrLoading } = useApi();

  const {
    isLoading,
    isInitialLoading,
    paymentAmount,
    regularPrice,
    screenshotUrl,
    setScreenshotUrl,
    initiatePayment,
    hasPaid,
    paymentStatus,
  } = usePayment();

  const getUser = async () => {
    try {
      const result = await makeRequest('GET', '/user');
      if (result.status === 'error') {
        window.location.href = '/register';
        return false;
      }
      setUserVerified(true);
      return true;
    } catch (error) {
      window.location.href = '/register';
      return false;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!userVerified) return;

    if (hasPaid) {
      if (paymentStatus === 'verified') {
        toast.success('Payment verified');
      } else if (paymentStatus === 'pending') {
        toast.error('Payment verification pending');
      } else if (paymentStatus === 'rejected') {
        toast.error('Payment rejected');
      }

      if (paymentStatus !== 'rejected') {
        router.push('/profile');
      }
    }
  }, [hasPaid, paymentStatus, router, userVerified]);

  if (isInitialLoading || isLoading || usrLoading || !userVerified) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-[#554400]" />
          <p className="text-gray-600 font-outfit text-lg">Loading payment details...</p>
        </div>
      </div>
    );
  }

  // return (
  //   <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
  //     <PaymentWillStartSoon />
  //   </div>
  // );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center relative">
          <h2 className="text-4xl font-bold tracking-tight text-[#554400] font-outfit mb-2">
            Registration Payment
          </h2>
          <div className="mx-auto w-28 h-1.5 bg-[#554400] mt-1 mb-6"></div>
          <p className="text-gray-600 font-outfit">
            Complete your registration by making the payment
          </p>
        </div>

        <Card className="w-full bg-[#fefbed] p-8 rounded-lg shadow-md border-0">
          <CardContent className="p-0 space-y-8">
            <PaymentDetails paymentAmount={paymentAmount} regularPrice={regularPrice} />

            <div className="border-t border-b border-gray-100 py-6">
              <PaymentInstructions paymentAmount={paymentAmount} />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 font-outfit">
                Payment Confirmation
              </h3>
              <ScreenshotUploader
                screenshotUrl={screenshotUrl}
                setScreenshotUrl={setScreenshotUrl}
              />
            </div>

            <div className="pt-4">
              <Button
                className="w-full py-6 bg-[#554400] hover:bg-[#443700] text-white font-medium rounded-md transition-all duration-200 font-outfit shadow-sm"
                size="lg"
                onClick={initiatePayment}
                disabled={!screenshotUrl}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  'Submit Payment'
                )}
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4 font-outfit">
                Your payment will be verified by our team
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
