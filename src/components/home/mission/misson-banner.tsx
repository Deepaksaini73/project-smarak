'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

interface MissionBannerProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  backgroundColor?: string;
  shadowColor?: string;
  borderColor?: string;
  direction?: 'left' | 'right';
}

const MissionBanner: React.FC<MissionBannerProps> = ({
  title = 'Your Content Here',
  description = 'Add any text or content in this area.',
  imageUrl = '',
  backgroundColor = '#FFDE00',
  shadowColor = '#574900',
  borderColor = '#574900',
  direction = 'right',
}) => {
  const isRightDirection = direction === 'right';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-50px' }}
      className="relative w-full max-w-2xl mx-auto my-8 px-4"
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Dark shadow part */}
        <motion.div
          initial={{ opacity: 0, x: isRightDirection ? -15 : 15 }}
          whileInView={{ opacity: 1, x: isRightDirection ? -10 : 10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="absolute top-3 z-0"
          style={{
            left: isRightDirection ? '0' : 'auto',
            right: !isRightDirection ? '0' : 'auto',
            height: '8rem',
            width: 'calc(100% - 50px)',
            backgroundColor: shadowColor,
            clipPath: isRightDirection
              ? 'polygon(-10% -100%, 100% 0%, 100% 5%, 100% 72%, 10% 100%)'
              : 'polygon(0% 0%, 110% -100%, 90% 100%, 0% 72%, 0% 5%)',
            transform: isRightDirection
              ? 'translateX(-10px) translateY(8px)'
              : 'translateX(10px) translateY(8px)',
          }}
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, x: isRightDirection ? -10 : 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative h-28 xsmd:h-32 z-10 top-0"
          style={{
            left: isRightDirection ? '0' : 'auto',
            right: !isRightDirection ? '0' : 'auto',
            width: 'calc(100% - 70px)',
            backgroundColor: backgroundColor,
            clipPath: isRightDirection
              ? 'polygon(5% 50%, 0% 0%, 100% 5%, 100% 100%, 10% 100%)'
              : 'polygon(0% 5%, 100% 0%, 95% 50%, 90% 100%, 0% 100%)',
            marginLeft: isRightDirection ? '0' : 'auto',
            marginRight: !isRightDirection ? '0' : 'auto',
          }}
        >
          <div
            className={cn(
              'h-full flex flex-col justify-center smd:p-6',
              isRightDirection ? '!ml-10 mr-auto text-left' : '!ml-auto !mr-10 text-right'
            )}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-base xsmd:text-lg xlg:text-xl font-bold mb-1 font-outfit"
            >
              {title}
            </motion.h2>
            {/* <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-800 font-quicksand xsmd:w-full w-[70%]"
            >
              {description}
            </motion.p> */}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: isRightDirection ? -10 : 10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.05, rotate: isRightDirection ? 5 : -5 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 15,
          }}
          viewport={{ once: true }}
          className="absolute top-0 h-28 w-28 xsmd:size-32 smd:size-40 rounded-full border-8 z-20 flex items-center justify-center overflow-hidden"
          style={{
            left: !isRightDirection ? '0' : 'auto',
            right: isRightDirection ? '0' : 'auto',
            backgroundColor: backgroundColor,
            borderColor: borderColor,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              height={100}
              width={100}
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MissionBanner;
