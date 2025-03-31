import Image from 'next/image';
import { GraduationCap, Building, BookOpenCheck, School } from 'lucide-react';
import { User } from '../../config/profile/types';

type AcademicInfoCardProps = {
  user: User;
};

export function AcademicInfoCard({ user }: AcademicInfoCardProps) {
  return (
    <div className="bg-[#FEFBED] shadow-md rounded-xl p-6 border border-[#FFD700]/30 h-full transform transition-transform hover:scale-[1.01]">
      <h3 className="text-xl font-semibold mb-6 pb-3 border-b border-[#FFD700] flex items-center font-outfit text-[#554400]">
        <GraduationCap className="h-5 w-5 mr-3 text-[#554400]" /> Academic Information
      </h3>
      <div className="space-y-5">
        <div className="flex items-start">
          <Building className="h-5 w-5 text-[#554400] mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-[#554400]/60 font-medium font-outfit">Institute</p>
            <p className="font-outfit text-[#554400]">{user?.institute || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-start">
          <BookOpenCheck className="h-5 w-5 text-[#554400] mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-[#554400]/60 font-medium font-outfit">Roll Number</p>
            <p className="font-outfit text-[#554400]">{user?.rollNo || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-start">
          <School className="h-5 w-5 text-[#554400] mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-[#554400]/60 font-medium font-outfit">Year of Study</p>
            <p className="font-outfit text-[#554400]">
              {user?.yearOfStudy ? `Year ${user.yearOfStudy}` : 'Not provided'}
            </p>
          </div>
        </div>
      </div>
      {user?.idCardImage && (
        <div className="mt-6">
          <p className="text-sm text-[#554400]/60 font-medium font-outfit mb-2">ID Card</p>
          <div className="rounded-lg overflow-hidden border-2 border-[#FFD700]/30">
            <Image
              src={user.idCardImage || '/images/default-id-card.png'}
              alt="ID Card"
              width={400}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
