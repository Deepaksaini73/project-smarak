'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel, { SliderItem } from '@/components/shared/carousel';

export interface EventItem extends SliderItem {
  title: string;
  image: string | any;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

const eventsData: EventItem[] = [
  {
    id: 'event-1',
    title: 'Morgan',
    image: '/path/to/image1.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus minima nam odit perferendis sit sint id, rem placeat repellat labore ipsum, ut itaque harum cupiditate quia vitae saepe! Quisquam, tempore.',
    buttonText: 'Register Now',
    buttonLink: '/register/event-1',
  },
  {
    id: 'event-2',
    title: 'Anderson',
    image: '/path/to/image2.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus minima nam odit perferendis sit sint id, rem placeat repellat labore ipsum, ut itaque harum cupiditate quia vitae saepe! Quisquam, tempore.',
    buttonText: 'Register Now',
    buttonLink: '/register/event-2',
  },
  {
    id: 'event-1',
    title: 'Morgan',
    image: '/path/to/image1.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus minima nam odit perferendis sit sint id, rem placeat repellat labore ipsum, ut itaque harum cupiditate quia vitae saepe! Quisquam, tempore.',
    buttonText: 'Register Now',
    buttonLink: '/register/event-1',
  },
  {
    id: 'event-2',
    title: 'Anderson',
    image: '/path/to/image2.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus minima nam odit perferendis sit sint id, rem placeat repellat labore ipsum, ut itaque harum cupiditate quia vitae saepe! Quisquam, tempore.',
    buttonText: 'Register Now',
    buttonLink: '/register/event-2',
  },
  {
    id: 'event-1',
    title: 'Morgan',
    image: '/path/to/image1.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus minima nam odit perferendis sit sint id, rem placeat repellat labore ipsum, ut itaque harum cupiditate quia vitae saepe! Quisquam, tempore.',
    buttonText: 'Register Now',
    buttonLink: '/register/event-1',
  },
  {
    id: 'event-2',
    title: 'Anderson',
    image: '/path/to/image2.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus minima nam odit perferendis sit sint id, rem placeat repellat labore ipsum, ut itaque harum cupiditate quia vitae saepe! Quisquam, tempore.Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus minima nam odit perferendis sit sint id, rem placeat repellat labore ipsum, ut itaque harum cupiditate quia vitae saepe! Quisquam, tempore.',
    buttonText: 'Register Now',
    buttonLink: '/register/event-2',
  },
];

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
          <h2 className="text-2xl text-olive-700 mb-2 font-semibold font-sans">{title}</h2>

          <p className="text-gray-700 mb-4 line-clamp-4 overflow-hidden font-sans">{description}</p>

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
      titleClassName="bg-yellow-400 text-gray-900"
      items={eventsData}
      slidesToShow={3}
      autoplay={false}
      autoplaySpeed={3000}
      renderItem={renderEventCard}
      dots={false}
    />
  );
};

export default EventsCarousel;
