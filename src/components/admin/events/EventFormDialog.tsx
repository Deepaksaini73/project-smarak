import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useApi } from '@/hooks/use-api';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Event } from '@/config/events/types';
import { RoundFormSection } from './RoundFormSection';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, X } from 'lucide-react';
import { format } from 'date-fns';

const eventFormSchema = z.object({
  name: z.string().min(3, { message: 'Event name must be at least 3 characters long' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
  venue: z.string().min(1, { message: 'Venue is required' }),
  eventType: z.string().min(1, { message: 'Event type is required' }),
  duration: z.number().min(1, { message: 'Duration must be at least 1 minute' }).default(60),
  materialsProvided: z.array(z.string()).default([]),
  isCodes: z.array(z.string()).default([]),
  startTime: z.date(),
  endTime: z.date(),
  isTeamEvent: z.boolean().default(false),
  minParticipants: z.number().nullable(),
  maxParticipants: z.number().nullable(),
  rounds: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Round name is required' }),
        description: z.string(),
        duration: z.number().min(1, { message: 'Duration must be at least 1 minute' }),
        qualifyCount: z.number().nullable(),
        criteria: z.string().nullable(),
      })
    )
    .optional()
    .default([]),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  isCreating: boolean;
  onSave: (event: Event, isNew: boolean) => void;
}

