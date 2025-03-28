import { useEffect, useRef, useState } from 'react';
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image';
import cestLogo from '../../../assets/cest-Logo.png';

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const mobileNavRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = event => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setToggleMenu(false);
      }
    };

    if (toggleMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleMenu]);

  return (
    <>
      {toggleMenu && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Sidebar with 50% width, full height, centered links */}
          <div
            ref={mobileNavRef}
            className="w-[50%] h-full bg-[#FEFBED] backdrop-blur-sm shadow-lg flex flex-col justify-center items-center transition-transform transform translate-x-0"
          >
            <div className="absolute top-4 right-4 text-[#574900]">
              <RiCloseLine onClick={() => setToggleMenu(false)} size={40} />
            </div>
            <div className="flex flex-col gap-6 items-center w-full">
              <Link
                className="text-orange-500 font-bold text-2xl hover:text-[#574900] transition-all"
                href="/"
              >
                Home
              </Link>
              <Link
                className="text-orange-500 font-bold text-2xl hover:text-[#574900] transition-all"
                href="/team"
              >
                Team
              </Link>
              <Link
                className="text-orange-500 font-bold text-2xl hover:text-[#574900] transition-all"
                href="/gate-portal"
              >
                Gate Portal
              </Link>
              <Link
                className="text-orange-500 font-bold text-2xl hover:text-[#574900] transition-all"
                href="/gallery"
              >
                Gallery
              </Link>
              <Link
                className="text-orange-500 font-bold text-2xl hover:text-[#574900] transition-all"
                href="/about"
              >
                About us
              </Link>
              <Link
                className="text-orange-500 font-bold text-2xl hover:text-[#574900] transition-all"
                href="/contact"
              >
                Contact Us
              </Link>

              <button
                className="border bg-[#554400] text-[#fff] font-bold px-6 py-2 rounded-md shadow-md hover:bg-[#443300] hover:text-white transition w-4/5 mt-4"
                onClick={() => navigate('/login')}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#FEFBED] sticky shadow-md top-0 z-20 flex items-center w-full md:justify-between backdrop-blur-sm md:px-16 px-4 py-4 text-white">
        <Link
          href="/"
          className="md:border-none md:pr-0 md:mr-0 pr-4 mr-4 border-r-2 border-white cursor-pointer"
        >
          <Image className="w-18" src={cestLogo} alt="cest-smarak" priority />
        </Link>
        <div className="flex gap-10 text-[22px] font-bold items-center font-semibold text-[#574900]">
          <Link
            className="hover:text-[#574900] hover:text-xl hidden md:block text-lg transition-all"
            href="/"
          >
            Home
          </Link>
          <Link
            className="hover:text-[#574900] hover:text-xl hidden md:block text-lg transition-all"
            href="/team"
          >
            Team
          </Link>
          <Link
            className="hover:text-[#574900] hover:text-xl hidden md:block text-lg transition-all"
            href="/gate-portal"
          >
            Gate Portal
          </Link>
          <Link
            className="hover:text-[#574900] hover:text-xl hidden md:block text-lg transition-all"
            href="/gallery"
          >
            Gallery
          </Link>
          <Link
            className="hover:text-[#574900] hover:text-xl hidden md:block text-lg transition-all"
            href="/about"
          >
            About us
          </Link>
          <Link
            className="hover:text-[#574900] hover:text-xl hidden md:block text-lg transition-all"
            href="/contact"
          >
            Contact Us
          </Link>

          <button
            className="hidden md:block bg-[#554400] text-[16px] font-bold text-white px-4 py-2 rounded-md shadow-md hover:bg-[#443300] transition"
            onClick={() => navigate('/login')}
          >
            Sign in
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="text-[#554400] md:hidden flex justify-end w-full">
          <RiMenu3Line onClick={() => setToggleMenu(true)} size={40} />
        </div>
      </div>
    </>
  );
}
