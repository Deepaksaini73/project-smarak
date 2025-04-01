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
        <h2 className="text-lg font-semibold font-outfit">Payment Details</h2>
        <Separator className="flex-1 ml-3" />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex justify-between items-center font-sans">
          <div>
            <h3 className="font-medium font-outfit">Early Bird Offer</h3>
            <p className="text-sm text-gray-600 font-outfit">Limited time discount</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-green-600">₹{paymentAmount}</p>
            <p className="text-sm line-through text-gray-500">₹{regularPrice}</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
        <p className="text-lg text-yellow-700 font-medium font-outfit">
          <strong>Special Offer for Hackathon Participants!</strong>
        </p>
        <p className="text-lg text-yellow-700 mt-1 font-outfit">
          Pay only <span className="font-bold">₹399</span>{' '}
          <span className="line-through text-yellow-600">₹499</span> for
          <span className="font-bold"> exclusive</span> participation in the{' '}
          <strong>Sahayatri Hackathon.</strong>
        </p>
        <p className="text-sm text-yellow-700 mt-1 font-outfit">
          (This special price is only for those participating in the Sahayatri Hackathon and does
          not include access to any other events)
        </p>
      </div>
    </div>
  );
}
