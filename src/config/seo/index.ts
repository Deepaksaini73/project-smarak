import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Smarak 2025 | Annual Civil Engineering Fest of NIT Rourkela',
    description:
      'Join Smarak 2025, the premier civil engineering fest at NIT Rourkela from April 11-13, 2025. Participate in competitions like Gati Sheel, Vastukala, Setu, attend workshops on STAAD Pro, Revit, and 3D printing. Fusing innovation with a greener tomorrow.',
    keywords: [
      'Smarak 2025',
      'NIT Rourkela',
      'civil engineering fest',
      'Gati Sheel',
      'Vastukala',
      'Setu',
      'Shilp Setu',
      'Pramanam',
      'STAAD Pro workshop',
      'Revit workshop',
      '3D printing',
      'engineering competitions',
      'BIS Seminar',
      'sustainable engineering',
      'green infrastructure',
    ],
    authors: [{ name: 'NIT Rourkela' }],
    creator: 'BIS Standard Club Civil & CEST Club, NIT Rourkela',
    publisher: 'NIT Rourkela',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://smaraknitrkl.in'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'Smarak 2025 | Annual Civil Engineering Fest of NIT Rourkela',
      description:
        'Join Smarak 2025, the premier civil engineering fest celebrating the fusion of innovation with sustainable practices at NIT Rourkela from April 11-13, 2025.',
      url: 'https://smaraknitrkl.in',
      siteName: 'Smarak 2025',
      images: [
        {
          url: 'https://www.smaraknitrkl.in/images/banner.jpeg',
          width: 1200,
          height: 630,
          alt: 'Smarak 2025 Banner',
        },
        {
          url: 'https://www.smaraknitrkl.in/images/mai.jpeg',
          width: 500,
          height: 500,
          alt: 'Smarak 2025 Logo',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Smarak 2025 | Annual Civil Engineering Fest of NIT Rourkela',
      description:
        'Join Smarak 2025, the premier civil engineering fest at NIT Rourkela from April 11-13, 2025.',
      images: [
        'https://www.smaraknitrkl.in/images/banner.jpeg',
        'https://www.smaraknitrkl.in/images/mai.jpeg',
      ],
      creator: '@smarak_nitr',
    },
    category: 'Education',
    robots: {
      index: true,
      follow: true,
    },
    other: {
      'event:date': '2025-04-11/2025-04-13',
      'event:location': 'NIT Rourkela, Odisha, India',
      'event:organizer': 'BIS Standard Club Civil & CEST Club, NIT Rourkela',
      'event:contact': 'smarak.nitrkl@gmail.com',
    },
  };
};
