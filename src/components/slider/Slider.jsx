'use client'; // Required for Next.js App Router

import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import nitlogo from '../../../assets/nit-rourkela-logo.png';
import smallicon from '../../../assets/small icon.png';
import defaultimage from '../../../assets/default.png';
import bgDot from '../../../assets/bg-dot.png';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import './style.css';

// Custom Left Arrow
const CustomPrevArrow = props => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow-left`}
      style={{
        ...style,
        display: 'block',
        left: '35px', // Adjust for smaller screens
        zIndex: 20,
        fontSize: '30px',
        color: 'black',
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
    </div>
  );
};

function App() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: 'linear',
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768, // Medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 500, // Tablet size
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
    <div className="w-full max-w-5xl mx-auto relative">
      {/* Events banner */}
      <div className="flex justify-center mb-5">
        <div className="bg-yellow-400 text-gray-900 font-bold text-xl px-6 py-2 rounded-[5px] rounded-tl-[18px] rounded-br-[18px] shadow-md z-10">
          EVENTS
        </div>
      </div>

      <div className="mt-2 mb-10 relative">
        {/* Background Image - right side (third card) */}
        <div className="md:block hidden absolute -top-30 -right-60 h-60 w-1/3 z-0">
          <Image src={bgDot} alt="Background Pattern" fill className="object-cover opacity-100" />
        </div>
        <div className="md:block hidden absolute top-30 -right-60 h-70 w-1/3 z-0">
          <Image src={bgDot} alt="Background Pattern" fill className="object-cover opacity-100" />
        </div>

        <Slider {...settings}>
          {data.map(d => (
            <div
              key={d.name}
              className="bg-white h-full text-black rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col h-full">
                <div className="h-[180px] overflow-hidden group">
                  <Image
                    src={d.img}
                    alt={d.name}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                    width={100}
                    height={100}
                  />
                </div>

                <div className="p-4 flex flex-col items-start justify-start flex-grow">
                  <p className="text-lg font-medium mb-1">{d.name}</p>
                  <p className="text-left text-sm text-gray-600 mb-4">{d.review}</p>

                  <button className="mt-auto py-2 px-4 bg-[#554400] hover:bg-[#554400]  text-white font-medium rounded-md transition-colors duration-300 text-sm">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

const data = [
  {
    name: 'Morgan',
    img: defaultimage,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.......',
  },
  {
    name: 'Anderson',
    img: defaultimage,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.......',
  },
  {
    name: 'Ebayo',
    img: defaultimage,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.......',
  },
  {
    name: 'Ruie',
    img: defaultimage,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.......',
  },
  {
    name: 'Miams',
    img: defaultimage,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.......',
  },
];

export default App;
