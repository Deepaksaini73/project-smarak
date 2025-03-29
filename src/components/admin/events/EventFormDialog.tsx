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
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import { Image as ImageIcon, Loader2, Upload } from 'lucide-react';
import { eventSchema } from '@/config/events/schema';
import Image from 'next/image';

type EventFormValues = z.infer<typeof eventSchema>;

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const defaultValues: EventFormValues = {
    name: event?.name || '',
    description: event?.description || '',
    venue: event?.venue || '',
    eventType: (event?.eventType as 'COMPETITION' | 'WORKSHOP' | 'SEMINAR') || 'COMPETITION',
    duration: event?.duration || 60,
    materialsProvided: event?.materialsProvided || [],
    isCodes: event?.isCodes || [],
    startTime: event?.startTime ? new Date(event.startTime) : new Date(),
    endTime: event?.endTime ? new Date(event.endTime) : new Date(),
    isTeamEvent: event?.isTeamEvent || false,
    minParticipants: event?.minParticipants || null,
    maxParticipants: event?.maxParticipants || null,
    image: event?.image || '',
    rounds:
      event?.rounds?.map(round => ({
        ...round,
        description: round.description || '',
      })) || [],
  };

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues,
  });

  useEffect(() => {
    if (event) {
      form.reset({
        name: event.name || '',
        description: event.description || '',
        venue: event.venue || '',
        eventType: (event.eventType as 'COMPETITION' | 'WORKSHOP' | 'SEMINAR') || 'COMPETITION',
        duration: event.duration || 60,
        materialsProvided: event.materialsProvided || [],
        isCodes: event.isCodes || [],
        startTime: event.startTime ? new Date(event.startTime) : new Date(),
        endTime: event.endTime ? new Date(event.endTime) : new Date(),
        isTeamEvent: event.isTeamEvent || false,
        minParticipants: event.minParticipants || null,
        maxParticipants: event.maxParticipants || null,
        image: event.image || '',
        rounds:
          event.rounds?.map(round => ({
            ...round,
            description: round.description || '',
          })) || [],
      });
      setImagePreview(event.image || null);
    } else {
      form.reset({
        name: '',
        description: '',
        venue: '',
        eventType: 'COMPETITION',
        duration: 60,
        materialsProvided: [],
        isCodes: [],
        startTime: new Date(),
        endTime: new Date(),
        isTeamEvent: false,
        minParticipants: null,
        maxParticipants: null,
        image: '',
        rounds: [],
      });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [event, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    form.setValue('image', '');
  };

  const onSubmit = async (data: EventFormValues) => {
    try {
      setIsUploading(true);

      // Upload image if there's a new one
      if (imageFile) {
        try {
          const imageUrl = await uploadToCloudinary(imageFile);
          data.image = imageUrl;
        } catch (error) {
          toast.error('Failed to upload image. Please try again.');
          setIsUploading(false);
          return;
        }
      }

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
    } finally {
      setIsUploading(false);
    }
  };

  const isTeamEvent = form.watch('isTeamEvent');

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

              {/* Event Image Upload */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Event Image</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-3">
                        {imagePreview ? (
                          <div className="relative max-w-md">
                            <Image
                              src={imagePreview}
                              alt="Event preview"
                              className="w-full h-auto max-h-48 object-cover rounded-md"
                              width={400}
                              height={300}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8 rounded-full"
                              onClick={handleRemoveImage}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center max-w-md">
                            <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-4">
                              Upload an image for your event
                            </p>
                            <label htmlFor="event-image" className="cursor-pointer">
                              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 text-sm">
                                <Upload className="h-4 w-4" />
                                Choose image
                              </div>
                              <input
                                id="event-image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                        )}
                        <Input type="hidden" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
              <Button type="submit" disabled={isLoading || isUploading}>
                {isLoading || isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isUploading ? 'Uploading...' : 'Saving...'}
                  </>
                ) : isCreating ? (
                  'Create Event'
                ) : (
                  'Update Event'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
