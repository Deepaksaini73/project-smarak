'use client';
import { useEffect, useRef, useState } from 'react';
import { RiMenu3Line } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { navbarContent } from '@/config/layouts';
import MobileMenu from './mobile-menu';
import { useSession } from 'next-auth/react';
import { X } from 'lucide-react';

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const mobileNavRef = useRef<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) {
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

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <MobileMenu
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        mobileNavRef={mobileNavRef}
        isActive={isActive}
      />
      <div className="bg-[#FEFBED] fixed w-full shadow-md top-0 z-50 flex items-center slg:justify-between slg:px-12 px-4 py-4 text-white">
        <Link href="/" className="cursor-pointer">
          <Image
            className="w-24 scale-150"
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
            <motion.button
              className="button-primary"
              onClick={() => router.push('/profile')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Profile
            </motion.button>
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
