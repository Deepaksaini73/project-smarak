import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Section } from '@/components/shared/section';
import { sponsorsContent } from '@/config/sponsors';
const SponsorCard = ({
  name,
  description,
  logo,
  website,
}: {
  name: string;
  description: string;
  logo: string;
  website: string;
}) => {
  return (
    <Card className="overflow-hidden border border-[#FFD700]/20 shadow-sm hover:shadow-md transition-shadow font-outfit group bg-[#fefbed] !py-0">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={logo}
            alt={`${name} logo`}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            width={500}
            height={300}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#332900]/90 via-[#332900]/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white font-outfit">{name}</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-5">
        <p className="text-sm text-gray-700 font-outfit">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#554400] hover:text-[#443700] transition-colors font-medium"
        >
          Visit Website <ExternalLink size={16} className="ml-1" />
        </a>
      </CardFooter>
    </Card>
  );
};

const Sponsors = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Section
        title="Our Sponsors & Partners"
        content={
          <p>
            We are grateful to our sponsors and partners who support the CEST Club&apos;s mission of
            fostering civil engineering education and innovation at NIT Rourkela.
          </p>
        }
        image={{
          src: sponsorsContent.sponserHeader,
          name: 'Sponsors and Partners',
          height: 350,
          width: 400,
        }}
        direction="right"
        titleColor="#554400"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsorsContent.sponsorsList.map((sponsor, index) => (
              <SponsorCard key={index} {...sponsor} />
            ))}
          </div>
        </div>
      </section>

      <Section
        title="Become a Sponsor"
        content={
          <p>
            Join our growing list of sponsors and partners who are helping to shape the future of
            civil engineering education. Your support allows us to organize workshops, technical
            visits, and other educational activities.
          </p>
        }
        image={{
          src: sponsorsContent.becomeSponsor,
          name: 'Become a Sponsor',
          height: 350,
          width: 400,
        }}
        direction="left"
        titleColor="#554400"
      />
    </div>
  );
};

export default Sponsors;
