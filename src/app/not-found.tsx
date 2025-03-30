import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#fefbed] flex flex-col items-center justify-center w-full relative">
      <Image
        src={'/images/dots.png'}
        alt="dots"
        width={100}
        height={100}
        className="absolute top-2 left-0"
      />

      <div className="flex flex-col items-center justify-center w-full max-w-3xl px-5">
        <h1 className="font-outfit font-semibold text-6xl md:text-8xl text-[#312900] mb-4">404</h1>
        <h2 className="font-outfit font-semibold text-3xl md:text-4xl text-[#312900] mb-6 text-center">
          Oops! Page Not Found
        </h2>
        <p className="font-outfit font-semibold text-xl text-[#463700] mb-10 max-w-2xl text-center">
          The page you&apos;re looking for seems to have been misplaced, much like a blueprint in a
          bustling construction site. Let&apos;s get back to building something great!
        </p>

        <Link href="/" className="button-primary">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
