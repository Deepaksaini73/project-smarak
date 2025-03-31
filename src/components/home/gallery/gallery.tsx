import Title from '@/components/shared/title';
import React from 'react';
import Carousel from '@/components/shared/carousel';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { galleryImages } from '@/config/gallery';

export default function Gallery() {
  const renderGalleryItem = (item: {
    id: React.Key | null | undefined;
    src: string | StaticImport;
    alt: string;
  }) => (
    <div key={item.id} className="px-2">
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );

  return (
    <div
      id="gallery"
      className="flex flex-col items-center justify-center w-full min-h-screen py-16"
    >
      <Title title="Gallery" />

      <div className="w-full max-w-7xl px-4 mt-10">
        <Carousel
          items={galleryImages}
          slidesToShow={1}
          autoplay={true}
          autoplaySpeed={5000}
          dots={true}
          arrows={true}
          speed={700}
          renderItem={renderGalleryItem}
          contentClassName="my-10"
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
