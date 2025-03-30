import Image from 'next/image';
import React from 'react';

interface MissionBannerProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  backgroundColor?: string;
  shadowColor?: string;
  borderColor?: string;
}

const MissionBanner: React.FC<MissionBannerProps> = ({
  title = 'Your Content Here',
  description = 'Add any text or content in this area.',
  imageUrl = '',
  backgroundColor = '#FFDE00',
  shadowColor = '#574900',
  borderColor = '#574900',
}) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto my-8 px-4">
      <div className="relative">
        {/* Dark shadow part */}
        <div
          className="absolute top-3 left-0 h-36 z-0"
          style={{
            width: 'calc(100% - 50px)',
            backgroundColor: shadowColor,
            // borderRadius: '0px 0px 0px 40px',
            clipPath: 'polygon(-10% -100%, 100% 0%, 100% 5%, 100% 72%, 10% 100%)',
            transform: 'translateX(-10px) translateY(8px)',
          }}
        ></div>

        <div
          className="relative h-32 z-10 top-0"
          style={{
            width: 'calc(100% - 80px)',
            backgroundColor: backgroundColor,
            clipPath: 'polygon(5% 50%, 0% 0%, 100% 5%, 100% 100%, 10% 100%)',
          }}
        >
          <div className="h-full flex flex-col justify-center p-6 ml-10">
            <h2 className="text-xl font-bold mb-1 font-outfit">{title}</h2>
            <p className="text-gray-800 font-quicksand">{description}</p>
          </div>
        </div>

        <div
          className="absolute top-0 right-0 h-40 w-40 rounded-full border-8 z-20 flex items-center justify-center overflow-hidden"
          style={{
            backgroundColor: backgroundColor,
            borderColor: borderColor,
          }}
        >
          <Image
            height={100}
            width={100}
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MissionBanner;
