'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface UserSearchProps {
  search: string;
  setSearch: (search: string) => void;
}

export function UserSearch({ search, setSearch }: UserSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        placeholder="Search users..."
        className="pl-8 w-64"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
}
