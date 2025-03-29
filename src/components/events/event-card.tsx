import React from 'react';
import { Event } from '@/config/events/types';
import { Calendar, Users, Clock, MapPin, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
  isRegistered: boolean;
}

export function EventCard({ event, onRegister, isRegistered }: EventCardProps) {
  const formatDate = (date: string | Date) => {
    try {
      return format(new Date(date), 'PPP p');
    } catch (e) {
      return 'Date not available';
    }
  };

  return (
    <Card key={event.id} className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{event.name}</CardTitle>
            <CardDescription className="mt-1">
              <span className="inline-flex items-center text-sm font-medium rounded-full px-2 py-1 bg-primary/10 text-primary">
                {event.eventType}
              </span>
              <span className="ml-2 inline-flex items-center text-sm font-medium rounded-full px-2 py-1 bg-secondary/10 text-secondary">
                {event.isTeamEvent ? 'Team' : 'Individual'}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4 line-clamp-3">{event.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{formatDate(event.startTime)}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{event.duration} minutes</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{event.venue}</span>
          </div>
          {event.isTeamEvent && (
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>
                {event.minParticipants || 1} - {event.maxParticipants || 'unlimited'} participants
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {isRegistered ? (
          <Button className="w-full" variant="outline" disabled>
            <CheckCircle className="h-4 w-4 mr-2" />
            Registered
          </Button>
        ) : (
          <Button className="w-full" onClick={() => onRegister(event)}>
            Register Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
