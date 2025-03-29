export interface Registration {
  id: string;
  eventId: string;
  isTeam: boolean;
  teamName?: string;
  teamCode?: string;
  status: string;
  event: {
    id: string;
    name: string;
    description: string;
    eventType: string;
    venue: string;
    startTime: string;
    isTeamEvent: boolean;
  };
  teamMembers: {
    id: string;
    userId: string;
    isTeamLead: boolean;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }[];
}
