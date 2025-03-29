import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EventsHeaderProps {
  onCreateEvent: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  eventTypeFilter: string | null;
  setEventTypeFilter: (type: string | null) => void;
  isTeamEventFilter: boolean | null;
  setIsTeamEventFilter: (isTeam: boolean | null) => void;
}

export function EventsHeader({
  onCreateEvent,
  searchQuery,
  setSearchQuery,
  eventTypeFilter,
  setEventTypeFilter,
  isTeamEventFilter,
  setIsTeamEventFilter,
}: EventsHeaderProps) {
  // Convert boolean/null to readable string values
  const getParticipationTypeValue = () => {
    if (isTeamEventFilter === null) return 'all';
    return isTeamEventFilter ? 'team' : 'single';
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events Management</h1>
        <Button onClick={onCreateEvent}>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select
          value={eventTypeFilter || 'all'}
          onValueChange={value => setEventTypeFilter(value === 'all' ? null : value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="COMPETITION">Competition</SelectItem>
            <SelectItem value="WORKSHOP">Workshop</SelectItem>
            <SelectItem value="SEMINAR">Seminar</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={getParticipationTypeValue()}
          onValueChange={value => {
            if (value === 'all') {
              setIsTeamEventFilter(null);
            } else if (value === 'team') {
              setIsTeamEventFilter(true);
            } else if (value === 'single') {
              setIsTeamEventFilter(false);
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Participation Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="team">Team Events</SelectItem>
            <SelectItem value="single">Individual Events</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
