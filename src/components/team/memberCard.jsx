import Image from 'next/image';
import React from 'react';

const MemberCard = ({ name, position, title, imageSrc }) => (
  <div className=" relative">
    <div
      className="rounded-full border-4 border-[rgba(87,73,0,1)] shadow-lg overflow-hidden mb-0 mx-auto"
      style={{ width: '220px', height: '220px' }}
    >
      <Image
        src={imageSrc || 'img to be added'}
        alt={`${name}`}
        className="w-full h-full object-cover -z-10"
        width={220}
        height={220}
      />
    </div>
    <div className="bg-yellow-400 text-center py-2 px-2 rounded-lg shadow-md w-54 mx-auto z-10 -mt-2">
      <p className="font-bold text-lg text-black !capitalize">{name}</p>

      <p className="text-base font-bold text-red-700 !capitalize font-quicksand">{position}</p>
    </div>
  </div>
);

export default MemberCard;
