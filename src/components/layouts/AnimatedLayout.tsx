'use client';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface AnimatedLayoutProps {
  children: ReactNode;
}

export default function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const pathname = usePathname();
  const [isChangingRoute, setIsChangingRoute] = useState(false);
  const [isPreviousRouteExiting, setIsPreviousRouteExiting] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Clear all timers when component unmounts
  useEffect(() => {
    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (pathname !== prevPathname) {
      // Clear any existing timers
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];

      // Reset states
      setPrevPathname(pathname);
      setIsChangingRoute(true);
      setIsPreviousRouteExiting(true);

      // Handle previous route exit
      const exitTimer = setTimeout(() => {
        setIsPreviousRouteExiting(false);
      }, 400);
      timersRef.current.push(exitTimer);

      // Handle route change completion - this is key to removing the white screen
      const completeTimer = setTimeout(() => {
        setIsChangingRoute(false);
      }, 600); // Ensure this is enough time for the animation but not too long
      timersRef.current.push(completeTimer);

      // Safety timer to ensure white screen doesn't persist
      const safetyTimer = setTimeout(() => {
        setIsChangingRoute(false);
        setIsPreviousRouteExiting(false);
      }, 1000);
      timersRef.current.push(safetyTimer);
    }
  }, [pathname, prevPathname]);

  const cardVariants = {
    initial: {
      scale: 0.98,
      opacity: 0,
      y: 100,
      transformPerspective: 1000,
      zIndex: 5,
    },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      zIndex: 20,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      scale: 0.98,
      opacity: 0,
      y: -60,
      zIndex: 10,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="fixed inset-0 bg-white" style={{ zIndex: -20 }} />
      {isPreviousRouteExiting && <div className="fixed inset-0 bg-white" style={{ zIndex: -10 }} />}

      {/* Overlay - this has exit animations */}
      <AnimatePresence mode="wait">
        {isChangingRoute && (
          <motion.div
            className="fixed inset-0 bg-white"
            style={{ zIndex: 50 }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className="relative w-full h-full"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={cardVariants}
        >
          <div className="w-full h-full">{children}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
