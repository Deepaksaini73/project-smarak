import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  
  return (
    <div className={cn("flex justify-center items-center space-x-4 md:space-x-6", className)}>
      <CountdownUnit value={timeLeft.days} label="DAYS" />
      <div className="text-construction-yellow text-xl md:text-3xl font-bold animate-pulse-soft">:</div>
      <CountdownUnit value={timeLeft.hours} label="HOURS" />
      <div className="text-construction-yellow text-xl md:text-3xl font-bold animate-pulse-soft">:</div>
      <CountdownUnit value={timeLeft.minutes} label="MINS" />
      <div className="text-construction-yellow text-xl md:text-3xl font-bold animate-pulse-soft xsmd:block hidden">:</div>
      <CountdownUnit value={timeLeft.seconds} label="SECS" />
    </div>
  );
};

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  return (
    <div className={`${label=="SECS" ? "hidden" : ""} xsmd:flex flex-col items-center `}>
      <div className="relative overflow-hidden bg-black/80 text-construction-yellow w-14 h-14 md:w-20 md:h-20 flex justify-center items-center rounded-md backdrop-blur-sm border border-construction-yellow/20">
        <span className="text-2xl md:text-4xl font-bebas tracking-wider">
          {value < 10 ? `0${value}` : value}
        </span>
        <div className="absolute inset-x-0 top-0 h-[1px] bg-construction-yellow/30"></div>
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-construction-yellow/30"></div>
        <div className="absolute inset-y-0 left-0 w-[1px] bg-construction-yellow/30"></div>
        <div className="absolute inset-y-0 right-0 w-[1px] bg-construction-yellow/30"></div>
      </div>
      <span className="text-xs mt-1 font-medium text-construction-grey">{label}</span>
    </div>
  );
};

export default CountdownTimer;