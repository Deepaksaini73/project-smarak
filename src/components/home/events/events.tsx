'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from '@/components/shared/carousel';
import { EventItem } from '@/config/events/types';
import { eventsData } from '@/config/events';

const EventsCarousel: React.FC = () => {
  const renderEventCard = (event: EventItem) => (
    <EventCard
      key={event.id}
      title={event.title}
      description={event.description}
      imageUrl={event.image}
      registerLink={event.buttonLink || '#'}
    />
  );

  interface EventCardProps {
    title: string;
    description: string;
    imageUrl: string | any;
    registerLink: string;
  }

  const EventCard = ({ title, description, imageUrl, registerLink }: EventCardProps) => {
    return (
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
        <div className="w-full h-48 overflow-hidden">
          <Image
            width={100}
            height={100}
            priority
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <h2 className="text-2xl text-olive-700 mb-2 font-semibold font-outfit">{title}</h2>

          <p className="text-gray-700 mb-4 line-clamp-4 overflow-hidden font-quicksand">
            {description}
          </p>

          <Link
            href={registerLink}
            className="py-2 px-4 text-lg bg-[#554400] font-outfit hover:bg-[#453800] text-white font-medium rounded-md transition-colors duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Carousel<EventItem>
      title="EVENTS"
      items={eventsData}
      slidesToShow={3}
      autoplay={true}
      autoplaySpeed={3000}
      renderItem={renderEventCard}
      dots={false}
    />
  );
};

export default EventsCarousel;
