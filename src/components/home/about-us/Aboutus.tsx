'use client';

import { aboutUs } from '@/config/about';
import { Section } from '../../shared/section';

export default function AboutUs() {
  return (
    <>
      <div id="about"></div>
      <Section
        title="About Us"
        content={aboutUs.content}
        image={{
          name: aboutUs.image.name,
          src: aboutUs.image.src,
          height: 350,
          width: 500,
        }}
        direction="right"
        titleColor="#554400"
      />
    </>
  );
}
