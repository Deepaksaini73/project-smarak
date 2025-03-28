import mapimg from '../../../assets/footer-1.png';
import groupimg from '../../../assets/footer-2.jpg';
import nitrimg from '../../../assets/footer-3.png';
import nitlogo from '../../../assets/nit-rourkela-logo.png';
import Image from 'next/image';
import Link from 'next/link';
import Card from '@/components/Footer/Card';

export default function Footer() {
  return (
    <footer className="text-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col gap-15 lg:flex-row justify-between items-center border-b-2 pb-6 md:px-5">
          <Link href="https://maps.app.goo.gl/zxb4Jf4Bu9vQ89va9">
            <Card imgSrc={mapimg} imgName="Find Us Here" />
          </Link>
          <Card imgSrc={groupimg} imgName="CEST FAM" />
          <Card imgSrc={nitrimg} imgName="National Institute of Technology, Rourkela" />
        </div>

        {/* About Section */}
        <div className="text-center text-gray-900 mt-6 px-8">
          <p className="text-lg">
            At CEST, we are dedicated to fostering a thriving community of civil engineering
            enthusiasts. Our club serves as a platform for students to explore, learn, and excel in
            various aspects of civil engineering. Through a range of activities, workshops, and
            events, we aim to broaden the horizons of our members and enhance their knowledge and
            skills.
          </p>
        </div>
      </div>

      {/* Contact and Address Section with Yellow Background */}
      <div className="bg-[#FFD700] w-full flex flex-col md:flex-row justify-between items-center mt-10 px-10 py-6">
        {/* Address */}
        <div className="md:w-1/3 text-left">
          <h2 className="text-xl font-bold mb-2">Address</h2>
          <p className="text-md">
            Jindal Colony, Bisra Road <br />
            National Institute Of Technology, Rourkela <br />
            Odisha-769008.
          </p>
        </div>

        {/* Logo */}
        <div className="md:w-1/3 flex flex-col items-center justify-center text-center">
          <Image src={nitlogo} alt="NIT Rourkela" className="w-20 h-20" />
          <p className="w-full mt-6 text-sm text-red-900 font-medium border-t pt-4">
            © Copyright 2023 CEST Club, NITR. All Rights Reserved.
          </p>
        </div>

        {/* Contacts */}
        <div className="md:w-1/3 text-right">
          <h2 className="text-xl font-bold mb-2">Contacts</h2>
          <p className="text-blue-700 font-semibold cursor-pointer">nitrklcest@gmail.com</p>
          <p className="text-md">8294360678, 9439735962</p>
        </div>
      </div>
    </footer>
  );
}
