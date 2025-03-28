'use client';

import Image from 'next/image';
import homeimage from '../../../assets/homeiamge.svg';
import defaultimage from '../../../assets/default.png';

export default function AboutUs() {
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
        {/* Title with blue border */}
        <div className="inline-block mb-6 px-3 py-1">
          <h1 className="text-2xl font-bold text-[#554400]">About Us</h1>
          <div className="absolute w-20 h-1 bg-[#554400] mt-1"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - Text Content */}
          <div className="md:w-1/2">
            <p className="text-gray-800 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <p className="text-gray-800 leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Right Side - Group Photo */}
          <div className="relative rounded-lg overflow-hidden md:w-1/2 flex-shrink-0">
            <Image
              src={defaultimage}
              alt="Group Photo"
              width={500}
              height={300}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />

            {/* Badge */}
            <div className="absolute bottom-0 -right-8 -translate-x-1/4 bg-yellow-400 text-black font-bold px-4 py-1 rounded-tl-[35px] rounded-br-[35px] rounded-xl shadow-md">
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
        </div>
      </div>
    </div>
  );
}
