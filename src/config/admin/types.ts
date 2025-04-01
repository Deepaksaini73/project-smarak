export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  institute: string;
  hasPaid: boolean;
  createdAt: string;
  transactions: Transaction[];
  referrals: any[];
};

export type Transaction = {
  id: string;
  amount: number;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  paymentScreenshot: string;
  notes?: string | null;
};

export type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

export type PaymentFilter = 'all' | 'paid' | 'unpaid';

export type Registration = {
  id: string;
  eventId: string;
  isTeam: boolean;
  teamName: string | null;
  teamCode: string | null;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  event: {
    id: string;
    name: string;
    eventType: string;
    isTeamEvent: boolean;
  };
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    institute: string;
    hasPaid: boolean;
  } | null;
  teamMembers: Array<{
    id: string;
    isTeamLead: boolean;
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
      institute: string;
    };
  }>;
};

export type Event = {
  id: string;
  name: string;
  eventType: string;
};
