import React from 'react';
import Image from 'next/image';
import { footerContent } from '@/config/layouts';
import { ImageCard } from '@/components/shared/image-card';

const Footer: React.FC = () => {
  return (
    <footer className="text-[#463700]" id="contact">
      <div className="max-w-[84rem] mx-auto px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-6 md:px-5">
          <ImageCard
            imgSrc={footerContent.images.mapimg}
            imgName="Find Us Here"
            href={footerContent.map}
          />
          <ImageCard imgSrc={footerContent.images.groupimg} imgName="CEST FAM" />
          <ImageCard imgSrc={footerContent.images.nitrimg} imgName="NIT Rourkela" />
        </div>

        <div className="text-center text-gray-900 mt-6 px-4 md:px-8 font-quicksand">
          <p className="text-base md:text-lg">{footerContent.about}</p>
        </div>
      </div>

      <div className="bg-[#FFD700] w-full flex flex-col md:flex-row justify-between items-center mt-6 md:mt-10 px-4 md:px-10 py-6 gap-6 md:gap-0">
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold mb-2 font-outfit">Address</h2>
          <p className="text-sm md:text-md font-outfit text-gray-900">
            Jindal Colony, Bisra Road <br />
            National Institute Of Technology, Rourkela <br />
            Odisha-769008.
          </p>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center">
          <Image
            src={footerContent.images.nitlogo}
            alt="NIT Rourkela"
            className="size-20 md:size-28"
            height={400}
            width={400}
          />
          <p className="w-full text-xs md:text-sm text-red-900 font-outfit pt-2 md:pt-4 font-semibold">
            © Copyright {new Date().getFullYear()} CEST Club, NITR. All Rights Reserved.
          </p>
        </div>

        <div className="w-full md:w-1/3 text-center md:text-right">
          <h2 className="text-xl md:text-2xl font-bold mb-2 font-outfit">Contacts</h2>
          <p className="font-semibold cursor-pointer font-outfit text-sm md:text-base">
            {footerContent.email}
          </p>
          {footerContent.phone.map((phone, index) => (
            <a
              key={index}
              href={`tel:${phone}`}
              className="block font-outfit font-semibold cursor-pointer hover:underline text-sm md:text-base"
            >
              {phone}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
