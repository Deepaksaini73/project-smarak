import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { footerContent } from '@/config/layouts';

interface CardProps {
  imgSrc: string;
  imgName: string;
  href?: string;
}

const Card: React.FC<CardProps> = ({ imgSrc, imgName, href }) => {
  const CardContent = () => (
    <div className="w-[400px] h-[250px] rounded-[15px] rounded-tl-[45px]">
      <div className="relative rounded-[12px] rounded-br-[45px] rounded-tl-[45px] h-full">
        <Image
          src={imgSrc}
          alt={imgName}
          className="w-full h-full rounded-[12px] rounded-br-[45px] rounded-tl-[45px] object-cover"
          width={340}
          height={200}
          style={{ height: '250px' }}
        />
        <p className="absolute -bottom-[10px] -right-[15px] px-[25px] py-[8px] bg-[#FFD700] rounded-[12px] rounded-br-[45px] rounded-tl-[45px] shadow-lg h-[40px] whitespace-nowrap font-outfit">
          {imgName}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href}>
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

const Footer: React.FC = () => {
  return (
    <footer className="text-black">
      <div className="max-w-[84rem] mx-auto px-4 py-2">
        <div className="flex flex-col gap-15 lg:flex-row justify-between items-center pb-6 md:px-5">
          <Card
            imgSrc={footerContent.images.mapimg}
            imgName="Find Us Here"
            href={footerContent.map}
          />
          <Card imgSrc={footerContent.images.groupimg} imgName="CEST FAM" />
          <Card imgSrc={footerContent.images.nitrimg} imgName="NIT, Rourkela" />
        </div>

        <div className="text-center text-gray-900 mt-6 px-8 font-quicksand">
          <p className="text-lg">{footerContent.about}</p>
        </div>
      </div>

      <div className="bg-[#FFD700] w-full flex flex-col md:flex-row justify-between items-center mt-10 px-10 py-6">
        <div className="md:w-1/3 text-left">
          <h2 className="text-2xl font-bold mb-2 font-outfit">Address</h2>
          <p className="text-md font-outfit text-gray-900">
            Jindal Colony, Bisra Road <br />
            National Institute Of Technology, Rourkela <br />
            Odisha-769008.
          </p>
        </div>

        <div className="md:w-1/3 flex flex-col items-center justify-center text-center">
          <Image
            src={footerContent.images.nitlogo}
            alt="NIT Rourkela"
            className="size-28"
            height={400}
            width={400}
          />
          <p className="w-full text-sm text-red-900  font-outfit pt-4 font-semibold">
            © Copyright {new Date().getFullYear()} CEST Club, NITR. All Rights Reserved.
          </p>
        </div>

        <div className="md:w-1/3 text-right">
          <h2 className="text-2xl font-bold mb-2 font-outfit">Contacts</h2>
          <p className=" font-semibold cursor-pointer font-outfit">{footerContent.email}</p>
          {footerContent.phone.map((phone, index) => (
            <a
              key={index}
              href={`tel:${phone}`}
              className="block font-outfit   font-semibold cursor-pointer hover:underline"
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
