'use client';

import { aboutUs } from '@/config/about';
import { Section } from '../shared/section';

export default function AboutUs() {
  return (
    <Section
      title="About Us"
      content={aboutUs.content}
      image={{
        name: aboutUs.image.name,
        src: aboutUs.image.src,
        height: 350,
        width: 350,
      }}
      direction="left"
      backgroundColor="#fdfbef"
      titleColor="#554400"
    />
  );
}
