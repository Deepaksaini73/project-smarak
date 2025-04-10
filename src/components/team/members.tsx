import { members, USER_PLACEHOLDER } from '@/config/team';
import { HeaderTitle } from '../shared/section';
import Image from 'next/image';
export default function MembersGrid() {
  return (
    <div className="font-outfit  min-h-screen p-8">
      <div className="mb-6">
        <HeaderTitle title="Coordinators" titleColor="#554400" className="text-xl" />
      </div>
      <style>
        {`
          @media (min-width: 478px) and (max-width: 638px) {
          .custom-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          }
        `}
      </style>
      <div className="grid xs:grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 custom-grid">
        {members
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((member, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <Image
                src={member.image || USER_PLACEHOLDER}
                alt={member.name}
                className="w-44 sm:w-40 md:w-44 lg:w-48 aspect-square rounded-full object-cover border-4 border-white shadow-lg"
                height={500}
                width={500}
                priority={index < 5}
              />
              <div className="absolute bottom-[-10px] bg-yellow-400 text-black text-sm font-medium px-4 py-1 rounded-lg shadow-md whitespace-nowrap capitalize">
                {member.name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
