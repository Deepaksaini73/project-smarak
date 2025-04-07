import { EventItem } from './types';

export const eventsData: EventItem[] = [
  {
    id: 'gati-sheel',
    title: 'Gati Sheel',
    image: 'https://res.cloudinary.com/dpt4bhayi/image/upload/v1743421106/gatisheel_bc5b5p.png',
    description:
      'An interactive physics-based competition where teams design and construct a functional roller coaster track using engineering principles. The objective is to create a track where a marble remains in motion for the longest possible duration while maintaining stability, efficiency, and aesthetic appeal.',
    buttonText: 'Read More',
    buttonLink: '/events',
  },
  {
    id: 'vastukala',
    title: 'Vastukala',
    image: 'https://res.cloudinary.com/dpt4bhayi/image/upload/v1743422393/vastukala_vov32k.png',
    description:
      'Teams will design and present a sustainable city layout, incorporating smart infrastructure, renewable energy, efficient water and waste management, and optimized transportation. The event encourages innovative urban planning solutions for eco-friendly and efficient cities.',
    buttonText: 'Read More',
    buttonLink: '/events',
  },
  {
    id: 'setu',
    title: 'Setu',
    image: 'https://res.cloudinary.com/dpt4bhayi/image/upload/v1743426211/setu_qoh6k6.jpg',
    description:
      'A hands-on civil engineering challenge where teams design and construct a stable, load-bearing arch bridge using sand, bricks, and water. This event mirrors real-world bridge construction, testing participants ability to balance structural stability, efficiency, and aesthetic design under constraints.',
    buttonText: 'Read More',
    buttonLink: '/events',
  },
  {
    id: 'pramanam',
    title: 'Pramanam',
    image: 'https://res.cloudinary.com/dpt4bhayi/image/upload/v1743422392/paramanam_tdoiqx.png',
    description:
      'Team-based quiz competition testing fundamental knowledge across various subjects including general awareness, current affairs, science, and history. Multiple challenging rounds will assess analytical thinking and problem-solving abilities. Duration: 60 minutes.',
    buttonText: 'Read More',
    buttonLink: '/events',
  },
  {
    id: 'shilp-setu',
    title: 'Shilp Setu',
    image: 'https://res.cloudinary.com/dpt4bhayi/image/upload/v1743435466/slipshetu_g3sg3n.webp',
    description:
      'Design and construct a stable, load-bearing arch bridge using materials like sand, bricks, and water. Bridges will be evaluated on strength, load-bearing capacity, and design aesthetics. Encourages innovation in construction techniques. Duration: 180 minutes.',
    buttonText: 'Read More',
    buttonLink: '/events',
  },
  {
    id: 'SAHAYATRI',
    title: 'SAHAYATRI',
    image: 'https://res.cloudinary.com/dpt4bhayi/image/upload/v1743445129/sahaytri_wvhsxu.png',
    description:
      'Participants will leverage machine learning to predict and mitigate road accidents by analyzing real-world data on traffic, road geometry, weather, and driver behavior, aiming to enhance road safety with data-driven insights.',
    buttonText: 'Register On Unstop',
    buttonLink: 'https://unstop.com/hackathons/sahayatri-nit-rourkela-1457525',
  },
];

export const SAHAYATRI = {
  id: 'SAHAYATRI',
  link: 'https://unstop.com/hackathons/sahayatri-nit-rourkela-1457525',
  name: 'SAHAYATRI',
  description:
    'Participants will leverage machine learning to predict and mitigate road accidents by analyzing real-world data on traffic, road geometry, weather, and driver behavior, aiming to enhance road safety with data-driven insights.',
  eventType: 'Hackathon',
  venue: 'Online',
  startTime: new Date('2023-12-01T10:00:00Z'),
  endTime: new Date('2023-12-01T16:00:00Z'),
  duration: 6,
  isTeamEvent: true,
  minParticipants: 2,
  maxParticipants: 5,
  image: 'https://res.cloudinary.com/dpt4bhayi/image/upload/v1743445129/sahaytri_wvhsxu.png',
  status: 'upcoming',
  createdAt: new Date(),
  updatedAt: new Date(),
  _count: {
    registrations: 0,
  },
};