export function EventFormDialog({
  isOpen,
  onClose,
  event,
  isCreating,
  onSave,
}: EventFormDialogProps) {
  const { makeRequest, isLoading } = useApi();

  const defaultValues: EventFormValues = {
    name: event?.name || '',
    description: event?.description || '',
    venue: event?.venue || '',
    eventType: event?.eventType || '',
    duration: event?.duration || 60,
    materialsProvided: event?.materialsProvided || [],
    isCodes: event?.isCodes || [],
    startTime: event?.startTime ? new Date(event.startTime) : new Date(),
    endTime: event?.endTime ? new Date(event.endTime) : new Date(),
    isTeamEvent: event?.isTeamEvent || false,
    minParticipants: event?.minParticipants || null,
    maxParticipants: event?.maxParticipants || null,
    rounds:
      event?.rounds?.map(round => ({
        ...round,
        description: round.description || '',
      })) || [],
  };

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (event) {
      form.reset({
        name: event.name || '',
        description: event.description || '',
        venue: event.venue || '',
        eventType: event.eventType || '',
        duration: event.duration || 60,
        materialsProvided: event.materialsProvided || [],
        isCodes: event.isCodes || [],
        startTime: event.startTime ? new Date(event.startTime) : new Date(),
        endTime: event.endTime ? new Date(event.endTime) : new Date(),
        isTeamEvent: event.isTeamEvent || false,
        minParticipants: event.minParticipants || null,
        maxParticipants: event.maxParticipants || null,
        rounds:
          event.rounds?.map(round => ({
            ...round,
            description: round.description || '',
          })) || [],
      });
    } else {
      form.reset({
        name: '',
        description: '',
        venue: '',
        eventType: '',
        duration: 60,
        materialsProvided: [],
        isCodes: [],
        startTime: new Date(),
        endTime: new Date(),
        isTeamEvent: false,
        minParticipants: null,
        maxParticipants: null,
        rounds: [],
      });
    }
  }, [event, form]);

  const isTeamEvent = form.watch('isTeamEvent');

  const onSubmit = async (data: EventFormValues) => {
    try {
      const method = isCreating ? 'POST' : 'PUT';
      const endpoint = isCreating ? '/admin/events/create' : `/admin/events/${event?.id}`;
      const response = await makeRequest(
        method,
        endpoint,
        isCreating ? [data] : data,
        isCreating ? 'Failed to create event' : 'Failed to update event',
        true
      );
      if (response.status === 'success') {
        onSave(isCreating ? response.data.data.events[0] : response.data.data.event, isCreating);
        toast.success(isCreating ? 'Event created successfully' : 'Event updated successfully');
      }
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isCreating ? 'Create New Event' : 'Edit Event'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info Section */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter event name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="WORKSHOP">Workshop</SelectItem>
                            <SelectItem value="SEMINAR">Seminar</SelectItem>
                            <SelectItem value="COMPETITION">Competition</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the event" rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Schedule Section */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-medium mb-4">Schedule & Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Venue</FormLabel>
                        <FormControl>
                          <Input placeholder="Event venue" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            placeholder="Event duration in minutes"
                            value={field.value}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date & Time</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                          <FormControl>
                            <Input
                              type="date"
                              value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                              onChange={e => {
                                if (e.target.value) {
                                  const [year, month, day] = e.target.value.split('-').map(Number);
                                  const newDate = new Date(field.value || new Date());
                                  newDate.setFullYear(year, month - 1, day);
                                  field.onChange(newDate);
                                }
                              }}
                            />
                          </FormControl>
                          <FormControl>
                            <Input
                              type="time"
                              value={field.value ? format(field.value, 'HH:mm') : ''}
                              onChange={e => {
                                if (e.target.value) {
                                  const [hours, minutes] = e.target.value.split(':').map(Number);
                                  const newDate = new Date(field.value || new Date());
                                  newDate.setHours(hours, minutes);
                                  field.onChange(newDate);
                                }
                              }}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date & Time</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                          <FormControl>
                            <Input
                              type="date"
                              value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                              onChange={e => {
                                if (e.target.value) {
                                  const [year, month, day] = e.target.value.split('-').map(Number);
                                  const newDate = new Date(field.value || new Date());
                                  newDate.setFullYear(year, month - 1, day);
                                  field.onChange(newDate);
                                }
                              }}
                            />
                          </FormControl>
                          <FormControl>
                            <Input
                              type="time"
                              value={field.value ? format(field.value, 'HH:mm') : ''}
                              onChange={e => {
                                if (e.target.value) {
                                  const [hours, minutes] = e.target.value.split(':').map(Number);
                                  const newDate = new Date(field.value || new Date());
                                  newDate.setHours(hours, minutes);
                                  field.onChange(newDate);
                                }
                              }}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Team Settings Section */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-medium mb-4">Team Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="isTeamEvent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Team Event</FormLabel>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {isTeamEvent && (
                    <>
                      <FormField
                        control={form.control}
                        name="minParticipants"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Min Team Size</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                placeholder="Minimum team members"
                                value={field.value || ''}
                                onChange={e =>
                                  field.onChange(e.target.value ? Number(e.target.value) : null)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxParticipants"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Team Size</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                placeholder="Maximum team members"
                                value={field.value || ''}
                                onChange={e =>
                                  field.onChange(e.target.value ? Number(e.target.value) : null)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Materials Section */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-medium mb-4">Resources & Materials</h3>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="materialsProvided"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Materials Provided</FormLabel>
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {field.value.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-1 bg-muted rounded-md px-2 py-1"
                              >
                                <span>{item}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 w-5 p-0"
                                  onClick={() => {
                                    const newItems = [...field.value];
                                    newItems.splice(index, 1);
                                    field.onChange(newItems);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add material"
                              onKeyDown={e => {
                                if (e.key === 'Enter' && e.currentTarget.value) {
                                  e.preventDefault();
                                  field.onChange([...field.value, e.currentTarget.value]);
                                  e.currentTarget.value = '';
                                }
                              }}
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const input = document.activeElement as HTMLInputElement;
                                if (input && input.value) {
                                  field.onChange([...field.value, input.value]);
                                  input.value = '';
                                }
                              }}
                            >
                              <PlusCircle className="h-4 w-4 mr-1" /> Add
                            </Button>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isCodes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IS Codes</FormLabel>
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {field.value.map((code, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-1 bg-muted rounded-md px-2 py-1"
                              >
                                <span>{code}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 w-5 p-0"
                                  onClick={() => {
                                    const newCodes = [...field.value];
                                    newCodes.splice(index, 1);
                                    field.onChange(newCodes);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add IS code (e.g., IS 456:2000)"
                              onKeyDown={e => {
                                if (e.key === 'Enter' && e.currentTarget.value) {
                                  e.preventDefault();
                                  field.onChange([...field.value, e.currentTarget.value]);
                                  e.currentTarget.value = '';
                                }
                              }}
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const input = document.activeElement as HTMLInputElement;
                                if (input && input.value) {
                                  field.onChange([...field.value, input.value]);
                                  input.value = '';
                                }
                              }}
                            >
                              <PlusCircle className="h-4 w-4 mr-1" /> Add
                            </Button>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Rounds Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Event Rounds</h3>
              <RoundFormSection control={form.control} />
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : isCreating ? 'Create Event' : 'Update Event'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
