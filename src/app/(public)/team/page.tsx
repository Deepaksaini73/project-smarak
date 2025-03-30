import { Section } from '@/components/shared/section';
import MembersGrid from '@/components/team/members';
import TeamSection from '@/components/team/teamSection';
import { aboutUs } from '@/config/about';
import React from 'react';
import { teamHeads } from '@/config/team';
export default function Page() {
  return (
    <div className="pb-20">
      <Section
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        title="Team"
        image={{
          name: aboutUs.image.name,
          src: aboutUs.image.src,
          height: 350,
          width: 500,
        }}
      />
      <TeamSection
        sectionTitle={<span className="text-6xl mb-10  font-bold">Our Team</span>}
        members={teamHeads.map(member => ({
          ...member,
          name: <span className="font-[Outfit]">{member.name}</span>,
          position: <span className="font-[Outfit]">{member.position}</span>,
          title: <span className="font-[Quicksand]">{member.title}</span>,
        }))}
        rowSizes={[3, 2]}
      />
      <TeamSection
        sectionTitle={<span className="text-6xl font-bold">Our Team</span>}
        members={teamHeads.map(member => ({
          ...member,
          name: <span className="font-[Outfit]">{member.name}</span>,
          position: <span className="font-[Outfit]">{member.position}</span>,
          title: <span className="font-[Quicksand]">{member.title}</span>,
        }))}
        rowSizes={[3, 2]}
      />
      <MembersGrid />
    </div>
  );
}
