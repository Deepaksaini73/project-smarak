'use client';

import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { EventsHeader } from '@/components/admin/events/EventsHeader';
import { EventsTable } from '@/components/admin/events/EventsTable';
import { EventFormDialog } from '@/components/admin/events/EventFormDialog';
import { EventDetailsDialog } from '@/components/admin/events/EventDetailsDialog';
import { DeleteConfirmDialog } from '@/components/admin/events/DeleteConfirmDialog';
import { Event } from '@/config/events/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

export default function EventsPage() {
  const { makeRequest } = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState<string | null>(null);
  const [isTeamEventFilter, setIsTeamEventFilter] = useState<boolean | null>(null);

  // Dialog states
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [detailedEvent, setDetailedEvent] = useState<Event | null>(null);

  const fetchEvents = async () => {
    setIsLoading(true);

    let url = '/admin/events';
    const params = new URLSearchParams();

    if (searchQuery) params.append('search', searchQuery);
    if (eventTypeFilter) params.append('eventType', eventTypeFilter);
    if (isTeamEventFilter !== null) params.append('isTeamEvent', String(isTeamEventFilter));

    if (params.toString()) url += `?${params.toString()}`;

    const response = await makeRequest('GET', url, undefined, 'Failed to fetch events', false);

    if (response.status === 'success') {
      setEvents(response.data?.events || []);
    }

    setIsLoading(false);
  };

  const fetchEventDetails = async (eventId: string) => {
    const response = await makeRequest(
      'GET',
      `/admin/events/${eventId}`,
      undefined,
      'Failed to fetch event details',
      false
    );

    if (response.status === 'success') {
      setDetailedEvent(response.data?.event || null);
      setIsDetailsDialogOpen(true);
    }
  };

  const deleteEvent = async (eventId: string) => {
    const response = await makeRequest(
      'DELETE',
      `/admin/events/${eventId}`,
      undefined,
      'Failed to delete event',
      true
    );

    if (response.status === 'success') {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      setIsDeleteDialogOpen(false);
      setSelectedEvent(null);
    }
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setIsCreatingEvent(true);
    setIsFormDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsCreatingEvent(false);
    setIsFormDialogOpen(true);
  };

  const handleViewDetails = (event: Event) => {
    fetchEventDetails(event.id);
  };

  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const handleEventSaved = (newEvent: Event, isNew: boolean) => {
    if (isNew) {
      setEvents(prev => [...prev, newEvent]);
    } else {
      setEvents(prev => prev.map(event => (event.id === newEvent.id ? newEvent : event)));
    }
    setIsFormDialogOpen(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [searchQuery, eventTypeFilter, isTeamEventFilter]);

  return (
    <div className="container mx-auto py-8">
      <EventsHeader
        onCreateEvent={handleCreateEvent}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        eventTypeFilter={eventTypeFilter}
        setEventTypeFilter={setEventTypeFilter}
        isTeamEventFilter={isTeamEventFilter}
        setIsTeamEventFilter={setIsTeamEventFilter}
      />

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <EventsTable
              events={events}
              onView={handleViewDetails}
              onEdit={handleEditEvent}
              onDelete={handleDeleteClick}
            />
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <EventsTable
              events={events.filter(event => new Date(event.startTime) > new Date())}
              onView={handleViewDetails}
              onEdit={handleEditEvent}
              onDelete={handleDeleteClick}
            />
          )}
        </TabsContent>

        <TabsContent value="ongoing" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <EventsTable
              events={events.filter(event => {
                const now = new Date();
                const start = new Date(event.startTime);
                const end = new Date(event.endTime);
                return start <= now && end >= now;
              })}
              onView={handleViewDetails}
              onEdit={handleEditEvent}
              onDelete={handleDeleteClick}
            />
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <EventsTable
              events={events.filter(event => new Date(event.endTime) < new Date())}
              onView={handleViewDetails}
              onEdit={handleEditEvent}
              onDelete={handleDeleteClick}
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <EventFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        event={selectedEvent}
        isCreating={isCreatingEvent}
        onSave={handleEventSaved}
      />

      <EventDetailsDialog
        event={detailedEvent}
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => selectedEvent && deleteEvent(selectedEvent.id)}
        eventName={selectedEvent?.name || ''}
      />
    </div>
  );
}
