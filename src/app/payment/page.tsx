'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useApi } from '@/hooks/use-api';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Loader2, Upload } from 'lucide-react';
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { isLoading, makeRequest } = useApi();
  const [user, setUser] = useState({});
  const [paymentAmount, setPaymentAmount] = useState<number>(599);
  const regularPrice = 699;
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const initiatePayment = async () => {
    try {
      if (!user) {
        toast.error('User not found');
        return;
      }

      if (!screenshotUrl) {
        toast.error('Please upload payment screenshot');
        return;
      }

      const response = await makeRequest('POST', '/payment', {
        amount: paymentAmount,
        paymentScreenshot: screenshotUrl,
      });
      if (response.status === 'error') return;
      router.push('/profile');
    } catch (error) {
      toast.error('Payment initiation failed');
      console.error(error);
    }
  };

  const getMe = async () => {
    const response = await makeRequest('GET', '/user/me');
    if (response.status === 'error') {
      toast.error('Failed to fetch user details');
      return;
    }
    setUser(response.data.data.user);
  };

  const getPaymentAmount = async () => {
    const response = await makeRequest('GET', '/payment/amount');
    if (response.status === 'error') {
      toast.error('Failed to fetch payment amount');
      return;
    }

    if (response.data.data.paymentAmount) {
      setPaymentAmount(response.data.data.paymentAmount);
    }
  };

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      setScreenshotUrl(url);
      toast.success('Screenshot uploaded successfully');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload screenshot');
    } finally {
      setIsUploading(false);
    }
  }

  useEffect(() => {
    getMe();
    getPaymentAmount();
  }, []);

  if (isLoading) {
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
          <div className="space-y-4">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">Payment Details</h2>
              <Separator className="flex-1 ml-3" />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Early Bird Offer</h3>
                  <p className="text-sm text-gray-600">Limited time discount</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">₹{paymentAmount}</p>
                  <p className="text-sm line-through text-gray-500">₹{regularPrice}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Payment Instructions</h3>

              <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-lg border border-gray-200">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src="/qr-code-demo.png"
                    alt="Payment QR Code"
                    className="object-contain"
                    width={128}
                    height={128}
                  />
                </div>

                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                  <li>
                    Scan QR code or pay using UPI to:{' '}
                    <span className="font-medium">smarak@upi</span>
                  </li>
                  <li>
                    Amount to pay:{' '}
                    <span className="font-medium text-green-600">₹{paymentAmount}</span>
                  </li>
                  <li>Take a screenshot of your payment confirmation</li>
                  <li>Upload the screenshot below</li>
                </ol>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Upload Payment Screenshot</label>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 w-full sm:w-auto">
                    <div className="flex flex-col items-center space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        id="payment-screenshot-upload"
                        onChange={handleFileUpload}
                        className="hidden"
                      />

                      {!screenshotUrl ? (
                        <>
                          <Upload className="h-8 w-8 text-gray-500" />
                          <p className="text-sm text-gray-500">Upload payment proof</p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              document.getElementById('payment-screenshot-upload')?.click()
                            }
                            disabled={isUploading}
                          >
                            {isUploading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              'Select Image'
                            )}
                          </Button>
                        </>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            document.getElementById('payment-screenshot-upload')?.click()
                          }
                          disabled={isUploading}
                        >
                          {isUploading ? 'Uploading...' : 'Change Image'}
                        </Button>
                      )}
                    </div>
                  </div>

                  {screenshotUrl && (
                    <div className="relative w-full sm:w-48 h-40 rounded-md overflow-hidden border border-gray-200">
                      <Image
                        src={screenshotUrl}
                        alt="Payment Screenshot"
                        className="object-cover"
                        fill
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={initiatePayment}
            disabled={isUploading || !screenshotUrl}
          >
            {isUploading ? (
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
