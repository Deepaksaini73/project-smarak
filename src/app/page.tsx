'use client';

// import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Slider from '@/components/slider/Slider';
import Homee from '@/components/Home/Home';
import Hero from '@/components/hero/hero';

export default function Home() {
  return (
    //  <main  className="min-h-screen w-full overflow-x-hidden bg-construction-grey">
    //    <Hero />
    //  </main>

    <>
      <Navbar />
      <Hero />
      <Homee />
      <Slider />
      <Footer />
    </>
  );
}
