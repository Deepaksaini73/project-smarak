import React, { useState } from 'react';
import { Event } from '@/config/events/types';
import { Loader2, Check, Copy, Users, Calendar, MapPin, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface RegistrationDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedEvent: Event | null;
  isRegistering: boolean;
  registrationComplete: boolean;
  teamCodeToShare: string;
  onSubmit: (data: { isTeamRegistration: boolean; teamName?: string; teamCode?: string }) => void;
}

export function RegistrationDialog({
  isOpen,
  setIsOpen,
  selectedEvent,
  isRegistering,
  registrationComplete,
  teamCodeToShare,
  onSubmit,
}: RegistrationDialogProps) {
  const [activeTab, setActiveTab] = useState('individual');
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');

  const formatDate = (date: string | Date) => {
    try {
      return format(new Date(date), 'PPP p');
    } catch (e) {
      return 'Date not available';
    }
  };

  const handleSubmit = () => {
    if (activeTab === 'individual') {
      onSubmit({ isTeamRegistration: false });
    } else if (activeTab === 'createTeam') {
      if (!teamName.trim()) {
        toast.error('Please enter a name for your team');
        return;
      }
      onSubmit({ isTeamRegistration: true, teamName: teamName.trim() });
    } else if (activeTab === 'joinTeam') {
      if (!teamCode.trim()) {
        toast.error('Please enter a valid team code');
        return;
      }
      onSubmit({ isTeamRegistration: true, teamCode: teamCode.trim() });
    }
  };

  const copyTeamCode = () => {
    navigator.clipboard.writeText(teamCodeToShare);
    toast.success('Team code copied to clipboard');
  };

  const resetDialog = () => {
    setActiveTab('individual');
    setTeamName('');
    setTeamCode('');
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open);
        if (!open) resetDialog();
      }}
    >
      <DialogContent className="sm:max-w-md font-outfit">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFD700] to-[#554400] rounded-t-lg"></div>

        {registrationComplete ? (
          <>
            <DialogHeader className="pb-2">
              <DialogTitle className="flex items-center gap-2 text-[#554400] font-outfit text-xl">
                <div className="bg-[#FFD700]/20 p-1.5 rounded-full">
                  <Check className="h-5 w-5 text-[#554400]" />
                </div>
                Registration Complete
              </DialogTitle>
              <DialogDescription className="font-outfit text-gray-700">
                {selectedEvent?.isTeamEvent && teamCodeToShare
                  ? 'Your team has been created. Share the team code with your teammates.'
                  : 'You have successfully registered for this event.'}
              </DialogDescription>
            </DialogHeader>

            {selectedEvent?.isTeamEvent && teamCodeToShare && (
              <div className="space-y-4 py-4">
                <div className="border-2 border-[#FFD700]/30 rounded-lg p-5 bg-[#fefbed]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-[#FFD700]/20 p-1 rounded-full">
                      <Tag className="h-4 w-4 text-[#554400]" />
                    </div>
                    <p className="font-medium text-[#554400]">Team Code</p>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-md border border-[#FFD700]/40">
                    <code className="font-mono text-sm font-semibold text-[#8D0000]">
                      {teamCodeToShare}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyTeamCode}
                      className="border-[#FFD700] text-[#554400] hover:bg-[#FFD700]/10"
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                    </Button>
                  </div>

                  <p className="text-sm mt-3 text-gray-600">
                    Share this code with your teammates so they can join your team.
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-[#554400] hover:bg-[#443700] text-white"
              >
                Close
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader className="pb-2 border-b border-[#FFD700]/20">
              <DialogTitle className="text-[#554400] font-outfit text-xl">
                Register for {selectedEvent?.name}
              </DialogTitle>
              <DialogDescription className="font-outfit text-gray-700">
                {selectedEvent?.isTeamEvent
                  ? 'This is a team event. You can create a new team or join an existing one.'
                  : 'You are registering for an individual event.'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4 max-h-[65dvh] overflow-y-auto">
              <div className="space-y-2">
                <h4 className="font-medium text-[#554400] flex items-center">
                  <div className="h-0.5 w-4 bg-[#FFD700] mr-2"></div>
                  Event Details
                </h4>
                <p className="text-sm text-gray-600">{selectedEvent?.description}</p>
              </div>

              <div className="grid grid-cols-1 gap-3 text-sm bg-[#fefbed] p-4 rounded-lg border border-[#FFD700]/20">
                {/* <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-[#554400]" />
                  <p className="font-medium text-[#554400]">
                    {selectedEvent && formatDate(selectedEvent.startTime)}
                  </p>
                </div> */}
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-[#554400]" />
                  <p className="font-medium text-[#554400]">{selectedEvent?.venue}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-[#554400]" />
                  <p className="font-medium text-[#554400]">
                    {selectedEvent?.duration && selectedEvent.duration > 660
                      ? `${Math.floor(selectedEvent.duration / 1440)} day${Math.floor(selectedEvent.duration / 1440) > 1 ? 's' : ''}${
                          Math.floor((selectedEvent.duration % 1440) / 60) > 0
                            ? ` ${Math.floor((selectedEvent.duration % 1440) / 60)} hour${Math.floor((selectedEvent.duration % 1440) / 60) > 1 ? 's' : ''}`
                            : ''
                        }`
                      : `${selectedEvent?.duration ?? 0} minute${(selectedEvent?.duration ?? 0) > 1 ? 's' : ''}`}
                  </p>
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-[#554400]" />
                  <p className="font-medium text-[#554400]">
                    {selectedEvent?.eventType} (
                    {selectedEvent?.isTeamEvent ? 'Team Event' : 'Individual Event'})
                  </p>
                </div>
              </div>

              {selectedEvent?.isTeamEvent && (
                <div className="border rounded-lg p-4 bg-[#554400]/5 border-[#554400]/20">
                  <p className="font-medium mb-2 text-[#554400]">Team Requirements</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-[#8D0000]" />
                    <span className="text-gray-700">
                      This event requires {selectedEvent.minParticipants || 1} to{' '}
                      {selectedEvent.maxParticipants || 'unlimited'} participants per team.
                    </span>
                  </div>
                </div>
              )}

              {selectedEvent?.isTeamEvent && (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-[#fefbed] mb-3">
                    <TabsTrigger
                      value="createTeam"
                      className="font-outfit text-base data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#554400]"
                    >
                      Create Team
                    </TabsTrigger>
                    <TabsTrigger
                      value="joinTeam"
                      className="font-outfit text-base data-[state=active]:bg-[#FFD700] data-[state=active]:text-[#554400]"
                    >
                      Join Team
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="createTeam" className="space-y-4 py-2 mt-0">
                    <div className="space-y-2">
                      <Label htmlFor="teamName" className="text-[#554400]">
                        Team Name
                      </Label>
                      <Input
                        id="teamName"
                        placeholder="Enter your team name"
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)}
                        className="border-[#FFD700]/30 focus-visible:ring-[#554400]"
                      />
                      <p className="text-xs text-gray-500">
                        You&apos;ll be registered as the team leader.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="joinTeam" className="space-y-4 py-2 mt-0">
                    <div className="space-y-2">
                      <Label htmlFor="teamCode" className="text-[#554400]">
                        Team Code
                      </Label>
                      <Input
                        id="teamCode"
                        placeholder="Enter team code provided by your team leader"
                        value={teamCode}
                        onChange={e => setTeamCode(e.target.value)}
                        className="border-[#FFD700]/30 focus-visible:ring-[#554400]"
                      />
                      <p className="text-xs text-gray-500">
                        Get this code from your team leader to join their team.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>

            <DialogFooter className="border-t border-[#FFD700]/20 pt-3">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="border-[#FFD700]/30 text-[#554400] hover:bg-[#fefbed]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isRegistering}
                className="bg-[#554400] hover:bg-[#443700] text-white"
              >
                {isRegistering ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Confirm Registration'
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
