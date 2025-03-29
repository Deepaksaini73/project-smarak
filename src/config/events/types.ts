/**
 * Event and Round type definitions based on the Prisma schema
 * These types are used across the application for event-related components
 */

export interface Round {
  id?: string;
  name: string;
  description: string | null;
  duration: number;
  qualifyCount: number | null;
  criteria: string | null;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  eventType: string;
  venue: string;
  startTime: string | Date;
  endTime: string | Date;
  duration: number;
  isTeamEvent: boolean;
  minParticipants?: number;
  maxParticipants?: number;
  rounds?: Round[];

  materialsProvided?: string[];
  isCodes?: string[];
  status?: 'upcoming' | 'ongoing' | 'completed';

  createdAt?: string | Date;
  updatedAt?: string | Date;

  _count?: {
    registrations: number;
  };
}

/**
 * API response structure for events
 */
export interface EventsResponse {
  status: 'success' | 'error';
  data?: {
    events: Event[];
    total?: number;
  };
  message?: string;
}

export interface EventResponse {
  status: 'success' | 'error';
  data?: {
    event: Event;
  };
  message?: string;
}
