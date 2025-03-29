'use client';

import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { EventsHeader } from '@/components/admin/events/EventsHeader';
import { EventsTable } from '@/components/admin/events/EventsTable';
import { EventFormDialog } from '@/components/admin/events/EventFormDialog';
import { EventDetailsDialog } from '@/components/admin/events/EventDetailsDialog';
import { DeleteConfirmDialog } from '@/components/admin/events/DeleteConfirmDialog';
import { Event } from '@/config/events/types';
import { Loader2 } from 'lucide-react';

export default function EventsPage() {
  const { makeRequest } = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState<string | null>(null);
  const [isTeamEventFilter, setIsTeamEventFilter] = useState<boolean | null>(null);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [detailedEvent, setDetailedEvent] = useState<Event | null>(null);

  const fetchEvents = async () => {
    setIsLoading(true);
    const response = await makeRequest(
      'GET',
      '/events',
      undefined,
      'Failed to fetch events',
      false
    );
    if (response.status === 'success') {
      const events = response.data.data?.events || [];
      setAllEvents(events);
      setFilteredEvents(events);
    }
    setIsLoading(false);
  };

  const filterEvents = () => {
    let results = [...allEvents];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        event =>
          event.name.toLowerCase().includes(query) ||
          (event.description && event.description.toLowerCase().includes(query))
      );
    }

    if (eventTypeFilter && eventTypeFilter !== 'all') {
      results = results.filter(event => event.eventType === eventTypeFilter);
    }

    if (isTeamEventFilter !== null) {
      results = results.filter(event => event.isTeamEvent === isTeamEventFilter);
    }

    setFilteredEvents(results);
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
      setAllEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
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
    setDetailedEvent(event);
    setIsDetailsDialogOpen(true);
  };

  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const handleEventSaved = (newEvent: Event, isNew: boolean) => {
    if (isNew) {
      setAllEvents(prev => [...prev, newEvent]);
    } else {
      setAllEvents(prev => prev.map(event => (event.id === newEvent.id ? newEvent : event)));
    }
    setIsFormDialogOpen(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchQuery, eventTypeFilter, isTeamEventFilter, allEvents]);

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

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <EventsTable
          events={filteredEvents}
          onView={handleViewDetails}
          onEdit={handleEditEvent}
          onDelete={handleDeleteClick}
        />
      )}

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
