'use client'; // Required for Next.js App Router

import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import defaultimage from '../../../assets/default.png';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

// Custom Left Arrow
const CustomPrevArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow-left`}
      style={{
        ...style,
        display: 'block',
        left: '-50px',
        zIndex: 20,
        fontSize: '40px',
        color: '#8B8000',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );
};

// Custom Right Arrow
const CustomNextArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow-right`}
      style={{
        ...style,
        display: 'block',
        right: '-50px',
        zIndex: 20,
        fontSize: '40px',
        color: '#8B8000',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );
};

function Testimonials() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  // Force re-render of slider on component mount to ensure autoplay works
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full mt-10 max-w-6xl mx-auto relative py-16 bg-[#fdfbef] font-['Inter',sans-serif]">
      {/* Background dots pattern */}
      <div className="absolute inset-0 grid grid-cols-12 gap-8">
        {[...Array(60)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-[#D4B354] opacity-40"></div>
        ))}
      </div>

      {/* Title */}
      <div className="flex justify-center mb-12">
        <div className="bg-[#FFD700] text-[#333] font-bold text-3xl px-8 py-3 rounded-tl-[30px] rounded-br-[30px] rounded-xl shadow-md z-10">
          TESTIMONIALS
        </div>
      </div>

      <div className="relative px-12 mt-[20px]">
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="px-2">
              <div className="rounded-tl-[30px] rounded-br-[30px] rounded-xl">
                <div className="bg-[#FFD700] p-4 relative rounded-tl-[30px] rounded-br-[30px] rounded-xl">
                  {/* Profile section with image on left */}
                  <div className="flex items-start mb-4">
                    <div className="mr-3">
                      <Image
                        src={item.img}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover -mt-[35px] left-0 z-10"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#333]">{item.name}</h3>
                      <p className="text-sm">{item.year}</p>
                    </div>
                  </div>

                  {/* Quote section with bold quotation marks */}
                  <div className="relative px-6 py-2">
                    <div
                      className="absolute top-0 left-0 text-[#333] font-bold text-4xl"
                      style={{ lineHeight: '1' }}
                    >
                      &apos;
                    </div>
                    <p className="text-[#333] mb-6 pl-4">{item.quote}</p>
                    <div
                      className="absolute bottom-0 right-0 text-[#333] font-bold text-4xl"
                      style={{ lineHeight: '1' }}
                    >
                      &apos;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: 'Samit Ranjan Patro',
    year: '2019-23',
    img: defaultimage,
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'Samit Ranjan Patro',
    year: '2019-23',
    img: defaultimage,
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'Samit Ranjan Patro',
    year: '2019-23',
    img: defaultimage,
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'Samit Ranjan Patro',
    year: '2019-23',
    img: defaultimage,
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

export default Testimonials;
