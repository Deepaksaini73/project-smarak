import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, Calendar, MapPin, Users, ArrowRight, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import { Registration } from '@/types/registration';
import Image from 'next/image';

interface EventsContentProps {
  registrations: Registration[];
  isLoading: boolean;
}

export const EventsContent: React.FC<EventsContentProps> = ({ registrations, isLoading }) => {
  const formatDate = (date: string | Date) => {
    try {
      return format(new Date(date), 'PPP p');
    } catch (e) {
      return 'Date not available';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#554400]" />
      </div>
    );
  }

  if (registrations.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-[#FFD700]/50 rounded-lg bg-[#fefbed] px-4 flex flex-col items-center">
        <div className="flex justify-center items-center mb-4">
          <Ticket className="h-12 w-12 text-[#FFD700]" />
        </div>
        <h3 className="mt-4 text-xl font-semibold font-outfit text-[#554400]">
          No registrations found
        </h3>
        <p className="mt-3 text-gray-600 font-outfit">
          You haven&apos;t registered for any events yet. Explore our upcoming events and join the
          excitement!
        </p>
        <Button
          className="mt-6 bg-[#FFD700] hover:bg-[#e6c200] text-[#554400] font-outfit font-medium flex items-center gap-2 px-5 py-2 h-auto"
          onClick={() => (window.location.href = '/events')}
        >
          Browse Events
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-semibold font-outfit text-[#554400]">Registered Events</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {registrations.map(registration => (
          <Card
            key={registration.id}
            className="overflow-hidden border border-[#FFD700]/20 shadow-sm hover:shadow-md transition-shadow bg-[#fefbed]"
          >
            <CardHeader className="pb-3 border-b border-[#FFD700]/20">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-outfit text-xl text-[#554400]">
                    {registration.event.name}
                  </CardTitle>
                  <CardDescription className="flex gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className="font-outfit border-[#554400]/30 text-[#554400]"
                    >
                      {registration.event.eventType}
                    </Badge>
                    <Badge
                      variant={registration.isTeam ? 'secondary' : 'default'}
                      className={`font-outfit ${registration.isTeam ? 'bg-[#554400]/10 text-[#554400] hover:bg-[#554400]/15' : 'bg-[#FFD700] text-[#554400] hover:bg-[#e6c200]'}`}
                    >
                      {registration.isTeam ? 'Team' : 'Individual'}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="space-y-4">
                <div className="flex items-center text-sm font-outfit">
                  <Calendar className="h-4 w-4 mr-3 text-[#554400]" />
                  <span className="text-gray-700">{formatDate(registration.event.startTime)}</span>
                </div>
                <div className="flex items-center text-sm font-outfit">
                  <MapPin className="h-4 w-4 mr-3 text-[#554400]" />
                  <span className="text-gray-700">{registration.event.venue}</span>
                </div>

                {registration.isTeam && (
                  <>
                    <Separator className="my-4 bg-[#FFD700]/30" />
                    <div className="space-y-3 bg-[#fefbed] p-3 rounded-md">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium font-outfit text-[#554400]">
                          Team: <span className="text-[#8D0000]">{registration.teamName}</span>
                        </p>
                        {registration.teamCode && (
                          <Badge
                            variant="outline"
                            className="font-outfit border-[#554400]/30 bg-white text-[#554400]"
                          >
                            Code: {registration.teamCode}
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium font-outfit flex items-center text-[#554400]">
                          <Users className="h-4 w-4 mr-2 text-[#554400]" />
                          Team Members ({registration.teamMembers.length})
                        </p>
                        <ul className="text-sm space-y-2 pl-6 font-outfit">
                          {registration.teamMembers.map(member => (
                            <li key={member.id} className="flex justify-between items-center">
                              <span className="text-gray-700">{member.user.name}</span>
                              {member.isTeamLead && (
                                <Badge className="text-xs bg-[#FFD700] text-[#554400] hover:bg-[#e6c200]">
                                  Team Lead
                                </Badge>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
