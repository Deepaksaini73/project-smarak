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
        content="The BIS Club at NIT Rourkela is powered by a team of passionate individuals dedicated to promoting technical excellence and innovation in civil engineering. Our members work tirelessly to ensure that Smarak becomes a platform for learning, collaboration, and sustainable development. From organizing workshops and competitions to engaging with industry experts, our team is committed to reshaping the future of civil engineering. Together, we strive to blend traditional engineering wisdom with modern sustainable practices, making an impact that lasts beyond the event."
        title="Team"
        image={{
          name: aboutUs.image.name,
          src: aboutUs.image.src,
          height: 350,
          width: 500,
        }}
      />
      <TeamSection
        sectionTitle={<span className="text-6xl mb-10  font-bold">Core Team</span>}
        members={teamHeads.map(member => ({
          ...member,
          name: <span className="font-[Outfit]">{member.name}</span>,
          position: <span className="font-[Quicksand]">{member.position}</span>,
          title: <span className="font-[Quicksand]">{member.title}</span>,
        }))}
        rowSizes={[4, 4, 4, 4]}
      />
      {/* <TeamSection
        sectionTitle={<span className="text-6xl font-bold"> Team</span>}
        members={teamHeads.map(member => ({
          ...member,
          name: <span className="font-[Outfit]">{member.name}</span>,
          position: <span className="font-[Outfit]">{member.position}</span>,
          title: <span className="font-[Quicksand]">{member.title}</span>,
        }))}
        rowSizes={[3, 2]}
      /> */}
      <MembersGrid />
    </div>
  );
}
