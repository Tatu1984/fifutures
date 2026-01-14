'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  MoreHorizontal,
  Eye,
  Mail,
  Trash2,
  RotateCcw,
  Flame,
} from 'lucide-react';
import { formatDate, getInitials, getRelativeTime } from '@/lib/utils';

interface User {
  id: string;
  displayName: string;
  email: string;
  photoUrl: string | null;
  createdTime: Date;
  lastLogin: Date | null;
  streak: number;
  isActive: boolean;
}

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    displayName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    photoUrl: null,
    createdTime: new Date('2024-01-15'),
    lastLogin: new Date(Date.now() - 1000 * 60 * 30),
    streak: 14,
    isActive: true,
  },
  {
    id: '2',
    displayName: 'Michael Chen',
    email: 'm.chen@example.com',
    photoUrl: null,
    createdTime: new Date('2024-02-20'),
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2),
    streak: 7,
    isActive: true,
  },
  {
    id: '3',
    displayName: 'Emma Wilson',
    email: 'emma.w@example.com',
    photoUrl: null,
    createdTime: new Date('2024-03-05'),
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    streak: 0,
    isActive: false,
  },
  {
    id: '4',
    displayName: 'James Brown',
    email: 'j.brown@example.com',
    photoUrl: null,
    createdTime: new Date('2024-01-28'),
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 5),
    streak: 21,
    isActive: true,
  },
  {
    id: '5',
    displayName: 'Olivia Davis',
    email: 'olivia.d@example.com',
    photoUrl: null,
    createdTime: new Date('2024-04-10'),
    lastLogin: null,
    streak: 0,
    isActive: false,
  },
  {
    id: '6',
    displayName: 'William Martinez',
    email: 'w.martinez@example.com',
    photoUrl: null,
    createdTime: new Date('2024-02-14'),
    lastLogin: new Date(Date.now() - 1000 * 60 * 45),
    streak: 30,
    isActive: true,
  },
  {
    id: '7',
    displayName: 'Sophia Anderson',
    email: 'sophia.a@example.com',
    photoUrl: null,
    createdTime: new Date('2024-03-22'),
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24),
    streak: 5,
    isActive: true,
  },
  {
    id: '8',
    displayName: 'Alexander Lee',
    email: 'alex.lee@example.com',
    photoUrl: null,
    createdTime: new Date('2024-01-05'),
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 48),
    streak: 0,
    isActive: false,
  },
];

export function UserTable() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedUsers.length === mockUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(mockUsers.map((u) => u.id));
    }
  };

  const toggleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedUsers.length === mockUsers.length}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Streak</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={() => toggleSelectUser(user.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoUrl || ''} alt={user.displayName} />
                    <AvatarFallback className="bg-muted text-sm">
                      {getInitials(user.displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.displayName}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={user.isActive ? 'success' : 'secondary'}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell>
                {user.streak > 0 ? (
                  <div className="flex items-center gap-1.5">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">{user.streak} days</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(user.createdTime)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {user.lastLogin ? getRelativeTime(user.lastLogin) : 'Never'}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/users/${user.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset Streak
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
