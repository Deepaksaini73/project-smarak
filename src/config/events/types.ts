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
  type: string; // Mapped from eventType in schema
  location: string; // Mapped from venue in schema
  startTime: string | Date;
  endTime: string | Date;
  isTeamEvent: boolean;
  minTeamSize?: number; // Mapped from minParticipants in schema
  maxTeamSize?: number; // Mapped from maxParticipants in schema
  rounds?: Round[];

  // Optional properties
  materialsProvided?: string[];
  isCodes?: string[]; // Relevant IS codes
  status?: 'upcoming' | 'ongoing' | 'completed';

  // Timestamps
  createdAt?: string | Date;
  updatedAt?: string | Date;
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
