import React from 'react';
import Image from 'next/image';
import { QR_IMAGE } from '@/config/payment/constants';

interface PaymentInstructionsProps {
  paymentAmount: number;
}

export function PaymentInstructions({ paymentAmount }: PaymentInstructionsProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium font-outfit">Payment Instructions</h3>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-lg border border-gray-200">
        <div className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={QR_IMAGE}
            alt="Payment QR Code"
            className="object-contain"
            width={128}
            height={128}
          />
        </div>

        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1 font-sans">
          <li>
            Scan QR code or pay using UPI to: <span className="font-medium">smarak@upi</span>
          </li>
          <li>
            Amount to pay: <span className="font-medium text-green-600">₹{paymentAmount}</span>
          </li>
          <li>Take a screenshot of your payment confirmation</li>
          <li>Upload the screenshot below</li>
        </ol>
      </div>
    </div>
  );
}
