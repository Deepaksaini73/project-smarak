'use client';
import { useEffect, useRef, useState } from 'react';
import { RiMenu3Line } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { navbarContent } from '@/config/layouts';
import MobileMenu from './mobile-menu';
import { useSession, signOut } from 'next-auth/react';
import { X, User, ChevronDown, LogOut } from 'lucide-react';

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const mobileNavRef = useRef<any>(null);
  const dropdownRef = useRef<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) {
        setToggleMenu(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (toggleMenu || showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleMenu, showDropdown]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    setShowDropdown(false);
  };

  return (
    <>
      <MobileMenu
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        mobileNavRef={mobileNavRef}
        isActive={isActive}
        isLoggedIn={session.status === 'authenticated'}
        handleLogout={handleLogout}
      />
      <div className="bg-[#FEFBED] fixed w-full shadow-md top-0 z-50 flex items-center slg:justify-between slg:px-12 px-4 py-4 text-white">
        <Link href="/" className="cursor-pointer">
          <Image
            className="w-24 scale-150 ml-5"
            src={navbarContent.images.smarak}
            alt="cest-smarak"
            priority
            width={500}
            height={500}
          />
        </Link>
        <div className="hidden slg:flex gap-10 text-[22px] font-bold items-center font-quicksand text-[#574900]">
          {navbarContent.links.map((link, index) => (
            <div key={index} className="relative">
              <Link className="hover:text-[#574900] text-lg font-bold" href={link.href}>
                {link.name}
              </Link>
              {isActive(link.href) && (
                <motion.div
                  className="h-[2px] bg-[#574900] absolute bottom-[-4px] left-[0%]"
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          ))}

          {session.status === 'authenticated' ? (
            <div className="relative" ref={dropdownRef}>
              <motion.button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#574900] text-white"
                onClick={() => setShowDropdown(!showDropdown)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={18} />
                <ChevronDown size={16} />
              </motion.button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-[#574900]">
                  <button
                    onClick={() => {
                      router.push('/profile');
                      setShowDropdown(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 text-lg"
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 text-lg"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <motion.button
              className="button-primary"
              onClick={() => router.push('/signin')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
            </motion.button>
          )}
        </div>

        <button
          className="text-[#554400] slg:hidden flex justify-end w-full"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          {toggleMenu ? <X size={40} /> : <RiMenu3Line size={40} />}
        </button>
      </div>
      <div className="h-[72px]"></div>
    </>
  );
}
