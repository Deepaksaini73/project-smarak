import React from 'react';

const MemberCard = ({ name, position, title, imageSrc }) => (
  <div className=" relative">
    <div
      className="rounded-full border-4 border-[rgba(87,73,0,1)] shadow-lg overflow-hidden mb-0 mx-auto"
      style={{ width: '220px', height: '220px' }}
    >
      <img
        src={imageSrc || 'img to be added'}
        alt={`${name}`}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="bg-yellow-400 text-center py-2 px-2 rounded-lg shadow-md w-54 mx-auto -mt-2">
      <p className="font-bold text-lg text-black">{name}</p>
      {/* <p className="text-base font-bold text-black">{position}</p> */}
      <p
        className="text-base font-bold text-red-700"
        style={{ fontFamily: 'Quicksand, sans-serif' }}
      >
        {position}
      </p>
    </div>
  </div>
);

export default MemberCard;
