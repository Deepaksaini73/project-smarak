'use client';

import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { ProfileContent } from '@/components/profile/ProfileContent';
import { EventsContent } from '@/components/profile/EventsContent';
import { Registration } from '@/types/registration';
import { User } from '@/config/profile/types';
import { NotRegisteredState } from '@/components/profile/NotRegisteredState';

export default function ProfilePage() {
  const { makeRequest } = useApi();
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(true);
  const [userProfile, setUserProfile] = useState<User | null>(null);
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
    <div className="container mx-auto py-8 px-8 relative my-10 max-w-7xl min-h-screen">
      {userProfile?.email ? (
        <>
          <div className="inline-block mb-6 py-1">
            <h1 className="text-5xl font-bold text-[#554400] font-outfit">My Profile</h1>
            <div className="absolute w-28 h-2 bg-[#554400] mt-1"></div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 mt-10">
            <TabsList className="grid grid-cols-2 w-full max-w-md bg-[#fefbed]">
              <TabsTrigger
                value="personal"
                className="font-outfit text-lg data-[state=active]:bg-[#554400] data-[state=active]:text-[#fff]"
              >
                Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="font-outfit text-lg data-[state=active]:bg-[#554400] data-[state=active]:text-[#fff]"
              >
                Registered Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="font-outfit text-gray-800">
              {isLoadingProfile ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#554400]" />
                </div>
              ) : (
                <ProfileContent user={userProfile!} />
              )}
            </TabsContent>

            <TabsContent value="events" className="font-outfit text-gray-800">
              <EventsContent registrations={registrations} isLoading={isLoadingRegistrations} />
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <NotRegisteredState />
      )}
    </div>
  );
}
