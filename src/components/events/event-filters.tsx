import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EventFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  eventTypeFilter: string;
  setEventTypeFilter: (type: string) => void;
  isTeamEventFilter: string;
  setIsTeamEventFilter: (type: string) => void;
}

export function EventFilters({
  searchQuery,
  setSearchQuery,
  eventTypeFilter,
  setEventTypeFilter,
  isTeamEventFilter,
  setIsTeamEventFilter,
}: EventFiltersProps) {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
      <Input
        placeholder="Search events..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="w-full md:w-60"
      />

      <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
        <SelectTrigger className="w-full md:w-40">
          <SelectValue placeholder="Event Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="technical">Technical</SelectItem>
          <SelectItem value="cultural">Cultural</SelectItem>
          <SelectItem value="sports">Sports</SelectItem>
          <SelectItem value="workshop">Workshop</SelectItem>
        </SelectContent>
      </Select>

      <Select value={isTeamEventFilter} onValueChange={setIsTeamEventFilter}>
        <SelectTrigger className="w-full md:w-40">
          <SelectValue placeholder="Participation Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Events</SelectItem>
          <SelectItem value="individual">Individual</SelectItem>
          <SelectItem value="team">Team</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
