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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ProfileSummary user={user} hasPaid={hasPaid} paymentStatus={paymentStatus} />
      <PersonalInfoCard user={user} />
      <AcademicInfoCard user={user} />
      <PaymentInfoCard hasPaid={hasPaid} paymentStatus={paymentStatus} notes={notes} />
    </div>
  );
}
