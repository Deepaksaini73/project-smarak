import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Event } from '@/config/events/types';
import { Calendar, Clock, MapPin, Users, Check, Copy, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
  onDeRegister?: (event: Event) => void;
  isRegistered: boolean;
  teamCode?: string;
}

export function EventCard({
  event,
  onRegister,
  onDeRegister,
  isRegistered,
  teamCode,
}: EventCardProps) {
  const formatDate = (date: string | Date) => {
    try {
      return format(new Date(date), 'PPP');
    } catch (e) {
      return 'Date not available';
    }
  };

  const formatTime = (date: string | Date) => {
    try {
      return format(new Date(date), 'p');
    } catch (e) {
      return 'Time not available';
    }
  };

  const copyTeamCode = () => {
    if (teamCode) {
      navigator.clipboard.writeText(teamCode);
      toast.success('Team code copied to clipboard');
    }
  };

  return (
    <Card className="overflow-hidden border border-[#FFD700]/20 shadow-sm hover:shadow-md transition-shadow font-outfit group">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              width={500}
              height={200}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#FFD700]/10 to-[#554400]/10 flex items-center justify-center">
              <Calendar className="h-16 w-16 text-[#554400]/30" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#332900]/90 via-[#332900]/40 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white font-outfit">{event.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                className="bg-[#FFD700] text-[#554400] hover:bg-[#FFD700]/90 uppercase"
                variant={event.isTeamEvent ? 'default' : 'outline'}
              >
                {event.isTeamEvent ? 'Team' : 'Individual'}
              </Badge>
              <Badge variant="outline" className="text-[#fefbed] border-[#fefbed]/60">
                {event.eventType}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-5">
        <div className="space-y-4">
          <p className="text-sm text-gray-700 line-clamp-2 font-outfit">{event.description}</p>

          <div className="space-y-2.5 bg-[#fefbed] p-3 rounded-md border border-[#FFD700]/20">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-[#554400]" />
              <span className="text-[#554400] font-medium">{formatDate(event.startTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-[#554400]" />
              <span className="text-[#554400]">{formatTime(event.startTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-[#554400]" />
              <span className="text-gray-700">{event.venue}</span>
            </div>
            {event.isTeamEvent && (
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-[#554400]" />
                <span className="text-gray-700">
                  {event.minParticipants || 1} - {event.maxParticipants || 'unlimited'} participants
                </span>
              </div>
            )}
          </div>
        </div>

        {isRegistered && event.isTeamEvent && teamCode && (
          <div className="mt-4 p-3 border-2 border-[#FFD700]/30 rounded-md bg-white">
            <div className="flex flex-col space-y-2">
              <p className="text-xs font-medium text-[#554400] flex items-center">
                <div className="h-2 w-2 rounded-full bg-[#FFD700] mr-2"></div>
                Your Team Code:
              </p>
              <div className="flex items-center justify-between">
                <code className="text-xs bg-[#fefbed] px-2 py-1 rounded text-[#8D0000] font-medium">
                  {teamCode}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 border-[#FFD700]/40 text-[#554400] hover:bg-[#fefbed]"
                  onClick={copyTeamCode}
                >
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {isRegistered ? (
          <div className="w-full grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="col-span-1 border-[#FFD700]/30 bg-[#fefbed] text-[#554400] hover:bg-[#fefbed]/80"
              disabled
            >
              <Check className="h-4 w-4 mr-1 text-[#554400]" />
              Registered
            </Button>
            <Button
              variant="destructive"
              className="col-span-1 bg-[#8D0000] hover:bg-[#8D0000]/90"
              onClick={() => onDeRegister && onDeRegister(event)}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Withdraw
            </Button>
          </div>
        ) : (
          <Button
            className="w-full bg-[#554400] hover:bg-[#443700] text-white font-medium"
            onClick={() => onRegister(event)}
          >
            Register Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
