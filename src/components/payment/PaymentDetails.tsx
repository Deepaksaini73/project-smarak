import React from 'react';
import { Separator } from '@/components/ui/separator';

interface PaymentDetailsProps {
  paymentAmount: number;
  regularPrice: number;
}

export function PaymentDetails({ paymentAmount, regularPrice }: PaymentDetailsProps) {
  return (
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
    </div>
  );
}
