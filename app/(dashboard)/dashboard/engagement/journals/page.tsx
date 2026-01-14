'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  Download,
  NotebookPen,
  Users,
  TrendingUp,
  Calendar,
  Eye,
} from 'lucide-react';
import { formatDate, getInitials, truncate } from '@/lib/utils';

const entriesData = [
  { month: 'Jan', entries: 234 },
  { month: 'Feb', entries: 312 },
  { month: 'Mar', entries: 389 },
  { month: 'Apr', entries: 445 },
  { month: 'May', entries: 512 },
  { month: 'Jun', entries: 589 },
];

const recentEntries = [
  {
    id: '1',
    user: 'Sarah Johnson',
    title: 'My savings journey begins',
    preview: 'Today I finally started tracking my expenses properly. I was shocked to see how much I was spending on...',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    wordCount: 342,
  },
  {
    id: '2',
    user: 'Michael Chen',
    title: 'Reached my first milestone!',
    preview: 'I cannot believe it - I just hit $5,000 in my emergency fund! When I started this journey three months ago...',
    createdAt: new Date(Date.now() - 1000 * 60 * 120),
    wordCount: 456,
  },
  {
    id: '3',
    user: 'Emma Wilson',
    title: 'Reflections on impulse buying',
    preview: 'The Sleep On It feature has been a game changer for me. I used to buy things without thinking...',
    createdAt: new Date(Date.now() - 1000 * 60 * 180),
    wordCount: 289,
  },
  {
    id: '4',
    user: 'James Brown',
    title: 'Budget review - February',
    preview: 'Looking back at this month, I am proud of the progress I have made. I managed to stay under budget in...',
    createdAt: new Date(Date.now() - 1000 * 60 * 240),
    wordCount: 512,
  },
  {
    id: '5',
    user: 'Olivia Davis',
    title: 'Learning about investing',
    preview: 'Just completed the Investing 101 module and I feel like a whole new world has opened up to me...',
    createdAt: new Date(Date.now() - 1000 * 60 * 300),
    wordCount: 378,
  },
  {
    id: '6',
    user: 'William Martinez',
    title: 'Why I track my net worth',
    preview: 'Every month, I take time to update my net worth tracker. At first, it felt tedious, but now I see...',
    createdAt: new Date(Date.now() - 1000 * 60 * 360),
    wordCount: 423,
  },
];

const topWriters = [
  { id: '1', name: 'Sarah Johnson', entries: 45, avgWords: 380 },
  { id: '2', name: 'Michael Chen', entries: 38, avgWords: 420 },
  { id: '3', name: 'Emma Wilson', entries: 32, avgWords: 290 },
  { id: '4', name: 'James Brown', entries: 28, avgWords: 510 },
  { id: '5', name: 'Olivia Davis', entries: 24, avgWords: 345 },
];

export default function JournalsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Journal Entries</h1>
          <p className="text-muted-foreground">
            Browse and monitor user journal activity.
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <NotebookPen className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">2,481</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Writers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">423</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">15% of all users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Entries This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">589</p>
            </div>
            <p className="text-xs text-emerald-500 mt-1">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Entry Length
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">378</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">words per entry</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Top Writers */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Journal Entries Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={entriesData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
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
                    dataKey="entries"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    name="Entries"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Writers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topWriters.map((writer, index) => (
                <div
                  key={writer.id}
                  className="flex items-center gap-4"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    {index + 1}
                  </span>
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10">
                      {getInitials(writer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{writer.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Avg. {writer.avgWords} words
                    </p>
                  </div>
                  <Badge variant="secondary">{writer.entries} entries</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Entries Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Entries</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search entries..." className="pl-10 w-[250px]" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead>Words</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {getInitials(entry.user)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{entry.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{entry.title}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-muted-foreground">
                      {truncate(entry.preview, 60)}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{entry.wordCount}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(entry.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
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
