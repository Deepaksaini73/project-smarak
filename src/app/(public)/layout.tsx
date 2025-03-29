import Footer from '@/components/layouts/footer/footer';
import Navbar from '@/components/layouts/navbar/navbar';
import React from 'react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
