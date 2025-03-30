import React from 'react';
import Image from 'next/image';

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-[#fefbed] flex flex-col items-center justify-center w-full relative">
      <Image
        src={'/images/dots.png'}
        alt="dots"
        width={100}
        height={100}
        className="absolute top-2 left-0"
      />

      <div className="flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-[#554400]"></div>
        </div>

        <h2 className="font-outfit font-semibold text-2xl md:text-3xl text-[#312900] mb-2">
          Loading...
        </h2>
        <p className="font-outfit text-lg text-[#463700] max-w-md text-center">
          Building the foundation for your experience, please hold on...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
