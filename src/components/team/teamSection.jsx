import React from 'react';
import MemberCard from './memberCard';
import Title from '../shared/title';

const TeamSection = ({ sectionTitle, members, rowSizes = [3, 2] }) => {
  const rowIndices = rowSizes.reduce((acc, size, index) => {
    const startIndex = index === 0 ? 0 : acc[index * 2 - 1];
    const endIndex = startIndex + size;
    return [...acc, startIndex, endIndex];
  }, []);

  return (
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden mt-20">
      {/* Section Title */}
      <Title title={sectionTitle} />

      {/* Members */}
      {rowSizes.map((_, rowIndex) => {
        const startIdx = rowIndices[rowIndex * 2];
        const endIdx = rowIndices[rowIndex * 2 + 1];

        return (
          <div key={`row-${rowIndex}`} className="mx-auto max-w-6xl mb-8 !mt-20">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {members.slice(startIdx, endIdx).map((member, idx) => (
                <MemberCard
                  key={`member-${startIdx + idx}`}
                  name={member.name}
                  position={member.position}
                  title={member.title}
                  imageSrc={member.imageSrc}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeamSection;
