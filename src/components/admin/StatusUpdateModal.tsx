'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface StatusUpdateModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedTransaction: {
    transactionId: string;
    userId: string;
    currentStatus: 'pending' | 'verified' | 'rejected';
    targetStatus: 'pending' | 'verified' | 'rejected';
  } | null;
  statusNotes: string;
  setStatusNotes: (notes: string) => void;
  onConfirm: () => void;
}

export function StatusUpdateModal({
  isOpen,
  onOpenChange,
  selectedTransaction,
  statusNotes,
  setStatusNotes,
  onConfirm,
}: StatusUpdateModalProps) {
  const modalTitle = selectedTransaction
    ? `Change status from ${selectedTransaction.currentStatus} to ${selectedTransaction.targetStatus}`
    : 'Update Transaction Status';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>
        {selectedTransaction?.targetStatus === 'rejected' && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes (required)
              </label>
              <Textarea
                id="notes"
                placeholder="Please provide a reason for rejection"
                value={statusNotes}
                onChange={e => setStatusNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setStatusNotes('');
            }}
          >
            Cancel
          </Button>
          <Button
            variant={selectedTransaction?.targetStatus === 'rejected' ? 'destructive' : 'default'}
            onClick={onConfirm}
            disabled={selectedTransaction?.targetStatus === 'rejected' && !statusNotes.trim()}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
