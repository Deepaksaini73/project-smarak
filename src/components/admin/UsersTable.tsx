'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { TransactionStatusBadge } from './TransactionStatusBadge';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  institute: string;
  hasPaid: boolean;
  createdAt: string;
  transactions: Transaction[];
  referrals: any[]; // Referral array
}

interface Transaction {
  id: string;
  amount: number;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  paymentScreenshot: string;
  notes?: string | null;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  sortConfig: SortConfig;
  handleSort: (key: string) => void;
  openImagePreview: (imageUrl: string) => void;
  openStatusModal: (
    transactionId: string,
    userId: string,
    currentStatus: 'pending' | 'verified' | 'rejected',
    targetStatus: 'pending' | 'verified' | 'rejected'
  ) => void;
}

export function UsersTable({
  users,
  isLoading,
  sortConfig,
  handleSort,
  openImagePreview,
  openStatusModal,
}: UsersTableProps) {
  const getStatusChangeOptions = (transaction: Transaction) => {
    switch (transaction.status) {
      case 'pending':
        return [
          { status: 'verified', label: 'Verify' },
          { status: 'rejected', label: 'Reject' },
        ];
      case 'verified':
        return [
          { status: 'pending', label: 'Mark as Pending' },
          { status: 'rejected', label: 'Reject' },
        ];
      case 'rejected':
        return [
          { status: 'pending', label: 'Mark as Pending' },
          { status: 'verified', label: 'Verify' },
        ];
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
              Name
              {sortConfig.key === 'name' && (
                <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
              )}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('email')}>
              Email
              {sortConfig.key === 'email' && (
                <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
              )}
            </TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Institute</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Payment Proof</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('referralsCount')}>
              Referrals
              {sortConfig.key === 'referralsCount' && (
                <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
              )}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                Loading...
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.institute}</TableCell>
                <TableCell>
                  {user.transactions && user.transactions.length > 0 ? (
                    <TransactionStatusBadge status={user.transactions[0].status} />
                  ) : (
                    'No transaction'
                  )}
                </TableCell>
                <TableCell>
                  {user.transactions && user.transactions.length > 0 && (
                    <Button
                      variant="link"
                      onClick={() => openImagePreview(user.transactions[0].paymentScreenshot)}
                    >
                      View Proof
                    </Button>
                  )}
                </TableCell>
                <TableCell>{user.referrals ? user.referrals.length : 0}</TableCell>
                <TableCell>
                  {user.transactions && user.transactions.length > 0 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Actions <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {getStatusChangeOptions(user.transactions[0]).map(option => (
                          <DropdownMenuItem
                            key={option.status}
                            onClick={() =>
                              openStatusModal(
                                user.transactions![0].id,
                                user.id,
                                user.transactions![0].status,
                                option.status as 'pending' | 'verified' | 'rejected'
                              )
                            }
                          >
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
