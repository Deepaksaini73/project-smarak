'use client';

import Hero from '@/components/home/hero/hero';
import Aboutus from '@/components/home/about-us/Aboutus';
import EventsCarousel from '@/components/home/events/events';

export default function Home() {
  return (
    <>
      <Hero />
      <Aboutus />
      <EventsCarousel />
    </>
  );
}
