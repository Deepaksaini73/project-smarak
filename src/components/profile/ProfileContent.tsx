import { User } from '../../config/profile/types';
import { ProfileSummary } from './ProfileSummary';
import { PersonalInfoCard } from './PersonalInfoCard';
import { AcademicInfoCard } from './AcademicInfoCard';
import { PaymentInfoCard } from './PaymentInfoCard';
import { usePayment } from '@/hooks/usePayment';

type ProfileContentProps = {
  user: User;
};

export function ProfileContent({ user }: ProfileContentProps) {
  const { paymentStatus, hasPaid, notes } = usePayment();

  return (
    <div className="space-y-8" style={{ zIndex: 20 }}>
      <ProfileSummary user={user} hasPaid={hasPaid} paymentStatus={paymentStatus} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PersonalInfoCard user={user} />
        <AcademicInfoCard user={user} />
        <div className="md:col-span-2 lg:col-span-1">
          <PaymentInfoCard hasPaid={hasPaid} paymentStatus={paymentStatus} notes={notes} />
        </div>
      </div>
    </div>
  );
}
