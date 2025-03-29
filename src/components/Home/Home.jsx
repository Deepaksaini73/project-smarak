'use client';

import Image from 'next/image';
import homeimage from '../../../assets/homeiamge.svg';

export default function Home() {
  return (
    <div className="bg-[#fdfbef] px-8 py-8 relative">
      {/* Dotted pattern - right side */}
      <div className="absolute top-8 right-8 grid grid-cols-10 gap-2">
        {[...Array(70)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-600 opacity-40"></div>
        ))}
      </div>

      {/* Dotted pattern - left side */}
      <div className="absolute bottom-8 left-8 grid grid-cols-5 gap-2">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-600 opacity-40"></div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Title with half underline */}
        <div className="relative mb-6">
          <h1 className="text-4xl font-bold text-[#554400]">Home</h1>
          <div className="absolute w-20 h-1 bg-[#554400] mt-1"></div>
        </div>

        <div className="grid md:grid-cols-2 items-start gap-8">
          {/* Left - Image */}
          <div className="relative">
            <Image
              src={homeimage}
              width={350}
              height={250}
              alt="Construction Site"
              className="rounded-xl"
            />
            {/* Badge */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/4 bg-yellow-400 text-black font-bold px-4 py-1 rounded-tl-[35px] rounded-br-[35px] rounded-xl shadow-md">
              <div className="text-center">
                Glorifying since{' '}
                <span className="text-xl font-black">
                  {' '}
                  <br />
                  12
                </span>{' '}
                Years.
              </div>
            </div>
          </div>

          {/* Right - Text */}
          <div>
            <p className="text-gray-800 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
