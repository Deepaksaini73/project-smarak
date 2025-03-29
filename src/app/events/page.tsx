'use client';

import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { Event } from '@/config/events/types';
import { Loader2 } from 'lucide-react';
import { EventCard } from '../../components/events/event-card';
import { RegistrationDialog } from '../../components/events/registration-dialog';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function EventsPage() {
  const { makeRequest } = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [teamCodeToShare, setTeamCodeToShare] = useState('');
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  const [userTeamCodes, setUserTeamCodes] = useState<Record<string, string>>({});

  // De-registration states
  const [isDeRegisterDialogOpen, setIsDeRegisterDialogOpen] = useState(false);
  const [isDeRegistering, setIsDeRegistering] = useState(false);
  const [eventToDeRegister, setEventToDeRegister] = useState<Event | null>(null);

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

        const teamCodesMap: Record<string, string> = {};
        registrations.forEach((reg: { eventId: string; teamCode?: string }) => {
          if (reg.teamCode) {
            teamCodesMap[reg.eventId] = reg.teamCode;
          }
        });
        setUserTeamCodes(teamCodesMap);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
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

  const handleDeRegister = (event: Event) => {
    setEventToDeRegister(event);
    setIsDeRegisterDialogOpen(true);
  };

  const confirmDeRegister = async () => {
    if (!eventToDeRegister) return;

    setIsDeRegistering(true);
    try {
      const response = await makeRequest(
        'POST',
        `/events/${eventToDeRegister.id}/de-register`,
        {},
        'Failed to withdraw from event',
        true
      );

      if (response.status === 'success') {
        setRegisteredEventIds(prev => prev.filter(id => id !== eventToDeRegister.id));

        // Remove team code if it exists
        if (userTeamCodes[eventToDeRegister.id]) {
          setUserTeamCodes(prev => {
            const newCodes = { ...prev };
            delete newCodes[eventToDeRegister.id];
            return newCodes;
          });
        }

        toast.success(response.data.message || 'Successfully withdrawn from event');
      }
    } catch (error) {
      console.error('Error de-registering from event:', error);
    } finally {
      setIsDeRegistering(false);
      setIsDeRegisterDialogOpen(false);
      setEventToDeRegister(null);
    }
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
          { teamCode: data.teamCode, eventId: selectedEvent.id },
          'Failed to join team',
          true
        );

        if (response.status === 'success') {
          setRegistrationComplete(true);
          setRegisteredEventIds(prev => [...prev, selectedEvent.id]);

          if (response.data.data?.teamCode) {
            setTeamCodeToShare(response.data.data.teamCode);
            setUserTeamCodes(prev => ({
              ...prev,
              [selectedEvent.id]: response.data.data.teamCode,
            }));
          }
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
          setRegistrationComplete(true);
          setRegisteredEventIds(prev => [...prev, selectedEvent.id]);

          if (data.isTeamRegistration && response.data.data?.teamCode) {
            setTeamCodeToShare(response.data.data.teamCode);
            setUserTeamCodes(prev => ({
              ...prev,
              [selectedEvent.id]: response.data.data.teamCode,
            }));
          }

          if (!data.isTeamRegistration && !selectedEvent.isTeamEvent) {
            setTimeout(() => {
              setIsRegisterDialogOpen(false);
            }, 1500);
          }
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

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground mt-1">Browse and register for upcoming events.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
                onDeRegister={handleDeRegister}
                isRegistered={registeredEventIds.includes(event.id)}
                teamCode={userTeamCodes[event.id]}
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

      <AlertDialog open={isDeRegisterDialogOpen} onOpenChange={setIsDeRegisterDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Withdraw from event?</AlertDialogTitle>
            <AlertDialogDescription>
              {eventToDeRegister?.isTeamEvent
                ? "If you're a team leader, this will remove your entire team from the event. If you're a team member, only you will be removed."
                : 'This will cancel your registration for this event.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeRegistering}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeRegister}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeRegistering}
            >
              {isDeRegistering ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Withdrawing...
                </>
              ) : (
                'Withdraw'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
