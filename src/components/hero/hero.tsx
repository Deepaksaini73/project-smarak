"use client"
import CountdownTimer from './countdown';
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";


interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
const targetDate = new Date();
targetDate.setMonth(3);
targetDate.setDate(12);
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;
    
    if (titleElement) {
      titleElement.classList.add('animate-typewriter');
    }
    
    // Animate subtitle after title animation
    const subtitleTimer = setTimeout(() => {
      if (subtitleElement) {
        subtitleElement.classList.add('animate-typewriter');
      }
    }, 3000);
    
    return () => clearTimeout(subtitleTimer);
  }, []);

  return (
    <div className={cn(
      "min-h-screen w-full relative flex flex-col items-center justify-center text-white px-6 overflow-hidden",
      className
    )}>
      <div className="absolute inset-0 blueprint-bg opacity-10 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-construction-grey/90 to-black/90 z-0"></div>
      
      <div className="absolute top-0 left-0 w-24 h-24 construction-pattern"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 construction-pattern"></div>
      
      <div className="absolute -left-16 top-1/4 w-40 h-40 border-8 border-dashed rounded-full border-construction-yellow/20 animate-rotate-gear opacity-20"></div>
      <div className="absolute -right-20 bottom-1/4 w-48 h-48 border-8 border-dashed rounded-full border-construction-orange/20 animate-rotate-gear-reverse opacity-20"></div>
      
      <div className="container max-w-5xl mx-auto z-10 pt-10 pb-20">
        <div className="relative flex flex-col items-center opacity-0 animate-fade-in">
          <div className="relative mb-8 opacity-0 animate-build-in delay-100">
            <div className="relative text-8xl font-bebas tracking-wider text-construction-yellow">
              SMARAK
              <span className="absolute -top-5 -right-16 text-base font-montserrat text-construction-orange bg-black/50 px-2 py-1 rounded">2025</span>
            </div>
            <div className="text-sm uppercase tracking-widest text-construction-white/70 mt-1">
              NIT Rourkela
            </div>
          </div>
          
          <div className="flex justify-center mb-6">
            <h1 
              ref={titleRef}
              className="typewriter text-4xl md:text-5xl font-bebas tracking-wide text-center text-white leading-tight"
            >
              Get Ready for the Ultimate Civil Engineering Event of the Year!
              <span className="typewriter-cursor"></span>
            </h1>
          </div>
          
          <div className="flex justify-center mb-8">
            <h2 
              ref={subtitleRef}
              className="typewriter text-xl md:text-2xl font-montserrat text-center text-construction-yellow/90 max-w-2xl"
            >
              SMARAK 2025 - Coming Soon to NIT Rourkela!
              <span className="typewriter-cursor"></span>
            </h2>
          </div>
          
          <p className="text-lg text-center max-w-3xl mb-8 text-construction-white/80 opacity-0 animate-fade-in-up delay-400">
            Prepare for three days of innovation, knowledge, and technical excellence! A vibrant fest celebrating the essence of Civil Engineering, with eminent scholars, hands-on workshops, and thought-provoking competitions. We are bringing together the best minds in the field to learn, collaborate, and push the boundaries of innovation.
          </p>
          
          <div className="mb-10 w-full opacity-0 animate-fade-in-up delay-500">
            <CountdownTimer targetDate={targetDate} />
          </div>
          
          <p className="text-xl font-montserrat font-semibold mb-6 text-white opacity-0 animate-fade-in-up delay-600">
            Stay Tuned and Don't Miss Out!
          </p>
          
        </div>
      </div>
      
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,204,0,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
      </div>
    </div>
  );
};

export default Hero;