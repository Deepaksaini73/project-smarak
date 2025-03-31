import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

// This is simplified schema - you'll want to expand this to match your full schema
const eventFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  eventType: z.enum(['COMPETITION', 'WORKSHOP', 'SEMINAR']),
  isTeamEvent: z.boolean().default(false),
  maxParticipants: z.number().int().positive().optional().nullable(),
  minParticipants: z.number().int().positive().optional().nullable(),
  startTime: z.string(),
  endTime: z.string(),
  venue: z.string().min(2, { message: 'Venue is required' }),
  materialsProvided: z.array(z.string()).default([]),
  isCodes: z.array(z.string()).default([]),
  rounds: z
    .array(
      z.object({
        name: z.string().min(1, 'Round name is required'),
        description: z.string(),
        duration: z.number().int().positive(),
        qualifyCount: z.number().int().positive().optional().nullable(),
        criteria: z.string().optional().nullable(),
      })
    )
    .default([]),
  duration: z.number().int().positive(),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EventFormValues) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<EventFormValues>;
  mode: 'create' | 'edit';
}

export function EventForm({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  defaultValues,
  mode,
}: EventFormProps) {
  const [materialInput, setMaterialInput] = useState('');
  const [codeInput, setCodeInput] = useState('');

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: '',
      description: '',
      eventType: 'COMPETITION',
      isTeamEvent: false,
      maxParticipants: null,
      minParticipants: null,
      startTime: '',
      endTime: '',
      venue: '',
      materialsProvided: [],
      isCodes: [],
      rounds: [],
      duration: 60,
      ...defaultValues,
    },
  });

  // Convert ISO date strings to datetime-local format
  React.useEffect(() => {
    if (defaultValues?.startTime) {
      const startTime = new Date(defaultValues.startTime).toISOString().slice(0, 16);
      form.setValue('startTime', startTime);
    }

    if (defaultValues?.endTime) {
      const endTime = new Date(defaultValues.endTime).toISOString().slice(0, 16);
      form.setValue('endTime', endTime);
    }
  }, [defaultValues, form]);

  const handleAddMaterial = () => {
    if (materialInput.trim()) {
      const current = form.getValues('materialsProvided');
      form.setValue('materialsProvided', [...current, materialInput.trim()]);
      setMaterialInput('');
    }
  };

  const handleRemoveMaterial = (index: number) => {
    const current = form.getValues('materialsProvided');
    form.setValue(
      'materialsProvided',
      current.filter((_, i) => i !== index)
    );
  };

  const handleAddCode = () => {
    if (codeInput.trim()) {
      const current = form.getValues('isCodes');
      form.setValue('isCodes', [...current, codeInput.trim()]);
      setCodeInput('');
    }
  };

  const handleRemoveCode = (index: number) => {
    const current = form.getValues('isCodes');
    form.setValue(
      'isCodes',
      current.filter((_, i) => i !== index)
    );
  };

  const handleAddRound = () => {
    const current = form.getValues('rounds');
    form.setValue('rounds', [
      ...current,
      { name: '', description: '', duration: 30, qualifyCount: null, criteria: null },
    ]);
  };

  const handleRemoveRound = (index: number) => {
    const current = form.getValues('rounds');
    form.setValue(
      'rounds',
      current.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Event' : 'Edit Event'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Event name" {...field} />
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
                        <SelectItem value="COMPETITION">Competition</SelectItem>
                        <SelectItem value="WORKSHOP">Workshop</SelectItem>
                        <SelectItem value="SEMINAR">Seminar</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your event"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                        placeholder="60"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="isTeamEvent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Team Event</FormLabel>
                      <FormDescription>Is this a team event or individual event?</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch('isTeamEvent') && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="minParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Team Size</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="1"
                            {...field}
                            value={field.value || ''}
                            onChange={e =>
                              field.onChange(e.target.value ? parseInt(e.target.value) : null)
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
                            placeholder="5"
                            {...field}
                            value={field.value || ''}
                            onChange={e =>
                              field.onChange(e.target.value ? parseInt(e.target.value) : null)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {!form.watch('isTeamEvent') && (
                <FormField
                  control={form.control}
                  name="maxParticipants"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Participants</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="50"
                          {...field}
                          value={field.value || ''}
                          onChange={e =>
                            field.onChange(e.target.value ? parseInt(e.target.value) : null)
                          }
                        />
                      </FormControl>
                      <FormDescription>Leave empty for unlimited participants</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Advanced Options Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="materials">
                <AccordionTrigger>Materials & Codes</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <FormLabel>Materials Provided</FormLabel>
                      <div className="flex mt-2">
                        <Input
                          placeholder="Add material"
                          value={materialInput}
                          onChange={e => setMaterialInput(e.target.value)}
                          className="mr-2"
                        />
                        <Button type="button" onClick={handleAddMaterial} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.watch('materialsProvided').map((material, index) => (
                          <Badge key={index} variant="secondary" className="gap-1">
                            {material}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => handleRemoveMaterial(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <FormLabel>IS Codes</FormLabel>
                      <div className="flex mt-2">
                        <Input
                          placeholder="Add IS code"
                          value={codeInput}
                          onChange={e => setCodeInput(e.target.value)}
                          className="mr-2"
                        />
                        <Button type="button" onClick={handleAddCode} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.watch('isCodes').map((code, index) => (
                          <Badge key={index} variant="outline" className="gap-1">
                            {code}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => handleRemoveCode(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rounds">
                <AccordionTrigger>Rounds</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <FormLabel>Event Rounds</FormLabel>
                      <Button type="button" onClick={handleAddRound} size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" /> Add Round
                      </Button>
                    </div>

                    {form.watch('rounds').map((_, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Round {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveRound(index)}
                            className="text-destructive hover:text-destructive/90"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`rounds.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Round Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Round name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`rounds.${index}.duration`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Duration (minutes)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="30"
                                    {...field}
                                    onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`rounds.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Round description" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`rounds.${index}.qualifyCount`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Qualifying Count</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Number of qualifiers"
                                    {...field}
                                    value={field.value || ''}
                                    onChange={e =>
                                      field.onChange(
                                        e.target.value ? parseInt(e.target.value) : null
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`rounds.${index}.criteria`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Judging Criteria</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Criteria"
                                    {...field}
                                    value={field.value || ''}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {mode === 'create' ? 'Creating...' : 'Updating...'}
                  </>
                ) : (
                  <>{mode === 'create' ? 'Create Event' : 'Update Event'}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
