import { User } from '../../config/profile/types';
import { ProfileSummary } from './ProfileSummary';
import { PersonalInfoCard } from './PersonalInfoCard';
import { AcademicInfoCard } from './AcademicInfoCard';
import { PaymentInfoCard } from './PaymentInfoCard';

type ProfileContentProps = {
  user: User;
};

export function ProfileContent({ user }: ProfileContentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ProfileSummary user={user} />
      <PersonalInfoCard user={user} />
      <AcademicInfoCard user={user} />
      <PaymentInfoCard />
    </div>
  );
}
