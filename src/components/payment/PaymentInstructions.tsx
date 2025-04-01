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

      <div className="bg-white p-5 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-col gap-6">
          {/* QR Code Section */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative size-96 flex-shrink-0 rounded-lg p-1 ">
              <Image
                src={QR_IMAGE}
                alt="Payment QR Code"
                className="object-contain"
                fill
                priority
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Scan to pay</p>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="flex-1">
            <h4 className="font-medium text-gray-700 mb-3">How to pay</h4>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2 font-sans ml-1">
              <li>
                Scan QR code or pay using UPI ID:
                <span className="font-medium text-gray-800 ml-1 bg-gray-50 py-0.5 px-2 rounded">
                  85002429435@sbi
                </span>
              </li>
              <li>
                Amount to pay:
                <span className="font-medium text-green-600 ml-1">
                  ₹{paymentAmount.toLocaleString('en-IN')}
                </span>
              </li>
              <li>Take a screenshot of your payment confirmation</li>
              <li>Upload the screenshot below</li>
            </ol>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <p className="text-xs text-gray-500 ml-2">Make sure to include correct amount.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
