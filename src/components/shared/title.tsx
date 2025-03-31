import { cn } from '@/lib/utils';
import React from 'react';

export default function Title({
  title,
  titleClassName,
}: {
  title: string;
  titleClassName?: string;
}) {
  return (
    <div className="flex justify-center mb-5">
      <div
        className={cn(
          'bg-yellow-400 text-gray-900 text-3xl xsmd:text-4xl md:text-5xl px-6 py-2 shadow-md z-10 font-outfit font-bold',
          titleClassName
        )}
        style={{
          borderRadius: '25px 5px 25px 5px',
        }}
      >
        {title}
      </div>
    </div>
  );
}
