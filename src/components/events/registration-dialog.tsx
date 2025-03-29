import React, { useState } from 'react';
import { Event } from '@/config/events/types';
import { Loader2, Check, Copy, Users } from 'lucide-react';
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
      <DialogContent className="sm:max-w-md">
        {registrationComplete ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                Registration Complete
              </DialogTitle>
              <DialogDescription>
                {selectedEvent?.isTeamEvent && teamCodeToShare
                  ? 'Your team has been created. Share the team code with your teammates.'
                  : 'You have successfully registered for this event.'}
              </DialogDescription>
            </DialogHeader>

            {selectedEvent?.isTeamEvent && teamCodeToShare && (
              <div className="space-y-4 py-4">
                <div className="border rounded-lg p-4 bg-secondary/10">
                  <p className="font-medium mb-2">Team Code</p>
                  <div className="flex items-center gap-2">
                    <code className="relative rounded bg-muted px-[0.5rem] py-[0.3rem] font-mono text-sm font-semibold">
                      {teamCodeToShare}
                    </code>
                    <Button variant="outline" size="icon" onClick={copyTeamCode}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm mt-2">
                    Share this code with your teammates so they can join your team.
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Register for {selectedEvent?.name}</DialogTitle>
              <DialogDescription>
                {selectedEvent?.isTeamEvent
                  ? 'This is a team event. You can create a new team or join an existing one.'
                  : 'You are registering for an individual event.'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="font-medium">Event Details</h4>
                <p className="text-sm text-muted-foreground">{selectedEvent?.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-muted-foreground">
                    {selectedEvent && formatDate(selectedEvent.startTime)}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Venue</p>
                  <p className="text-muted-foreground">{selectedEvent?.venue}</p>
                </div>
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-muted-foreground">{selectedEvent?.duration} minutes</p>
                </div>
                <div>
                  <p className="font-medium">Event Type</p>
                  <p className="text-muted-foreground">
                    {selectedEvent?.eventType} ({selectedEvent?.isTeamEvent ? 'Team' : 'Individual'}
                    )
                  </p>
                </div>
              </div>

              {selectedEvent?.isTeamEvent && (
                <div className="border rounded-lg p-4 bg-secondary/10">
                  <p className="font-medium mb-2">Team Requirements</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4" />
                    <span>
                      This event requires {selectedEvent.minParticipants || 1} to{' '}
                      {selectedEvent.maxParticipants || 'unlimited'} participants per team.
                    </span>
                  </div>
                </div>
              )}

              {selectedEvent?.isTeamEvent && (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="createTeam">Create Team</TabsTrigger>
                    <TabsTrigger value="joinTeam">Join Team</TabsTrigger>
                  </TabsList>
                  <TabsContent value="createTeam" className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="teamName">Team Name</Label>
                      <Input
                        id="teamName"
                        placeholder="Enter your team name"
                        value={teamName}
                        onChange={e => setTeamName(e.target.value)}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="joinTeam" className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="teamCode">Team Code</Label>
                      <Input
                        id="teamCode"
                        placeholder="Enter team code provided by your team leader"
                        value={teamCode}
                        onChange={e => setTeamCode(e.target.value)}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isRegistering}>
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
