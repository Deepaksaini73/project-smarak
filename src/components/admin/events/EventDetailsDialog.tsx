import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Event } from '@/config/events/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { UsersRound, MapPin, Calendar, Clock, FileText } from 'lucide-react';
import Image from 'next/image';

interface EventDetailsDialogProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailsDialog({ event, isOpen, onClose }: EventDetailsDialogProps) {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{event.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{event.eventType}</Badge>
            {event.isTeamEvent ? (
              <Badge variant="outline" className="flex items-center gap-1">
                <UsersRound className="h-3 w-3" />
                Team Event
                {event.minParticipants && event.maxParticipants && (
                  <span className="ml-1">
                    ({event.minParticipants}-{event.maxParticipants} members)
                  </span>
                )}
              </Badge>
            ) : (
              <Badge variant="outline">Individual Event</Badge>
            )}
          </div>

          {event.image && (
            <Image
              src={event.image || '/images/default-event.png'}
              alt={event.name}
              width={500}
              height={300}
              className="rounded-lg object-cover"
            />
          )}

          <p className="text-muted-foreground">{event.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Start Time</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(event.startTime), "PPP 'at' p")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">End Time</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(event.endTime), "PPP 'at' p")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">{event.duration} minutes</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Venue</p>
                <p className="text-sm text-muted-foreground">{event.venue}</p>
              </div>
            </div>
          </div>

          {event.materialsProvided && event.materialsProvided.length > 0 && (
            <div>
              <div className="flex items-center mb-3">
                <h3 className="text-lg font-semibold">Materials Provided</h3>
                <Separator className="flex-1 ml-3" />
              </div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {event.materialsProvided.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>
          )}

          {event.isCodes && event.isCodes.length > 0 && (
            <div>
              <div className="flex items-center mb-3">
                <h3 className="text-lg font-semibold">IS Codes</h3>
                <Separator className="flex-1 ml-3" />
              </div>
              <div className="flex flex-wrap gap-2">
                {event.isCodes.map((code, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {code}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {event.rounds && event.rounds.length > 0 && (
            <div>
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-semibold">Rounds</h3>
                <Separator className="flex-1 ml-3" />
              </div>

              <div className="space-y-4">
                {event.rounds.map((round, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">
                          Round {index + 1}: {round.name}
                        </h4>
                        <Badge variant="outline">{round.duration} min</Badge>
                      </div>

                      {round.description && (
                        <p className="text-sm text-muted-foreground mt-2">{round.description}</p>
                      )}

                      {(round.qualifyCount || round.criteria) && (
                        <div className="mt-3 pt-3 border-t">
                          {round.qualifyCount && (
                            <div className="text-sm">
                              <span className="font-medium">Qualification Count:</span>{' '}
                              {round.qualifyCount}
                            </div>
                          )}

                          {round.criteria && (
                            <div className="text-sm mt-1">
                              <span className="font-medium">Criteria:</span> {round.criteria}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {event._count && (
            <div className="mt-4 pt-4 border-t">
              <Badge variant="secondary" className="text-sm">
                Registrations: {event._count.registrations}
              </Badge>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
