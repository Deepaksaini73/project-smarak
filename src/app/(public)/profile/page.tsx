'use client';

import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Loader2, Check } from 'lucide-react';
import { ProfileContent } from '@/components/profile/ProfileContent';
import { EventsContent } from '@/components/profile/EventsContent';
import { Registration } from '@/types/registration';
import { User } from '@/config/profile/types';
import { NotRegisteredState } from '@/components/profile/NotRegisteredState';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { makeRequest } = useApi();
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(true);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);

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
        if (response.data.data.user.referrals) {
          setReferralCount(response.data.data.user.referrals.length);
        }
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

  const copyReferralCode = () => {
    if (userProfile?.referralCode) {
      navigator.clipboard.writeText(userProfile.referralCode);
      setCopied(true);
      toast.success('Referral code copied to clipboard!');

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchUserRegistrations();
  }, []);

  return (
    <div className="container mx-auto py-8 px-8 relative my-10 max-w-7xl min-h-screen">
      {isLoadingProfile ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-[#554400]" />
          <p className="mt-4 text-[#554400] font-outfit">Loading profile...</p>
        </div>
      ) : userProfile?.email ? (
        <>
          <div className="inline-block mb-6 py-1">
            <h1 className="text-5xl font-bold text-[#554400] font-outfit">My Profile</h1>
            <div className="absolute w-28 h-2 bg-[#554400] mt-1"></div>
          </div>

          {/* Referral Code Card */}

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
                <>
                  <div className="bg-[#fefbed] border border-[#e6d080] rounded-lg p-6 mb-8 shadow-sm">
                    <h2 className="text-2xl font-semibold text-[#554400] mb-3 font-outfit">
                      My Referral Code
                    </h2>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="bg-white border border-[#e6d080] rounded px-4 py-2 flex-1 font-mono text-lg ">
                            {userProfile?.referralCode || 'Loading...'}
                          </div>
                          <Button
                            onClick={copyReferralCode}
                            className="ml-2 bg-[#554400] hover:bg-[#443700] font-outfit text-white"
                            disabled={!userProfile?.referralCode}
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            <span className="ml-2 hidden md:inline">
                              {copied ? 'Copied!' : 'Copy'}
                            </span>
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 font-outfit">
                          Share this code with friends when they register.{' '}
                          <em>Note: Only valid registerations will be finalized for rewards.</em>
                        </p>
                      </div>
                      <div className="md:border-l md:border-[#e6d080] md:pl-6">
                        <div className="text-center">
                          <span className="block text-3xl font-bold text-[#554400] font-outfit">
                            {referralCount}
                          </span>
                          <span className="text-sm text-gray-600 font-outfit">
                            Friends Referred
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ProfileContent user={userProfile!} />
                </>
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
