import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  imgSrc: string;
  imgName: string;
  href?: string;
  width?: string | number;
  height?: string | number;
  labelBgColor?: string;
  borderRadius?: string;
  imageClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export const ImageCard: React.FC<CardProps> = ({
  imgSrc,
  imgName,
  href,
  width = '400px',
  height = '250px',
  labelBgColor = '#FFD700',
  borderRadius = '30px',
  imageClassName = '',
  labelClassName = '',
  containerClassName = '',
}) => {
  const CardContent = () => (
    <div
      className={`w-full max-w-[${typeof width === 'number' ? `${width}px` : width}] h-[${typeof height === 'number' ? `${height}px` : height}] rounded-[8px] mx-auto shadow-2xl ${containerClassName}`}
      style={{
        maxWidth: typeof width === 'number' ? `${width}px` : width,
        borderTopLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
      }}
    >
      <div
        className={`relative rounded-[5px] h-full`}
        style={{
          borderTopLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        }}
      >
        <Image
          src={imgSrc}
          alt={imgName}
          className={`w-full h-full rounded-[8px] object-cover ${imageClassName}`}
          width={typeof width === 'number' ? width : 500}
          height={typeof height === 'number' ? height : 500}
          style={{
            height: typeof height === 'number' ? `${height}px` : height,
            borderTopLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
          }}
        />
        <p
          className={`absolute -bottom-[10px] -right-[15px] px-[25px] py-[8px] rounded-[8px] shadow-2xl h-[40px] whitespace-nowrap font-outfit text-sm md:text-base ${labelClassName}`}
          style={{
            backgroundColor: labelBgColor,
            borderTopLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
          }}
        >
          {imgName}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full md:w-auto">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};
