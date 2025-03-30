import { members } from '@/config/team';
export default function MembersGrid() {
  return (
    <div className="font-outfit bg-[#FFFBEF] min-h-screen p-8">
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-[rgb(87,73,0)] relative inline-block">
          Members
          <span className="absolute bottom-[-4px] left-0 w-10 h-[2px] bg-black"></span>
        </h2>
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
        {members.map((member, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-44 sm:w-40 md:w-44 lg:w-48 aspect-square rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute bottom-[-10px] bg-yellow-400 text-black text-sm font-medium px-4 py-1 rounded-lg shadow-md whitespace-nowrap">
              {member.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
