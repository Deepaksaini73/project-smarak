'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { link } from 'fs';

export default function Hero() {
  const socialIconVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.2,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    hover: { scale: 1.2, rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  // New variants for staggered letter animation
  const letterVariants = {
    initial: { opacity: 0, y: 50 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.03, // Stagger each letter with a small delay
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1], // Custom easing for bounce effect
      },
    }),
  };

  // Container variant for the title
  const titleContainerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  // Add this near the top where other variants are defined
  const logoVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    hover: {
      scale: 1.02,
      filter: 'brightness(1.1)',
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  // Split heading text into arrays for each line
  const headingLine1 = 'SMARAK'.split('');
  const headingLine2 = ' '.split('');

  return (
    <div className="min-h-screen bg-[#FFD700] flex sslg:flex-row flex-col items-center justify-center sslg:justify-between w-full relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Image
          src={'/images/dots.png'}
          alt="dots"
          width={100}
          height={100}
          className="absolute top-2 left-0"
        />
      </motion.div>

      <div className="flex sslg:flex-row flex-row-reverse items-center justify-between w-full my-36">
        <div
          id="social"
          className="hidden smd:flex sslg:hidden xlg:flex items-center flex-col justify-between min-h-[50dvh] -mr-20 sslg:-ml-20"
        >
          <div className="flex flex-col items-center justify-center gap-5">
            {[
              {
                src: '/images/ig.png',
                alt: 'Instagram',
                width: 30,
                height: 30,
                link: 'https://www.instagram.com/smarak_nitr/',
              },
              {
                src: '/images/yt.png',
                alt: 'Youtube',
                width: 30,
                height: 30,
                link: 'https://www.youtube.com/@smaraknitr',
              },
              {
                src: '/images/fb.png',
                alt: 'Facebook',
                width: 15,
                height: 15,
                link: 'https://www.facebook.com/smarak.nitr/',
              },
            ].map((icon, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={socialIconVariants}
              >
                <Link href={icon.link} target="_blank">
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={icon.width}
                    height={icon.height}
                    className="mx-2"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
            className="mt-10 !h-full"
          >
            <h3
              className="font-opensans rotate-[270deg] font-bold text-4xl text-[#574900] !h-full"
              style={{ letterSpacing: '0.375rem', whiteSpace: 'nowrap' }}
            >
              FOLLOW US:{' '}
            </h3>
          </motion.div>
        </div>

        <div id="middle" className="flex flex-col items-start px-5 smd:pl-10 xlg:-ml-10">
          <div
            className="font-outfit font-semibold text-5xl text-[#312900] tracking-wide"
            style={{ lineHeight: '55px' }}
          >
            {/* First line with staggered letters */}
            <motion.div
              className="flex flex-wrap mb-4"
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={logoVariants}
            >
              <motion.span
                className="font-extrabold text-7xl tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #8D0000 0%, #463700 50%, #8D0000 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient 8s ease infinite',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 2px rgba(141, 0, 0, 0.3))',
                }}
              >
                SMARAK
              </motion.span>
            </motion.div>

            {/* Second line with staggered letters */}
            <motion.div
              className="flex flex-wrap"
              initial="initial"
              animate="animate"
              variants={titleContainerVariants}
            >
              {headingLine2.map((char, index) => (
                <motion.span
                  key={`line2-${index}`}
                  custom={index + headingLine1.length} // Continue the delay sequence
                  variants={letterVariants}
                  className={char === ' ' ? 'mr-2' : ''}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.p
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 + (headingLine1.length + headingLine2.length) * 0.03 }} // Delay after all letters are animated
            variants={textVariants}
            className="text-[#8D0000] font-outfit font-semibold text-lg mt-2"
          >
            &quot;Fusing Innovation With a Greener Tomorrow&quot;
          </motion.p>

          <motion.p
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 + (headingLine1.length + headingLine2.length) * 0.03 }} // Delay after all letters are animated
            variants={textVariants}
            className="font-outfit font-semibold text-[22px] text-[#463700] my-10 smd:my-20 max-w-[530px] w-full"
            style={{
              lineHeight: '112.33%',
              letterSpacing: '0.00733333px',
            }}
          >
            With a focus on &quot;Fusing Innovation with a Greener Tomorrow,&quot; Smarak challenges
            participants to think beyond conventional methods and embrace sustainable, future-ready
            technologies. From hands-on technical competitions and design challenges to insightful
            seminars and workshops, the fest serves as a hub for learning, creativity,
            and collaboration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8 + (headingLine1.length + headingLine2.length) * 0.02,
              duration: 0.6,
            }} // Adjusted delay
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              {/* <Link
                href={'/sigin'}
                className="button-primary inline-block relative overflow-hidden group"
              >
                <span className="relative z-10">Register</span>
                <motion.span
                  className="absolute inset-0 bg-[#8D0000] z-0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                ></motion.span>
              </Link> */}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full sslg:hidden block"
      >
        <Image
          src={'/images/hero.png'}
          alt="Hero"
          width={500}
          height={500}
          className="h-full object-fill object-center w-full rounded-t-[100px]"
        />
      </motion.div>

      <motion.div
        id="image"
        className="h-full hidden sslg:flex justify-end w-full"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="w-[95%] xlg:w-[85%] h-full"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={'/images/hero.png'}
            alt="Hero"
            width={1000}
            height={1000}
            className="object-fill object-center w-full rounded-l-[138px] h-screen"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
