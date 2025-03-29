'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { useApi } from '@/hooks/use-api';
import { useState } from 'react';

export default function Page() {
  const { isLoading, makeRequest } = useApi();
  const [user, setUser] = useState({});
  const initiatePayment = async () => {
    try {
      if (!user) {
        toast.error('User not found');
        return;
      }
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          mobileNumber: user.phone,
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate payment');
      }

      window.location.href = data.url;
    } catch (error) {
      toast.error('Payment initiation failed');
      console.error(error);
    }
  };
  const getMe = async () => {
    const response = await makeRequest('GET', '/user/me');
    if (response.status === 'error') {
      toast.error('Failed to fetch user details');
      return;
    }
    setUser(response.data.data.user);
  };

  useEffect(() => {
    getMe();
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Button size={'lg'} onClick={initiatePayment} className="cursor-pointer">
        Pay
      </Button>
    </div>
  );
}
