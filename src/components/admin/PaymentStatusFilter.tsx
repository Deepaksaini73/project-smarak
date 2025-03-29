'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

type PaymentFilter = 'all' | 'paid' | 'unpaid';

interface PaymentStatusFilterProps {
  paymentFilter: PaymentFilter;
  setPaymentFilter: (filter: PaymentFilter) => void;
}

export function PaymentStatusFilter({ paymentFilter, setPaymentFilter }: PaymentStatusFilterProps) {
  return (
    <div className="flex items-center gap-2 border rounded-md p-2">
      <Filter className="h-4 w-4 text-gray-500" />
      <span className="text-sm font-medium">Payment Status:</span>
      <div className="flex bg-muted rounded-md">
        <Button
          variant={paymentFilter === 'all' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-l-md ${paymentFilter === 'all' ? '' : 'hover:bg-muted-foreground/10'}`}
          onClick={() => setPaymentFilter('all')}
        >
          All
        </Button>
        <Button
          variant={paymentFilter === 'paid' ? 'default' : 'ghost'}
          size="sm"
          className={paymentFilter === 'paid' ? '' : 'hover:bg-muted-foreground/10'}
          onClick={() => setPaymentFilter('paid')}
        >
          Paid
        </Button>
        <Button
          variant={paymentFilter === 'unpaid' ? 'default' : 'ghost'}
          size="sm"
          className={`rounded-r-md ${paymentFilter === 'unpaid' ? '' : 'hover:bg-muted-foreground/10'}`}
          onClick={() => setPaymentFilter('unpaid')}
        >
          Unpaid
        </Button>
      </div>
    </div>
  );
}
