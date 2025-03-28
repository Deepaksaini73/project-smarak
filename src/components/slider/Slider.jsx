'use client'; // Required for Next.js App Router

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import nitlogo from '../../../assets/nit-rourkela-logo.png';
import smallicon from '../../../assets/small icon.png';
import defaultimage from '../../../assets/default.png';
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
        zIndex: 10,
        fontSize: '30px',
        color: 'black',
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
        zIndex: 10,
        fontSize: '30px',
        color: 'black',
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
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768, // Medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500, // Tablet size
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" w-full max-w-5xl mx-auto">
      <div className="mt-10 mb-10">
        <Slider {...settings}>
          {data.map(d => (
            <div
              key={d.name}
              className="bg-white h-[450px] text-black rounded-2xl shadow-xl shadow-hand cursor-poi"
            >
              <div className="h-[200px] flex justify-center items-center rounded-t-xl">
                <Image
                  src={d.img}
                  alt={d.name}
                  className="w-full h-full rounded-t-xl transition-transform duration-300 ease-in-out hover:scale-108 rounded-xl"
                  width={100}
                  height={100}
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-4 p-4">
                <p className="text-xl font-semibold">{d.name}</p>
                <p className="text-center text-sm">{d.review}</p>
              </div>

              <div className="flex justify-center -space-x-2 p-4">
                <Image
                  src={smallicon}
                  alt="Avatar 1"
                  width={30}
                  height={30}
                  className="w-8 h-8 rounded-full border border-white"
                />
                <Image
                  src={smallicon}
                  alt="Avatar 2"
                  width={30}
                  height={30}
                  className="w-8 h-8 rounded-full border border-white"
                />
                <Image
                  src={smallicon}
                  alt="Avatar 3"
                  width={30}
                  height={30}
                  className="w-8 h-8 rounded-full border border-white"
                />
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
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Anderson',
    img: defaultimage,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Ebayo',
    img: defaultimage,
    review:
      'Lorem ipsig met, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Ruie',
    img: defaultimage,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    name: 'Miams',
    img: defaultimage,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export default App;
