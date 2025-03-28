'use client';

import Image from 'next/image';
import homeimage from '../../../assets/homeiamge.svg';

export default function Home() {
  return (
    <div className="bg-[#fdfbef] px-8 py-12">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 items-center gap-6">
        {/* Left - Image */}
        <div className="relative">
          <h1 className="text-4xl font-bold text-[#4d4000] mb-4 underline">Home</h1>
          <Image
            src={homeimage}
            width={300}
            height={200}
            alt="Construction Site"
            className="rounded-xl shadow-lg"
          />
          {/* Badge */}
          <div className="absolute bottom-1 left-44 bg-yellow-400 text-black text-lg font-bold px-4 py-1 rounded-lg shadow-md rounded-br-[45px] rounded-tl-[45px]">
            Glorifying since{' '}
            <span className="text-2xl font-black">
              {' '}
              <br />
              12
            </span>{' '}
            Years.
          </div>
        </div>

        {/* Right - Text */}
        <div>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
    </div>
  );
}
