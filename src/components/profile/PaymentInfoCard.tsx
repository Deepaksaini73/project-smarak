import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import { User } from '../../config/profile/types';

type PaymentInfoCardProps = {
  user: User;
};

export function PaymentInfoCard({ user }: PaymentInfoCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 pb-2 border-b flex items-center">
        <CreditCard className="h-5 w-5 mr-2 text-blue-500" /> Payment Information
      </h3>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium flex items-center">
            <CreditCard className="h-4 w-4 mr-1" /> Payment Status:
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${user?.hasPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
          >
            {user?.hasPaid ? 'Paid' : 'Pending'}
          </span>
        </div>

        {!user?.hasPaid && (
          <Link
            href="/payment"
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            <CreditCard className="h-4 w-4 mr-2" /> Complete Payment
          </Link>
        )}
      </div>
    </div>
  );
}
