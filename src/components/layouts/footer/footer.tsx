'use client';

import React from 'react';
import Image from 'next/image';
import { footerContent } from '@/config/layouts';
import { ImageCard } from '@/components/shared/image-card';

const Footer: React.FC = () => {
  return (
    <footer className="text-[#463700]" id="contact">
      <div className="max-w-[84rem] mx-auto px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-6 md:px-5">
          <div className="hover-card">
            <ImageCard
              imgSrc={footerContent.images.mapimg}
              imgName="Find Us Here"
              href={footerContent.map}
            />
          </div>

          <div className="hover-card">
            <ImageCard imgSrc={footerContent.images.groupimg} imgName="TEAM SMARAK" />
          </div>

          <div className="hover-card">
            <ImageCard imgSrc={footerContent.images.nitrimg} imgName="NIT Rourkela" />
          </div>
        </div>

        <div className="text-center text-gray-900 mt-6 px-4 md:px-8 font-quicksand">
          <p className="text-base md:text-lg">{footerContent.about}</p>
        </div>
      </div>

      <div className="bg-[#FFD700] w-full flex flex-col md:flex-row justify-between items-center mt-6 md:mt-10 px-4 md:px-10 py-6 gap-6 md:gap-0">
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold mb-2 font-outfit">Address</h2>
          <p className="text-sm md:text-md font-outfit text-gray-900">
            National Institute of Technology Rourkela <br /> Odisha, India, 769008 <br />
          </p>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center">
          <div className="logo-hover">
            <Image
              src={footerContent.images.nitlogo}
              alt="NIT Rourkela"
              className="size-20 md:size-28"
              height={400}
              width={400}
            />
          </div>
          <p className="w-full text-xs md:text-sm text-red-900 font-outfit pt-2 md:pt-4 font-semibold">
            © Copyright {new Date().getFullYear()} CEST Club, NITR. All Rights Reserved.
          </p>
        </div>

        <div className="w-full md:w-1/3 text-center md:text-right">
          <h2 className="text-xl md:text-2xl font-bold mb-2 font-outfit">Contacts</h2>
          <div className="flex flex-col items-center md:items-end">
            <a
              href={footerContent.whatsapp.link}
              className="font-semibold cursor-pointer font-outfit text-sm md:text-base hover-link"
            >
              {footerContent.whatsapp.title}
            </a>
            <a
              className="font-semibold cursor-pointer font-outfit text-sm md:text-base hover-link"
              href={`mailto:${footerContent.email}`}
            >
              {footerContent.email}
            </a>
            {footerContent.phone.map((phone, index) => (
              <a
                key={index}
                href={`tel:${phone}`}
                className="block font-outfit font-semibold cursor-pointer hover-link text-sm md:text-base"
              >
                {phone}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-card {
          transition: transform 0.3s ease;
        }

        .hover-card:hover {
          transform: translateY(-5px);
        }

        .logo-hover {
          transition: transform 0.3s;
        }

        .logo-hover:hover {
          transform: scale(1.05);
        }

        .hover-link {
          transition: transform 0.3s;
          display: inline-block;
        }

        .hover-link:hover {
          transform: scale(1.02) translateX(-3px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
