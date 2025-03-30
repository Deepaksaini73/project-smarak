'use client';

import Hero from '@/components/home/hero/hero';
import Aboutus from '@/components/home/about-us/Aboutus';
import EventsCarousel from '@/components/home/events/events';
import Mission from '@/components/home/mission/misson';

export default function Home() {
  return (
    <>
      <Hero />
      <Aboutus />
      <Mission />
      <EventsCarousel />
    </>
  );
}
