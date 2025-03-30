import Image from 'next/image';

export default function Hero() {
  return (
    <div className="min-h-screen bg-[#FFD700] flex items-center justify-between w-full">
      <div className="flex items-center justify-between w-1/2">
        <div id="social" className="flex items-center flex-col justify-between min-h-[50dvh]">
          <div className="flex flex-col items-center justify-center gap-5">
            <Image src={'/images/ig.png'} alt="Instagram" width={30} height={30} className="mx-2" />
            <Image src={'/images/yt.png'} alt="Youtube" width={30} height={30} className="mx-2" />
            <Image src={'/images/fb.png'} alt="Facebook" width={15} height={15} className="mx-2" />
          </div>
          <div className="mt-10 !h-full ">
            <h3
              className="font-opensans rotate-[270deg] font-bold text-4xl text-[#574900] !h-full"
              style={{ letterSpacing: '0.375rem', whiteSpace: 'nowrap' }}
            >
              FOLLOW US:{' '}
            </h3>
          </div>
        </div>
        <div id="middle" className="flex flex-col items-start ">
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
            className="font-outfit font-semibold text-[22px] text-[#463700] my-20 max-w-[530px] w-full"
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
      <div id="image" className="h-full w-1/2 flex justify-end">
        <div className="w-[80%] ">
          <Image
            src={'/images/hero.png'}
            alt="Hero"
            width={1000}
            height={1000}
            className="h-screen object-fit object-center w-full rounded-l-[138px]"
          />
        </div>
      </div>
    </div>
  );
}
