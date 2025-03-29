import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2, Users, User } from 'lucide-react';
import { Event } from '@/config/events/types';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';

interface EventsTableProps {
  events: Event[];
  onView: (event: Event) => void;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
}

export function EventsTable({ events, onView, onEdit, onDelete }: EventsTableProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <h3 className="text-lg font-medium">No events found</h3>
      </div>
    );
  }

  const formatEventDate = (date: string | Date) => {
    return format(new Date(date), 'MMM d, yyyy HH:mm');
  };

  return (
    <Card className="border overflow-hidden px-2 mt-4 py-0">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Registrations</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map(event => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{event.name}</span>
                    <div className="flex items-center mt-1">
                      {event.isTeamEvent ? (
                        <Badge variant="default" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          Team
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          <User className="h-3 w-3 mr-1" />
                          Individual
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{event.eventType}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-sm">
                    <span>{formatEventDate(event.startTime)}</span>
                    <span className="text-muted-foreground">to</span>
                    <span>{formatEventDate(event.endTime)}</span>
                  </div>
                </TableCell>
                <TableCell>{event.venue}</TableCell>
                <TableCell>
                  {event._count?.registrations || 0}
                  {event._count?.registrations === 1 ? ' registration' : ' registrations'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(event)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(event)}
                      title="Edit Event"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(event)}
                      title="Delete Event"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
