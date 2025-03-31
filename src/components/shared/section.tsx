'use client';

import React, { ReactNode } from 'react';
import { ImageCard } from './image-card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface SectionProps {
  title: string;
  content: ReactNode;
  image: {
    src: string;
    name: string;
    height?: number;
    width?: number;
  };
  direction?: 'left' | 'right';
  titleColor?: string;
}

export const HeaderTitle = ({
  title,
  titleColor = '#554400',
  className,
}: {
  title: string;
  titleColor?: string;
  className?: string;
}) => {
  return (
    <div className="inline-block mb-6 py-1 relative">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className={`text-5xl font-bold text-[${titleColor}] font-outfit`}
      >
        {title}
      </motion.h1>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: '7rem', opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        viewport={{ once: true }}
        className={cn(`absolute h-2 bg-[${titleColor}] mt-1`, className)}
      ></motion.div>
    </div>
  );
};

export function Section({
  title,
  content,
  image,
  direction = 'right',
  titleColor = '#554400',
}: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
      className={`px-8 py-8 relative my-10`}
    >
      <div className="max-w-7xl mx-auto">
        <HeaderTitle title={title} titleColor={titleColor} />

        <div className="flex flex-col md:flex-row gap-8 mt-5">
          {direction === 'right' ? (
            <div className="flex flex-col-reverse slg:flex-row items-start justify-between w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="slg:w-1/2 mt-8 slg:mt-0"
              >
                <div className="text-gray-800 leading-relaxed mb-6 font-outfit text-lg">
                  {content}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="slg:w-1/2 flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <ImageCard
                    imgName={image.name}
                    imgSrc={image.src}
                    height={image.height || 350}
                    width={image.width || 400}
                  />
                </motion.div>
              </motion.div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-start justify-between w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className=""
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <ImageCard
                    imgName={image.name}
                    imgSrc={image.src}
                    height={image.height || 350}
                    width={image.width || 350}
                  />
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="md:w-2/3 md:pl-20 mt-8"
              >
                <div className="text-gray-800 leading-relaxed mb-6 font-outfit text-lg">
                  {content}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
