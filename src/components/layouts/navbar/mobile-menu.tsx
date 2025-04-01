import { navbarContent } from '@/config/layouts';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

export default function MobileMenu({
  toggleMenu,
  setToggleMenu,
  mobileNavRef,
  isActive,
  isLoggedIn,
  handleLogout,
}: {
  toggleMenu: boolean;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  mobileNavRef: React.RefObject<HTMLDivElement>;
  isActive: (href: string) => boolean;
  isLoggedIn: boolean;
  handleLogout: () => void;
}) {
  return (
    <AnimatePresence>
      {toggleMenu && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={mobileNavRef}
            className="w-full h-[100dvh] bg-[#FEFBED]  shadow-lg flex flex-col justify-center items-center"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="absolute top-4 right-4 text-[#574900]">
              <RiCloseLine onClick={() => setToggleMenu(false)} size={40} />
            </div>
            <div className="flex flex-col gap-6 items-center w-full font-quicksand">
              {navbarContent.links.map((link, index) => (
                <motion.div
                  key={index}
                  className="relative "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    className="font-bold text-2xl text-[#574900] transition-all"
                    href={link.href}
                    onClick={() => setToggleMenu(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {!isLoggedIn ? (
                <Link href={'/signin'} onClick={() => setToggleMenu(false)}>
                  <motion.button
                    className="w-full border bg-[#554400] text-[#fff] font-bold px-6 py-2 rounded-md shadow-md hover:bg-[#443300] hover:text-white transition mt-4 font-quicksand"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign in
                  </motion.button>
                </Link>
              ) : (
                <>
                  <Link
                    href={'/profile'}
                    className="button-primary"
                    onClick={() => setToggleMenu(false)}
                  >
                    Profile
                  </Link>
                  <motion.button
                    className="button-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleLogout();
                      setToggleMenu(false);
                    }}
                  >
                    Logout
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
