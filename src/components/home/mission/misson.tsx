import Title from '@/components/shared/title';
import React from 'react';
import MissionBanner from './misson-banner';
import { missions } from '@/config/mission';

export default function Mission() {
  return (
    <div className="my-20 flex flex-col items-center justify-center">
      <Title title="Our Mission" />
      <div className="grid grid-cols-1 slg:grid-cols-2 w-full max-w-7xl gap-10">
        {missions.map((mission, index) => (
          <MissionBanner
            key={index}
            title={mission.title}
            imageUrl={mission.imageUrl}
            direction={index % 2 === 0 ? 'right' : 'left'}
          />
        ))}
      </div>
    </div>
  );
}
