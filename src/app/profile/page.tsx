'use client';

import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { ProfileContent } from '@/components/profile/ProfileContent';
import { EventsContent } from '@/components/profile/EventsContent';
import { Registration } from '@/types/registration';

export default function ProfilePage() {
  const { makeRequest } = useApi();
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const fetchUserProfile = async () => {
    setIsLoadingProfile(true);
    try {
      const response = await makeRequest(
        'GET',
        '/user',
        undefined,
        'Failed to fetch profile',
        false
      );

      if (response.status === 'success') {
        setUserProfile(response.data.data.user);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const fetchUserRegistrations = async () => {
    setIsLoadingRegistrations(true);
    try {
      const response = await makeRequest(
        'GET',
        '/user/registrations',
        undefined,
        'Failed to fetch your registrations',
        false
      );

      if (response.status === 'success') {
        setRegistrations(response.data.data.registrations || []);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setIsLoadingRegistrations(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserRegistrations();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="events">My Events</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          {isLoadingProfile ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <ProfileContent user={userProfile!} />
          )}
        </TabsContent>

        <TabsContent value="events">
          <EventsContent registrations={registrations} isLoading={isLoadingRegistrations} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
