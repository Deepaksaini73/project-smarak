export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  institute: string;
  hasPaid: boolean;
  createdAt: string;
  transactions: Transaction[];
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
