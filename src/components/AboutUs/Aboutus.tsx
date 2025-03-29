'use client';

import { Section } from '../shared/section';

export default function AboutUs() {
  const aboutContent = (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  );

  return (
    <Section
      title="About Us"
      content={aboutContent}
      image={{
        name: 'Glorifying since 12 years',
        src: 'https://res.cloudinary.com/da0htbmcg/image/upload/v1743262554/smarak25/assets/ho1olskvk8toapke9xlg.jpg',
        height: 350,
        width: 400,
      }}
      direction="left"
      backgroundColor="#fdfbef"
      titleColor="#554400"
    />
  );
}
