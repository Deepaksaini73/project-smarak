'use client';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentDetails } from '@/components/payment/PaymentDetails';
import { PaymentInstructions } from '@/components/payment/PaymentInstructions';
import { ScreenshotUploader } from '@/components/payment/ScreenshotUploader';
import { usePayment } from '@/hooks/usePayment';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Page() {
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
  const router = useRouter();

  useEffect(() => {
    if (hasPaid) {
      if (paymentStatus === 'verified') {
        toast.success('Payment verified');
      } else if (paymentStatus === 'pending') {
        toast.error('Payment verification pending');
      } else if (paymentStatus === 'rejected') {
        toast.error('Payment rejected');
      }
      router.push('/profile');
    }
  }, [isLoading]);

  if (isInitialLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-xl font-bold text-center">Registration Payment</CardTitle>
          <CardDescription className="text-center">
            Complete your registration by paying the fee
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <PaymentDetails paymentAmount={paymentAmount} regularPrice={regularPrice} />

          <PaymentInstructions paymentAmount={paymentAmount} />

          <ScreenshotUploader screenshotUrl={screenshotUrl} setScreenshotUrl={setScreenshotUrl} />

          <Button className="w-full" size="lg" onClick={initiatePayment} disabled={!screenshotUrl}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Submit Payment'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
