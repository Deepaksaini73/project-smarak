import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Registration } from '@/config/admin/types';

interface RegistrationDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registration: Registration | null;
  onDelete: (id: string) => void;
}

export default function RegistrationDetailsDialog({
  open,
  onOpenChange,
  registration,
  onDelete,
}: RegistrationDetailsDialogProps) {
  if (!registration) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Registration Details</DialogTitle>
          <DialogDescription>Detailed information about the registration</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Event</h3>
              <p>{registration.event.name}</p>
              <p className="text-sm text-muted-foreground">
                {registration.event.eventType} •
                {registration.event.isTeamEvent ? ' Team Event' : ' Individual Event'}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">
              {registration.isTeam ? 'Team Information' : 'Participant Information'}
            </h3>
            {registration.isTeam ? (
              <>
                <p>
                  <span className="font-medium">Team Name:</span> {registration.teamName}
                </p>
                <p>
                  <span className="font-medium">Team Code:</span> {registration.teamCode}
                </p>

                <h4 className="font-medium mt-3 mb-1">Team Members</h4>
                <div className="bg-muted rounded-md p-3 max-h-60 overflow-y-auto">
                  {registration.teamMembers.map(member => (
                    <div key={member.id} className="p-2 border-b last:border-b-0">
                      <div className="flex justify-between">
                        <div className="font-medium">
                          {member.user.name}
                          {member.isTeamLead && (
                            <span className="ml-2 text-xs bg-primary/10 text-primary py-0.5 px-2 rounded-full">
                              Team Lead
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-1 text-sm">
                        <div>
                          <span className="text-muted-foreground">Email:</span> {member.user.email}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone:</span> {member.user.phone}
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Institute:</span>{' '}
                          {member.user.institute}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-muted rounded-md p-3">
                <p>
                  <span className="font-medium">Name:</span> {registration.user?.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {registration.user?.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {registration.user?.phone}
                </p>
                <p>
                  <span className="font-medium">Institute:</span> {registration.user?.institute}
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="destructive" onClick={() => onDelete(registration.id)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Registration
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
