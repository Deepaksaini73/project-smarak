'use client';

import React from 'react';

function OurStories() {
  return (
    <div className="bg-[#fdfbef] px-8 py-12 relative">
      {/* Dotted pattern - top left */}
      <div className="absolute top-0 left-0 w-20 h-20">
        <div className="grid grid-cols-5 gap-2 p-2">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#FFD700] opacity-60"></div>
          ))}
        </div>
      </div>

      {/* Dotted pattern - right side */}
      <div className="absolute top-10 right-0 h-full">
        <div className="grid grid-cols-5 gap-3 p-2">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#FFD700] opacity-40"></div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#FFD700] text-[#554400] text-3xl font-black px-8 py-3 rounded-[5px] rounded-tl-[30px] rounded-br-[30px]">
            OUR STORY
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left side - Text content */}
          <div className="font-['Inter'] font-normal leading-relaxed">
            <p className="text-gray-800 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <p className="text-gray-800">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur.
            </p>
          </div>

          {/* Right side - Stats Boxes in staggered layout with minimal gaps */}
          <div className="relative">
            {/* Stats boxes in a more compact arrangement */}
            <div className="flex flex-col relative space-y-1">
              {/* Top Row: 8+ Years Box - right aligned */}
              <div className="self-end mr-10 relative">
                <div className="bg-[#FFD700] p-2 md:p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32">
                  <span className="text-2xl md:text-4xl font-bold">8+</span>
                  <span className="text-sm md:text-lg">Years</span>
                </div>
                <div className="absolute -left-8 top-5">
                  <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
                </div>
              </div>

              {/* Middle Row: 120+ Members Box - left aligned */}
              <div className="self-start ml-0 md:ml-8 relative -mt-5">
                <div className="bg-[#FFD700] p-2 md:p-4 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32">
                  <span className="text-2xl md:text-4xl font-bold">120+</span>
                  <span className="text-sm md:text-lg">Members</span>
                </div>
                <div className="absolute -right-8 bottom-8">
                  <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
                </div>
              </div>

              {/* Bottom Row: 100+ Events Box - right aligned and larger */}
              <div className="self-end mr-0 relative -mt-5">
                <div className="bg-[#FFD700] p-3 md:p-5 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center w-28 h-28 md:w-40 md:h-40">
                  <span className="text-3xl md:text-5xl font-bold">100+</span>
                  <span className="text-lg md:text-2xl">Events</span>
                </div>
                <div className="absolute -right-8 -top-5">
                  <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
                </div>
                <div className="absolute right-20 -bottom-5">
                  <div className="w-2 h-2 rounded-full bg-[#D4B354] opacity-60"></div>
                </div>
                <div className="absolute right-10 -bottom-3">
                  <div className="w-2 h-2 rounded-full bg-[#D4B354] opacity-60"></div>
                </div>
                <div className="absolute right-0 -bottom-1">
                  <div className="w-2 h-2 rounded-full bg-[#D4B354] opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurStories;
