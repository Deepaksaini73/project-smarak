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
  borderRadius = '45px',
  imageClassName = '',
  labelClassName = '',
  containerClassName = '',
}) => {
  const CardContent = () => (
    <div
      className={`w-full max-w-[${typeof width === 'number' ? `${width}px` : width}] h-[${typeof height === 'number' ? `${height}px` : height}] rounded-[15px] rounded-tl-[${borderRadius}] mx-auto ${containerClassName}`}
      style={{ maxWidth: typeof width === 'number' ? `${width}px` : width }}
    >
      <div
        className={`relative rounded-[12px] rounded-br-[${borderRadius}] rounded-tl-[${borderRadius}] h-full`}
      >
        <Image
          src={imgSrc}
          alt={imgName}
          className={`w-full h-full rounded-[12px] rounded-br-[${borderRadius}] rounded-tl-[${borderRadius}] object-cover ${imageClassName}`}
          width={typeof width === 'number' ? width : 340}
          height={typeof height === 'number' ? height : 200}
          style={{ height: typeof height === 'number' ? `${height}px` : height }}
        />
        <p
          className={`absolute -bottom-[10px] -right-[15px] px-[25px] py-[8px] rounded-[12px] rounded-br-[${borderRadius}] rounded-tl-[${borderRadius}] shadow-2xl h-[40px] whitespace-nowrap font-outfit text-sm md:text-base ${labelClassName}`}
          style={{ backgroundColor: labelBgColor }}
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
