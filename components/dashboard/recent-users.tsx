'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getInitials, getRelativeTime } from '@/lib/utils';

const recentUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    joinedAt: new Date(Date.now() - 1000 * 60 * 15),
    avatar: '',
    streak: 7,
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    joinedAt: new Date(Date.now() - 1000 * 60 * 45),
    avatar: '',
    streak: 0,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    joinedAt: new Date(Date.now() - 1000 * 60 * 90),
    avatar: '',
    streak: 14,
  },
  {
    id: '4',
    name: 'James Brown',
    email: 'j.brown@example.com',
    joinedAt: new Date(Date.now() - 1000 * 60 * 180),
    avatar: '',
    streak: 3,
  },
  {
    id: '5',
    name: 'Olivia Davis',
    email: 'olivia.d@example.com',
    joinedAt: new Date(Date.now() - 1000 * 60 * 300),
    avatar: '',
    streak: 0,
  },
];

export function RecentUsers() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Sign-ups</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-muted">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  {user.streak > 0 && (
                    <Badge variant="success" className="text-xs">
                      {user.streak} day streak
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {getRelativeTime(user.joinedAt)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
