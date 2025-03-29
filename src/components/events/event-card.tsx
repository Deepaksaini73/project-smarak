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
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full ">
          {event.image && (
            <Image
              src={event.image}
              alt={event.name}
              className="h-full w-full object-cover opacity-80"
              width={500}
              height={200}
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-xl font-bold text-white">{event.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                className="text-white uppercase"
                variant={event.isTeamEvent ? 'secondary' : 'outline'}
              >
                {event.isTeamEvent ? 'Team' : 'Individual'}
              </Badge>
              <Badge variant="outline" className="text-white ">
                {event.eventType}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.startTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>{formatTime(event.startTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{event.venue}</span>
            </div>
            {event.isTeamEvent && (
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                <span>
                  {event.minParticipants || 1} - {event.maxParticipants || 'unlimited'} participants
                </span>
              </div>
            )}
          </div>
        </div>

        {isRegistered && event.isTeamEvent && teamCode && (
          <div className="mt-3 p-2 border rounded-md bg-secondary/10">
            <div className="flex flex-col space-y-1">
              <p className="text-xs font-medium">Your Team Code:</p>
              <div className="flex items-center justify-between">
                <code className="text-xs bg-secondary/30 px-2 py-1 rounded">{teamCode}</code>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={copyTeamCode}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isRegistered ? (
          <div className="w-full grid grid-cols-2 gap-2">
            <Button variant="secondary" className="col-span-1" disabled>
              <Check className="h-4 w-4 mr-1" />
              Registered
            </Button>
            <Button
              variant="destructive"
              className="col-span-1"
              onClick={() => onDeRegister && onDeRegister(event)}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Withdraw
            </Button>
          </div>
        ) : (
          <Button className="w-full" variant="default" onClick={() => onRegister(event)}>
            Register Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
