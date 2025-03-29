import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, Calendar, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Registration } from '@/types/registration';

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
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (registrations.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/10">
        <h3 className="mt-4 text-lg font-medium">No registrations found</h3>
        <p className="mt-1 text-muted-foreground">
          You haven&apos;t registered for any events yet.
        </p>
        <Button className="mt-4" onClick={() => (window.location.href = '/events')}>
          Browse Events
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Registered Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {registrations.map(registration => (
          <Card key={registration.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{registration.event.name}</CardTitle>
                  <CardDescription className="flex gap-2 mt-1">
                    <Badge variant="outline">{registration.event.eventType}</Badge>
                    <Badge variant={registration.isTeam ? 'secondary' : 'default'}>
                      {registration.isTeam ? 'Team' : 'Individual'}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{formatDate(registration.event.startTime)}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{registration.event.venue}</span>
                </div>

                {registration.isTeam && (
                  <>
                    <Separator className="my-2" />
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Team: {registration.teamName}</p>
                        {registration.teamCode && (
                          <Badge variant="outline">Code: {registration.teamCode}</Badge>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium flex items-center">
                          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                          Team Members ({registration.teamMembers.length})
                        </p>
                        <ul className="text-sm space-y-1 pl-6">
                          {registration.teamMembers.map(member => (
                            <li key={member.id} className="flex justify-between">
                              <span>{member.user.name}</span>
                              {member.isTeamLead && (
                                <Badge variant="secondary" className="text-xs">
                                  Lead
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
