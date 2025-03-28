'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TransactionStatusBadgeProps {
  status: string;
}

export function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  switch (status) {
    case 'verified':
      return <Badge className="bg-green-500">Verified</Badge>;
    case 'rejected':
      return <Badge className="bg-red-500">Rejected</Badge>;
    default:
      return <Badge className="bg-yellow-500">Pending</Badge>;
  }
}
