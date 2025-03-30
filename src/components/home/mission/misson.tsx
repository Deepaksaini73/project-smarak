import Title from '@/components/shared/title';
import React from 'react';
import MissionBanner from './misson-banner';
import { footerContent } from '@/config/layouts';

export default function Mission() {
  const missions = [
    {
      title: 'Mission 1',
      description: 'Description for mission 1',
      imageUrl: footerContent.images.nitlogo,
    },
    {
      title: 'Mission 2',
      description: 'Description for mission 2',
      imageUrl: footerContent.images.nitlogo,
    },
    {
      title: 'Mission 3',
      description: 'Description for mission 3',
      imageUrl: footerContent.images.nitlogo,
    },
    {
      title: 'Mission 4',
      description: 'Description for mission 4',
      imageUrl: footerContent.images.nitlogo,
    },
  ];
  return (
    <div className="my-20 flex flex-col items-center justify-center">
      <Title title="Our Mission" />
      <div className="grid grid-cols-1 slg:grid-cols-2 w-full max-w-7xl gap-10">
        {missions.map((mission, index) => (
          <MissionBanner
            key={index}
            title={mission.title}
            description={mission.description}
            imageUrl={mission.imageUrl}
            direction={index % 2 === 0 ? 'right' : 'left'}
          />
        ))}
      </div>
    </div>
  );
}
