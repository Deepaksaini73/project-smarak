'use client';

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationControlsProps {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  setPagination: (
    value: React.SetStateAction<{
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    }>
  ) => void;
}

export function PaginationControls({ pagination, setPagination }: PaginationControlsProps) {
  if (pagination.totalPages <= 1) return null;

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              setPagination(prev => ({
                ...prev,
                page: Math.max(1, prev.page - 1),
              }))
            }
            className={pagination.page <= 1 ? 'opacity-50 cursor-not-allowed' : ''}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="px-4">
            Page {pagination.page} of {pagination.totalPages}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              setPagination(prev => ({
                ...prev,
                page: Math.min(prev.totalPages, prev.page + 1),
              }))
            }
            className={
              pagination.page >= pagination.totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
