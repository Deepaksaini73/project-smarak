'use client';

import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { Event } from '@/config/events/types';
import { Loader2 } from 'lucide-react';
import { EventFilters } from '../../components/events/event-filters';
import { EventCard } from '../../components/events/event-card';
import { RegistrationDialog } from '../../components/events/registration-dialog';
import { toast } from 'sonner';

export default function EventsPage() {
  const { makeRequest } = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');
  const [isTeamEventFilter, setIsTeamEventFilter] = useState<string>('all');

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [teamCodeToShare, setTeamCodeToShare] = useState('');
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await makeRequest(
        'GET',
        '/events',
        undefined,
        'Failed to fetch events',
        false
      );

      if (response.status === 'success') {
        const eventsData = response.data.data?.events || [];
        setEvents(eventsData);
        setFilteredEvents(eventsData);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserRegistrations = async () => {
    try {
      const response = await makeRequest(
        'GET',
        '/user/registrations',
        undefined,
        'Failed to fetch your registrations',
        false
      );

      if (response.status === 'success') {
        const registrations = response.data.data.registrations || [];
        const eventIds = registrations.map((reg: { eventId: any }) => reg.eventId);
        setRegisteredEventIds(eventIds);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  const filterEvents = () => {
    let results = [...events];

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

    if (isTeamEventFilter !== 'all') {
      const isTeam = isTeamEventFilter === 'team';
      results = results.filter(event => event.isTeamEvent === isTeam);
    }

    setFilteredEvents(results);
  };

  const handleRegister = (event: Event) => {
    if (registeredEventIds.includes(event.id)) {
      toast.info('You are already registered for this event');
      return;
    }

    setSelectedEvent(event);
    setIsRegisterDialogOpen(true);
    setRegistrationComplete(false);
    setTeamCodeToShare('');
  };

  const submitRegistration = async (data: {
    isTeamRegistration: boolean;
    teamName?: string;
    teamCode?: string;
  }) => {
    if (!selectedEvent) return;

    setIsRegistering(true);
    try {
      if (data.teamCode) {
        const response = await makeRequest(
          'POST',
          '/events/join-team',
          { teamCode: data.teamCode },
          'Failed to join team',
          true
        );

        if (response.status === 'success') {
          setRegistrationComplete(true);
          setRegisteredEventIds(prev => [...prev, selectedEvent.id]);
        }
      } else {
        const response = await makeRequest(
          'POST',
          `/events/${selectedEvent.id}/register`,
          {
            isTeamRegistration: data.isTeamRegistration,
            teamName: data.teamName,
          },
          'Failed to register for event',
          true
        );

        if (response.status === 'success') {
          if (data.isTeamRegistration && response.data?.teamCode) {
            setTeamCodeToShare(response.data.teamCode);
          }
          setRegistrationComplete(true);
          setRegisteredEventIds(prev => [...prev, selectedEvent.id]);
        }
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    } finally {
      setIsRegistering(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchEvents();
      await fetchUserRegistrations();
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchQuery, eventTypeFilter, isTeamEventFilter, events]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground mt-1">Browse and register for upcoming events.</p>
        </div>

        <EventFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          eventTypeFilter={eventTypeFilter}
          setEventTypeFilter={setEventTypeFilter}
          isTeamEventFilter={isTeamEventFilter}
          setIsTeamEventFilter={setIsTeamEventFilter}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
                isRegistered={registeredEventIds.includes(event.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No events found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      )}

      <RegistrationDialog
        isOpen={isRegisterDialogOpen}
        setIsOpen={setIsRegisterDialogOpen}
        selectedEvent={selectedEvent}
        isRegistering={isRegistering}
        registrationComplete={registrationComplete}
        teamCodeToShare={teamCodeToShare}
        onSubmit={submitRegistration}
      />
    </div>
  );
}
