'use client';

import React, { useEffect, ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { cn } from '@/lib/utils';

import './slider.css';
import Title from './title';

export interface SliderItem {
  id: string;
  [key: string]: any;
}

interface CustomArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export interface CarouselProps<T extends SliderItem> {
  title?: string;
  titleClassName?: string;
  items: T[];
  backgroundImage?: string | any;
  className?: string;
  contentClassName?: string;
  slidesToShow?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  pauseOnHover?: boolean;
  infinite?: boolean;
  speed?: number;
  dots?: boolean;
  arrows?: boolean;
  responsive?: Array<{
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll: number;
      [key: string]: any;
    };
  }>;
  renderItem: (item: T) => ReactNode;
  customPrevArrow?: React.ReactNode;
  customNextArrow?: React.ReactNode;
}

const CustomPrevArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => {
  return (
    <button
      type="button"
      aria-label="Previous slide"
      className={cn(className, 'custom-arrow-left')}
      style={{
        ...style,
        display: 'block',
        left: '35px',
        zIndex: 20,
        fontSize: '30px',
        color: 'black',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
      onClick={onClick}
    >
      <FaChevronLeft />
    </button>
  );
};

const CustomNextArrow: React.FC<CustomArrowProps> = ({ className, style, onClick }) => {
  return (
    <button
      type="button"
      aria-label="Next slide"
      className={cn(className, 'custom-arrow-right')}
      style={{
        ...style,
        display: 'block',
        right: '35px',
        zIndex: 20,
        fontSize: '30px',
        color: 'black',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
      onClick={onClick}
    >
      <FaChevronRight />
    </button>
  );
};

function Carousel<T extends SliderItem>({
  title,
  titleClassName,
  items,
  backgroundImage,
  className,
  contentClassName,
  slidesToShow = 3,
  autoplay = true,
  autoplaySpeed = 3000,
  pauseOnHover = true,
  infinite = true,
  speed = 500,
  dots = true,
  arrows = true,
  responsive,
  renderItem,
  customPrevArrow,
  customNextArrow,
}: CarouselProps<T>) {
  const defaultResponsive = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: Math.min(slidesToShow, 3),
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: Math.min(slidesToShow, 2),
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  const sliderSettings = {
    dots,
    infinite,
    speed,
    slidesToShow,
    slidesToScroll: 1,
    autoplay,
    autoplaySpeed,
    pauseOnHover,
    cssEase: 'linear',
    prevArrow: customPrevArrow || (arrows ? <CustomPrevArrow /> : undefined),
    nextArrow: customNextArrow || (arrows ? <CustomNextArrow /> : undefined),
    responsive: responsive || defaultResponsive,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn('w-full max-w-5xl mx-auto relative', className)}>
      {title && <Title title={title} titleClassName={titleClassName} />}

      <div className={cn('mt-2 mb-10', contentClassName)}>
        <Slider {...sliderSettings}>{items.map(item => renderItem(item))}</Slider>
      </div>
    </div>
  );
}

export default Carousel;
