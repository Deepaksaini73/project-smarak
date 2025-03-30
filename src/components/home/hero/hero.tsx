import Image from 'next/image';

export default function Hero() {
  return (
    <div className="min-h-screen bg-[#FFD700] flex sslg:flex-row flex-col  items-center justify-center sslg:justify-between w-full relative">
      <Image
        src={'/images/dots.png'}
        alt="dots"
        width={100}
        height={100}
        className="absolute top-2 left-0"
      />
      {/* <Image
        src={'/images/dots.png'}
        alt="dots"
        width={100}
        height={100}
        className="absolute -bottom-1 left-[820px] "
      /> */}
      <div className="flex sslg:flex-row flex-row-reverse items-center justify-between  w-full my-36">
        <div
          id="social"
          className="hidden smd:flex sslg:hidden xlg:flex items-center flex-col justify-between min-h-[50dvh] -mr-20 sslg:-ml-20"
        >
          <div className="flex flex-col items-center justify-center gap-5">
            <Image src={'/images/ig.png'} alt="Instagram" width={30} height={30} className="mx-2" />
            <Image src={'/images/yt.png'} alt="Youtube" width={30} height={30} className="mx-2" />
            <Image src={'/images/fb.png'} alt="Facebook" width={15} height={15} className="mx-2" />
          </div>
          <div className="mt-10 !h-full">
            <h3
              className="font-opensans rotate-[270deg] font-bold text-4xl text-[#574900] !h-full"
              style={{ letterSpacing: '0.375rem', whiteSpace: 'nowrap' }}
            >
              FOLLOW US:{' '}
            </h3>
          </div>
        </div>
        <div id="middle" className="flex flex-col items-start px-5 smd:pl-10 xlg:-ml-10">
          <h1
            className="font-outfit font-semibold text-5xl text-[#312900] tracking-wide"
            style={{ lineHeight: '55px' }}
          >
            SMARAK & its <br /> Tagline for Events
          </h1>
          <p className="text-[#8D0000] font-outfit font-semibold text-lg mt-2">
            “Taking Pride, Getting Fascinated”
          </p>
          <p
            className="font-outfit font-semibold text-[22px] text-[#463700] my-10 smd:my-20 max-w-[530px] w-full"
            style={{
              lineHeight: '112.33%',
              letterSpacing: '0.00733333px',
            }}
          >
            At CEST, we are dedicated to fostering a thriving community of civil engineering
            enthusiasts. Our club serves as a platform for students to explore, learn, and excel in
            various aspects of civil engineering. Through a range of activities, workshops, and
            events, we aim to broaden the horizons of our members and enhance their knowledge and
            skills.
          </p>
          <button className="button-primary">Download Brochure</button>
        </div>
      </div>
      <Image
        src={'/images/hero.png'}
        alt="Hero"
        width={500}
        height={500}
        className="h-full object-fill object-center w-full sslg:hidden block rounded-t-[100px]"
      />
      <div id="image" className="h-full hidden sslg:flex justify-end w-full">
        <div className="w-[95%] xlg:w-[85%] h-full">
          <Image
            src={'/images/hero.png'}
            alt="Hero"
            width={1000}
            height={1000}
            className="h-screen object-fill object-center w-full rounded-l-[138px]"
          />
        </div>
      </div>
    </div>
  );
}
