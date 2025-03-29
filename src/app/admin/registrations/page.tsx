'use client';

import { useState, useEffect, useMemo } from 'react';
import { useApi } from '@/hooks/use-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import RegistrationsTable from '../../../components/admin/registerations/RegistrationsTable';
import RegistrationDetailsDialog from '../../../components/admin/registerations/RegistrationDetailsDialog';
import DeleteConfirmationDialog from '../../../components/admin/registerations/DeleteConfirmationDialog';
import { Registration, Event } from '@/config/admin/types';

export default function RegistrationsPage() {
  const { makeRequest } = useApi();

  const [allRegistrations, setAllRegistrations] = useState<Registration[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<string>('all');

  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await makeRequest(
          'GET',
          '/events',
          undefined,
          'Failed to load events',
          false
        );

        if (response.status === 'success') {
          setEvents(response.data.data?.events || []);
        }
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const response = await makeRequest(
          'GET',
          '/admin/events/registerations',
          undefined,
          'Failed to load registrations',
          false
        );

        if (response.status === 'success') {
          setAllRegistrations(response.data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch registrations', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const filteredRegistrations = useMemo(() => {
    if (selectedEvent === 'all') {
      return allRegistrations;
    }
    return allRegistrations.filter(reg => reg.eventId === selectedEvent);
  }, [allRegistrations, selectedEvent]);

  const handleViewDetails = (registration: Registration) => {
    setSelectedRegistration(registration);
    setDetailsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setRegistrationToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteRegistration = async () => {
    if (!registrationToDelete) return;

    setIsDeleting(true);
    try {
      const response = await makeRequest(
        'DELETE',
        `/admin/events/registerations/${registrationToDelete}`,
        undefined,
        'Failed to delete registration',
        true
      );

      if (response.status === 'success') {
        setAllRegistrations(prev => prev.filter(reg => reg.id !== registrationToDelete));
        toast.success('Registration deleted successfully');
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error('Error deleting registration:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Event Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="w-64">
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  {events.map(event => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              <p className="mt-2">Loading registrations...</p>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="text-center py-8">No registrations found</div>
          ) : (
            <RegistrationsTable
              registrations={filteredRegistrations}
              onViewDetails={handleViewDetails}
              onDeleteClick={handleDeleteClick}
            />
          )}
        </CardContent>
      </Card>

      <RegistrationDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        registration={selectedRegistration}
        onDelete={(id: string) => {
          setDetailsDialogOpen(false);
          handleDeleteClick(id);
        }}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        isDeleting={isDeleting}
        onDelete={handleDeleteRegistration}
      />
    </div>
  );
}
