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
    <div className="bg-gradient-to-r from-[#FFD700]/80 to-[#FFD700]/20 rounded-xl overflow-hidden shadow-lg">
      <div className="p-8 text-[#554400]">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-32 h-32 bg-[#554400] rounded-full flex items-center justify-center text-[#FFD700] text-4xl font-bold font-outfit overflow-hidden shadow-md">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold font-outfit">{user?.name}</h2>
            <p className="text-[#554400]/80 font-outfit text-lg">{user?.email}</p>
            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="bg-[#554400] text-[#FFD700] text-sm font-medium px-4 py-1.5 rounded-full flex items-center font-outfit">
                <Award className="h-4 w-4 mr-2" />
                {(user?.role ?? '').charAt(0).toUpperCase() + (user?.role ?? '').slice(1)}
              </span>
              <span
                className={`${
                  isPaymentComplete
                    ? 'bg-green-600 text-white'
                    : isRejected
                      ? 'bg-red-600 text-white'
                      : 'bg-yellow-600 text-white'
                } text-sm font-medium px-4 py-1.5 rounded-full flex items-center capitalize font-outfit`}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {paymentStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
