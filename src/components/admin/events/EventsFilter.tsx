import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EventType } from '@prisma/client';

interface EventsFilterProps {
  search: string;
  setSearch: (value: string) => void;
  eventType: string;
  setEventType: (value: string) => void;
  teamFilter: string;
  setTeamFilter: (value: string) => void;
}

export function EventsFilter({
  search,
  setSearch,
  eventType,
  setEventType,
  teamFilter,
  setTeamFilter,
}: EventsFilterProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
      <div className="relative w-full md:w-80">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <Select value={eventType} onValueChange={setEventType}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value={EventType.COMPETITION}>Competition</SelectItem>
            <SelectItem value={EventType.WORKSHOP}>Workshop</SelectItem>
            <SelectItem value={EventType.SEMINAR}>Seminar</SelectItem>
          </SelectContent>
        </Select>

        <Select value={teamFilter} onValueChange={setTeamFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Formats</SelectItem>
            <SelectItem value="team">Team Events</SelectItem>
            <SelectItem value="individual">Individual Events</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
