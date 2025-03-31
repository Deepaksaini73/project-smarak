'use client';

import React from 'react';
import Image from 'next/image';
import { footerContent } from '@/config/layouts';
import { ImageCard } from '@/components/shared/image-card';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="text-[#463700]" id="contact">
      <div className="max-w-[84rem] mx-auto px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-6 md:px-5"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
          >
            <ImageCard
              imgSrc={footerContent.images.mapimg}
              imgName="Find Us Here"
              href={footerContent.map}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
          >
            <ImageCard imgSrc={footerContent.images.groupimg} imgName="CEST FAM" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
          >
            <ImageCard imgSrc={footerContent.images.nitrimg} imgName="NIT Rourkela" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-gray-900 mt-6 px-4 md:px-8 font-quicksand"
        >
          <p className="text-base md:text-lg">{footerContent.about}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-[#FFD700] w-full flex flex-col md:flex-row justify-between items-center mt-6 md:mt-10 px-4 md:px-10 py-6 gap-6 md:gap-0"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="w-full md:w-1/3 text-center md:text-left"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-bold mb-2 font-outfit"
          >
            Address
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-sm md:text-md font-outfit text-gray-900"
          >
            Jindal Colony, Bisra Road <br />
            National Institute Of Technology, Rourkela <br />
            Odisha-769008.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full md:w-1/3 flex flex-col items-center justify-center text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Image
              src={footerContent.images.nitlogo}
              alt="NIT Rourkela"
              className="size-20 md:size-28"
              height={400}
              width={400}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full text-xs md:text-sm text-red-900 font-outfit pt-2 md:pt-4 font-semibold"
          >
            © Copyright {new Date().getFullYear()} CEST Club, NITR. All Rights Reserved.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="w-full md:w-1/3 text-center md:text-right"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-bold mb-2 font-outfit"
          >
            Contacts
          </motion.h2>
          <motion.a
            whileHover={{ scale: 1.02, x: -3 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="font-semibold cursor-pointer font-outfit text-sm md:text-base"
            href={`mailto:${footerContent.email}`}
          >
            {footerContent.email}
          </motion.a>
          {footerContent.phone.map((phone, index) => (
            <motion.a
              key={index}
              whileHover={{ scale: 1.02, x: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
              href={`tel:${phone}`}
              className="block font-outfit font-semibold cursor-pointer hover:underline text-sm md:text-base"
            >
              {phone}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
