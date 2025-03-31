import { z } from 'zod';

export const roundSchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z.number(),
  qualifyCount: z.number().optional().nullable(),
  criteria: z.string().optional().nullable(),
});

export const eventSchema = z.object({
  name: z.string(),
  description: z.string(),
  eventType: z.enum(['COMPETITION', 'WORKSHOP', 'SEMINAR']),
  duration: z.number(),
  materialsProvided: z.array(z.string()),
  isCodes: z.array(z.string()),
  isTeamEvent: z.boolean().default(false),
  maxParticipants: z.number().optional().nullable(),
  minParticipants: z.number().optional().nullable(),
  startTime: z.string().or(z.date()),
  endTime: z.string().or(z.date()),
  venue: z.string(),
  rounds: z.array(roundSchema).optional(),
  image: z.string().optional(),
});

export const eventsArraySchema = z.array(eventSchema);
