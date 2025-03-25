"use client"
import CountdownTimer from './countdown';
import React, { useEffect } from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader } from "lucide-react"; 

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const targetDate = new Date();
  targetDate.setMonth(3);
  targetDate.setDate(12);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.3,
        when: "beforeChildren"
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 1.2 
      }
    }
  };
  
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 2.8 + (index * 0.5), 
        ease: "easeOut"
      }
    })
  };
  
  const clipRevealVariants = {
    hidden: { 
      opacity: 0, 
      clipPath: "inset(0 100% 0 0)" 
    },
    visible: { 
      opacity: 1, 
      clipPath: "inset(0 0% 0 0)",
      transition: { 
        duration: 1.5, 
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={cn(
      "min-h-screen w-full relative flex flex-col items-center justify-center text-white px-6 overflow-hidden",
      className
    )}>
      <div className="absolute inset-0 blueprint-bg opacity-10 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-construction-grey/90 to-black/90 z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 w-24 h-24 construction-pattern"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute bottom-0 right-0 w-24 h-24 construction-pattern"
      />
      
      <motion.div 
        initial="hidden"
        animate={["visible", "animate"]}
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 0.2,
            scale: 1,
            transition: {
              duration: 1.2,
              ease: "easeOut"
            }
          },
          animate: {
            rotate: 360,
            transition: {
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }
          }
        }}
        className="absolute -left-16 top-1/4 w-40 h-40 border-8 border-dashed rounded-full border-construction-yellow/20"
      />
      
      <motion.div 
        initial="hidden"
        animate={["visible", "animate"]}
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 0.2,
            scale: 1,
            transition: {
              duration: 1.2,
              ease: "easeOut"
            }
          },
          animate: {
            rotate: -360,
            transition: {
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }
          }
        }}
        className="absolute -right-20 bottom-1/4 w-48 h-48 border-8 border-dashed rounded-full border-construction-orange/20"
      />
      
      <div className="container max-w-6xl md:max-w-5xl mx-auto z-10 pt-10 pb-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative flex flex-col items-center"
        >
          
          <div 
            className="flex justify-center mb-6"
          >
            <motion.h1 
              variants={clipRevealVariants}
              initial="hidden"
              animate="visible"
              className="text-xl md:text-2xl lg:text-3xl font-bebas tracking-wider text-center text-white leading-tight mb-2"
            >
              Get Ready for the Ultimate Civil Engineering Event of the Year!
            </motion.h1>
          </div>

          <motion.div 
            variants={titleVariants}
            className="relative mb-10 flex flex-col items-center"
          >
            <div className="relative text-7xl sm:text-8xl md:text-9xl font-bebas tracking-[0.05em] text-construction-yellow text-center drop-shadow-lg">
              SMARAK
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 2.3,
                  ease: "easeOut" 
                }}
                className="absolute -top-5 -right-16 text-sm md:text-base font-montserrat font-medium text-construction-orange bg-black/70 px-2.5 py-1.5 rounded-md border border-construction-orange/30"
              >
                2025
              </motion.span>
            </div>
            <div className="text-sm md:text-base uppercase tracking-[0.15em] font-medium text-construction-white/80 mt-2 text-center">
              NIT Rourkela
            </div>
          </motion.div>
         
          <motion.div 
            variants={headingVariants}
            custom={0}
            className=" mb-10 w-full"
          >
            <CountdownTimer targetDate={targetDate} />
          </motion.div>
          
          <motion.div
            variants={headingVariants}
            custom={1} 
            className="flex items-center justify-center gap-2 py-3 px-2 md:px-6 bg-construction-orange/20 border border-construction-orange/30 rounded-md"
          >
            <motion.div animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2 }}>
            <Loader 
              className="text-construction-yellow"
            />
            </motion.div>
            <span className="text-sm md:text-md font-montserrat text-construction-yellow">
              Website Under Construction - Coming Soon
            </span>
          </motion.div>
          
        </motion.div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,204,0,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
      </div>
    </div>
  );
};

export default Hero;