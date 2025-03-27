import { User as UserIcon, Phone, Calendar, Clock } from 'lucide-react';
import { User } from '../../config/profile/types';

type PersonalInfoCardProps = {
  user: User;
};

export function PersonalInfoCard({ user }: PersonalInfoCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 pb-2 border-b flex items-center">
        <UserIcon className="h-5 w-5 mr-2 text-blue-500" /> Personal Information
      </h3>
      <div className="space-y-3">
        <div className="flex items-start">
          <Phone className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p>{user?.phone || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-start">
          <UserIcon className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p>{user?.gender || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-start">
          <Calendar className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Age</p>
            <p>{user?.age || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-start">
          <Clock className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
