'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  UserPlus,
  Target,
  BookOpen,
  Wallet,
  Flame,
  Clock,
} from 'lucide-react';
import { getRelativeTime, cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'signup' | 'goal' | 'learning' | 'budget' | 'streak' | 'sleeponit';
  message: string;
  timestamp: Date;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'signup',
    message: 'New user Sarah Johnson signed up',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: '2',
    type: 'goal',
    message: 'Michael Chen achieved "Emergency Fund" goal',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: '3',
    type: 'learning',
    message: '15 users completed Credit Basics module',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '4',
    type: 'streak',
    message: 'Emma Wilson reached a 30-day streak!',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: '5',
    type: 'budget',
    message: '28 new budgets created today',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: '6',
    type: 'sleeponit',
    message: 'Users saved $1,234 via Sleep On It this week',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
  },
  {
    id: '7',
    type: 'signup',
    message: '12 new users joined today',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: '8',
    type: 'learning',
    message: 'Investing 101 is the most popular module today',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
  },
];

const iconMap = {
  signup: UserPlus,
  goal: Target,
  learning: BookOpen,
  budget: Wallet,
  streak: Flame,
  sleeponit: Clock,
};

const colorMap = {
  signup: 'text-blue-500 bg-blue-500/10',
  goal: 'text-emerald-500 bg-emerald-500/10',
  learning: 'text-purple-500 bg-purple-500/10',
  budget: 'text-amber-500 bg-amber-500/10',
  streak: 'text-orange-500 bg-orange-500/10',
  sleeponit: 'text-cyan-500 bg-cyan-500/10',
};

export function ActivityFeed() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = iconMap[activity.type];
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50"
                >
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full',
                      colorMap[activity.type]
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {getRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
