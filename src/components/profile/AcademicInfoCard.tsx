import Image from 'next/image';
import { GraduationCap, Building, BookOpenCheck, School } from 'lucide-react';
import { User } from '../../config/profile/types';

type AcademicInfoCardProps = {
  user: User;
};

export function AcademicInfoCard({ user }: AcademicInfoCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 pb-2 border-b flex items-center">
        <GraduationCap className="h-5 w-5 mr-2 text-blue-500" /> Academic Information
      </h3>
      <div className="space-y-3">
        <div className="flex items-start">
          <Building className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Institute</p>
            <p>{user?.institute || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-start">
          <BookOpenCheck className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Roll Number</p>
            <p>{user?.rollNo || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-start">
          <School className="h-4 w-4 text-gray-400 mt-0.5 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Year of Study</p>
            <p>{user?.yearOfStudy ? `Year ${user.yearOfStudy}` : 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-start">
          <Image
            width={16}
            height={16}
            src="/placeholder.svg"
            alt="ID Card"
            className="h-4 w-4 text-gray-400 mt-0.5 mr-2"
          />
          <div>
            <p className="text-sm text-gray-500">ID Card</p>
            <p>{user?.idCardImage ? 'Uploaded' : 'Not uploaded'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
