import { Award, CreditCard } from 'lucide-react';
import { User } from '../../config/profile/types';

type ProfileSummaryProps = {
  user: User;
  hasPaid: boolean;
  paymentStatus: string;
};

export function ProfileSummary({ user, hasPaid, paymentStatus }: ProfileSummaryProps) {
  const isPaymentComplete = paymentStatus === 'verified' && hasPaid;
  const isRejected = paymentStatus === 'rejected';
  return (
    <div className="md:col-span-3 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-500 text-2xl font-bold overflow-hidden">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-blue-100">{user?.email}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="bg-blue-400 bg-opacity-30 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                <Award className="h-3 w-3 mr-1" />
                {(user?.role ?? '').charAt(0).toUpperCase() + (user?.role ?? '').slice(1)}
              </span>
              <span
                className={`${isPaymentComplete ? 'bg-green-400 bg-opacity-30' : isRejected ? 'bg-red-500' : 'bg-yellow-400 bg-opacity-30'} text-xs font-medium px-2 py-1 rounded-full flex items-center capitalize`}
              >
                <CreditCard className="h-3 w-3 mr-1" />
                {paymentStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
