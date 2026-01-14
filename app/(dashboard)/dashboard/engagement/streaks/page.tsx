'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Search,
  Flame,
  Trophy,
  Users,
  TrendingUp,
  RotateCcw,
  Crown,
} from 'lucide-react';
import { formatDate, getInitials, cn } from '@/lib/utils';

const streakDistribution = [
  { range: '1-7 days', users: 456 },
  { range: '8-14 days', users: 234 },
  { range: '15-30 days', users: 156 },
  { range: '31-60 days', users: 89 },
  { range: '60+ days', users: 45 },
];

const topStreakers = [
  {
    id: '1',
    name: 'William Martinez',
    email: 'w.martinez@example.com',
    streak: 87,
    lastActive: new Date(Date.now() - 1000 * 60 * 30),
    rank: 1,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    streak: 72,
    lastActive: new Date(Date.now() - 1000 * 60 * 45),
    rank: 2,
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    streak: 65,
    lastActive: new Date(Date.now() - 1000 * 60 * 120),
    rank: 3,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    streak: 54,
    lastActive: new Date(Date.now() - 1000 * 60 * 60),
    rank: 4,
  },
  {
    id: '5',
    name: 'James Brown',
    email: 'j.brown@example.com',
    streak: 48,
    lastActive: new Date(Date.now() - 1000 * 60 * 90),
    rank: 5,
  },
];

const allUsers = [
  { id: '1', name: 'William Martinez', email: 'w.martinez@example.com', streak: 87, eligible: true, startDate: new Date('2024-01-02') },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@example.com', streak: 72, eligible: true, startDate: new Date('2024-01-15') },
  { id: '3', name: 'Michael Chen', email: 'm.chen@example.com', streak: 65, eligible: true, startDate: new Date('2024-01-20') },
  { id: '4', name: 'Emma Wilson', email: 'emma.w@example.com', streak: 54, eligible: true, startDate: new Date('2024-02-01') },
  { id: '5', name: 'James Brown', email: 'j.brown@example.com', streak: 48, eligible: true, startDate: new Date('2024-02-05') },
  { id: '6', name: 'Olivia Davis', email: 'olivia.d@example.com', streak: 0, eligible: false, startDate: null },
  { id: '7', name: 'Alexander Lee', email: 'alex.lee@example.com', streak: 12, eligible: true, startDate: new Date('2024-03-01') },
];

export default function StreaksPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Streak Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage user engagement streaks.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Users with Streaks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <p className="text-2xl font-bold">980</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">34% of all users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">12.4 days</p>
            </div>
            <p className="text-xs text-emerald-500 mt-1">+2.1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Longest Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <p className="text-2xl font-bold">87 days</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">William Martinez</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Streaks Lost Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-red-500" />
              <p className="text-2xl font-bold">23</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Users who broke streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Leaderboard */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Streak Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={streakDistribution}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="range"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar
                    dataKey="users"
                    fill="hsl(var(--chart-4))"
                    radius={[4, 4, 0, 0]}
                    name="Users"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStreakers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                >
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
                      user.rank === 1 && 'bg-amber-500 text-white',
                      user.rank === 2 && 'bg-gray-400 text-white',
                      user.rank === 3 && 'bg-amber-700 text-white',
                      user.rank > 3 && 'bg-muted text-muted-foreground'
                    )}
                  >
                    {user.rank}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-background">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-1 text-orange-500">
                    <Flame className="h-5 w-5" />
                    <span className="text-xl font-bold">{user.streak}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Users Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All User Streaks</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-10 w-[250px]" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Current Streak</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Streak Start</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-muted">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.streak > 0 ? (
                      <div className="flex items-center gap-2">
                        <Flame className="h-5 w-5 text-orange-500" />
                        <span className="text-xl font-bold">{user.streak}</span>
                        <span className="text-muted-foreground">days</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No streak</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.eligible ? 'success' : 'secondary'}>
                      {user.eligible ? 'Eligible' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.startDate ? formatDate(user.startDate) : '-'}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" disabled={user.streak === 0}>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
