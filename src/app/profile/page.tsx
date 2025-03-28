'use client';
import React, { useEffect, useState } from 'react';
import { useApi } from '@/hooks/use-api';
import { User } from '../../config/profile/types';
import { LoadingState } from '../../components/profile/LoadingState';
import { ErrorState } from '../../components/profile/ErrorState';
import { NotRegisteredState } from '../../components/profile/NotRegisteredState';
import { ProfileContent } from '../../components/profile/ProfileContent';
import { usePayment } from '@/hooks/usePayment';

export default function Profile() {
  const { isLoading, makeRequest } = useApi();
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { paymentStatus, hasPaid } = usePayment();
  // Using console.warn instead of console.log
  console.warn('Payment status:', paymentStatus, 'Has paid:', hasPaid);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeRequest('GET', '/user/me');
        if (response.data) {
          setUser(response.data.data.user);
          setIsRegistered(true);
        } else {
          setIsRegistered(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load profile data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">User Profile</h1>

      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} />
      ) : !isRegistered ? (
        <NotRegisteredState />
      ) : user ? (
        <ProfileContent user={user} />
      ) : null}
    </div>
  );
}
