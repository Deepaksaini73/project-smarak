import { User as UserIcon, Phone, Calendar, Clock } from 'lucide-react';
import { User } from '../../config/profile/types';

type PersonalInfoCardProps = {
  user: User;
};

export function PersonalInfoCard({ user }: PersonalInfoCardProps) {
  return (
    <div className="bg-[#FEFBED] shadow-md rounded-xl p-6 border border-[#FFD700]/30 h-full transform transition-transform hover:scale-[1.01]">
      <h3 className="text-xl font-semibold mb-6 pb-3 border-b border-[#FFD700] flex items-center font-outfit text-[#554400]">
        <UserIcon className="h-5 w-5 mr-3 text-[#554400]" /> Personal Information
      </h3>
      <div className="space-y-5">
        <div className="flex items-start">
          <Phone className="h-5 w-5 text-[#554400] mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-[#554400]/60 font-medium font-outfit">Phone Number</p>
            <p className="font-outfit text-[#554400]">{user?.phone || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-start">
          <UserIcon className="h-5 w-5 text-[#554400] mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-[#554400]/60 font-medium font-outfit">Gender</p>
            <p className="font-outfit text-[#554400]">{user?.gender || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-start">
          <Calendar className="h-5 w-5 text-[#554400] mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-[#554400]/60 font-medium font-outfit">Age</p>
            <p className="font-outfit text-[#554400]">{user?.age || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-[#554400] mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-[#554400]/60 font-medium font-outfit">Member Since</p>
            <p className="font-outfit text-[#554400]">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
