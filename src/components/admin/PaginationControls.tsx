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
  const totalPages = Math.max(1, pagination.totalPages);

  console.log('PaginationControls render', {
    page: pagination.page,
    totalPages: pagination.totalPages,
    total: pagination.total,
  });

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
            className={pagination.page <= 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="px-4">
            Page {pagination.page} of {totalPages || 1}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              setPagination(prev => ({
                ...prev,
                page: Math.min(totalPages, prev.page + 1),
              }))
            }
            className={
              pagination.page >= totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
