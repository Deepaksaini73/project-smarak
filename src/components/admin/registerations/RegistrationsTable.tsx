import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';
import { Registration } from '@/config/admin/types';

interface RegistrationsTableProps {
  registrations: Registration[];
  onViewDetails: (registration: Registration) => void;
  onDeleteClick: (id: string) => void;
}

export default function RegistrationsTable({
  registrations,
  onViewDetails,
  onDeleteClick,
}: RegistrationsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-14">S.No</TableHead>
          <TableHead>Event</TableHead>
          <TableHead>Registration Type</TableHead>
          <TableHead>Name/Team</TableHead>
          <TableHead>Members</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Registration Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {registrations.map((reg, index) => (
          <TableRow key={reg.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>
              <div className="font-medium">{reg.event.name}</div>
              <div className="text-sm text-muted-foreground">{reg.event.eventType}</div>
            </TableCell>
            <TableCell>{reg.isTeam ? 'Team' : 'Individual'}</TableCell>
            <TableCell>
              {reg.isTeam ? (
                <div>
                  <div className="font-medium">{reg.teamName}</div>
                  <div className="text-xs text-muted-foreground">Code: {reg.teamCode}</div>
                </div>
              ) : (
                reg.user?.name
              )}
            </TableCell>
            <TableCell>
              {reg.teamMembers.length > 0 ? (
                <div className="max-h-24 overflow-y-auto">
                  {reg.teamMembers.map(member => (
                    <div key={member.id} className="text-sm mb-1">
                      {member.user.name}
                      {member.isTeamLead && <span className="ml-1 text-xs">(Lead)</span>}
                    </div>
                  ))}
                </div>
              ) : (
                'None'
              )}
            </TableCell>
            <TableCell>
              <div className="text-sm">{reg.user?.email}</div>
              <div className="text-sm">{reg.user?.phone}</div>
            </TableCell>
            <TableCell>{new Date(reg.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => onViewDetails(reg)}
                >
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs text-red-500 border-red-200 hover:bg-red-50"
                  onClick={() => onDeleteClick(reg.id)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
