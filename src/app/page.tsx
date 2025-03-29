'use client';

import Navbar from '@/components/layouts/Navbar/Navbar';
import Footer from '@/components/layouts/footer/footer';
import Hero from '@/components/hero/hero';
import Main from '@/components/AboutUs/main';

export default function Home() {
  return (
    //  <main  className="min-h-screen w-full overflow-x-hidden bg-construction-grey">
    //    <Hero />
    //  </main>

    <>
      <Navbar />
      <Hero />
      {/* <Homee />
      <Slider /> */}
      <Main />

      <Footer />
    </>
  );
}
