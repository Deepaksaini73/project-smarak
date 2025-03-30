'use client';

import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { Event } from '@/config/events/types';
import { Loader2, CalendarDays, SearchX } from 'lucide-react';
import { EventCard } from '../../../components/events/event-card';
import { RegistrationDialog } from '../../../components/events/registration-dialog';
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
        console.log('Fetched events:', eventsData);
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
    <div className="container mx-auto py-8 px-8 relative my-10 max-w-7xl">
      <div className="relative mb-12">
        <div className="inline-block mb-6 py-1">
          <h1 className="text-5xl font-bold text-[#554400] font-outfit">Upcoming Events</h1>
        </div>

        <p className="text-lg mt-6 font-outfit text-gray-700 max-w-2xl">
          Discover and register for exciting events. Join us for competitions, workshops, and more
          to enhance your skills and expand your network.
        </p>

        <div className="absolute top-0 right-0 w-20 h-20 bg-[#FFD700]/10 rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-1/4 w-12 h-12 bg-[#FFD700]/20 rounded-full -z-10"></div>
      </div>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-24 bg-[#fefbed]/50 rounded-2xl border border-[#FFD700]/20">
          <Loader2 className="w-10 h-10 animate-spin text-[#554400] mb-4" />
          <p className="text-[#554400] font-outfit">Loading exciting events for you...</p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Flagship Events Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold font-outfit text-[#554400] mb-6 flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-[#8D0000]" />
              Flagship Events
              <div className="h-0.5 flex-grow bg-[#FFD700]/30 ml-4 rounded-full"></div>
            </h2>

            {events.filter(event => event.eventType === 'COMPETITION').length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events
                  .filter(event => event.eventType === 'COMPETITION')
                  .map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onRegister={handleRegister}
                      onDeRegister={handleDeRegister}
                      isRegistered={registeredEventIds.includes(event.id)}
                      teamCode={userTeamCodes[event.id]}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-[#FFD700]/50 rounded-lg bg-[#fefbed] px-4">
                <div className="flex justify-center mb-4">
                  <SearchX className="h-12 w-12 text-[#FFD700]" />
                </div>
                <h3 className="mt-4 text-xl font-semibold font-outfit text-[#554400]">
                  No competitions available
                </h3>
                <p className="mt-3 text-gray-600 font-outfit">
                  Check back later for upcoming competitions.
                </p>
              </div>
            )}
          </div>

          {/* Workshops & Seminars Section */}
          <div>
            <h2 className="text-2xl font-semibold font-outfit text-[#554400] mb-6 flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-[#8D0000]" />
              Workshops & Seminars
              <div className="h-0.5 flex-grow bg-[#FFD700]/30 ml-4 rounded-full"></div>
            </h2>

            {events.filter(event => event.eventType === 'WORKSHOP' || event.eventType === 'SEMINAR')
              .length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events
                  .filter(event => event.eventType === 'WORKSHOP' || event.eventType === 'SEMINAR')
                  .map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onRegister={handleRegister}
                      onDeRegister={handleDeRegister}
                      isRegistered={registeredEventIds.includes(event.id)}
                      teamCode={userTeamCodes[event.id]}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-[#FFD700]/50 rounded-lg bg-[#fefbed] px-4">
                <div className="flex justify-center mb-4">
                  <SearchX className="h-12 w-12 text-[#FFD700]" />
                </div>
                <h3 className="mt-4 text-xl font-semibold font-outfit text-[#554400]">
                  No workshops or seminars available
                </h3>
                <p className="mt-3 text-gray-600 font-outfit">
                  Check back later for upcoming learning opportunities.
                </p>
              </div>
            )}
          </div>
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
        <AlertDialogContent className="font-outfit">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#554400]">Withdraw from event?</AlertDialogTitle>
            <AlertDialogDescription>
              {eventToDeRegister?.isTeamEvent
                ? "If you're a team leader, this will remove your entire team from the event. If you're a team member, only you will be removed."
                : 'This will cancel your registration for this event.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeRegistering}
              className="bg-[#fefbed] text-[#554400] border-[#FFD700]/30 hover:bg-[#fefbed]/80 hover:text-[#554400]"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeRegister}
              className="bg-[#8D0000] text-white hover:bg-[#8D0000]/90"
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
