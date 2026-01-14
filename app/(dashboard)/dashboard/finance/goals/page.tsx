'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import {
  Search,
  Download,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

const progressData = [
  { month: 'Jan', completed: 12, inProgress: 45, total: 67 },
  { month: 'Feb', completed: 18, inProgress: 52, total: 89 },
  { month: 'Mar', completed: 25, inProgress: 68, total: 112 },
  { month: 'Apr', completed: 34, inProgress: 78, total: 134 },
  { month: 'May', completed: 42, inProgress: 92, total: 156 },
  { month: 'Jun', completed: 56, inProgress: 108, total: 189 },
];

const goalTypes = [
  { name: 'Emergency Fund', count: 423, avgProgress: 65 },
  { name: 'Vacation', count: 312, avgProgress: 45 },
  { name: 'New Car', count: 189, avgProgress: 38 },
  { name: 'Home Down Payment', count: 156, avgProgress: 28 },
  { name: 'Education', count: 134, avgProgress: 52 },
  { name: 'Retirement', count: 98, avgProgress: 35 },
];

const recentGoals = [
  {
    id: '1',
    user: 'Sarah Johnson',
    goal: 'Emergency Fund',
    target: 10000,
    current: 7500,
    progress: 75,
    status: 'on-track',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    user: 'Michael Chen',
    goal: 'Vacation to Japan',
    target: 5000,
    current: 3200,
    progress: 64,
    status: 'on-track',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    user: 'Emma Wilson',
    goal: 'New Laptop',
    target: 2000,
    current: 2000,
    progress: 100,
    status: 'completed',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '4',
    user: 'James Brown',
    goal: 'Home Down Payment',
    target: 50000,
    current: 12000,
    progress: 24,
    status: 'behind',
    createdAt: new Date('2023-11-10'),
  },
  {
    id: '5',
    user: 'Olivia Davis',
    goal: 'Wedding Fund',
    target: 15000,
    current: 8500,
    progress: 57,
    status: 'on-track',
    createdAt: new Date('2024-02-15'),
  },
];

export default function GoalsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
          <p className="text-muted-foreground">
            Track user goals and savings progress.
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">1,312</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Goals Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <p className="text-2xl font-bold">234</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">This year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">47%</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-500" />
              <p className="text-2xl font-bold">$2.4M</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">By all users</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Goal Progress Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
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
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    name="Completed"
                  />
                  <Line
                    type="monotone"
                    dataKey="inProgress"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="In Progress"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Popular Goal Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goalTypes.map((type) => (
                <div key={type.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{type.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {type.count} goals
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={type.avgProgress} className="h-2" />
                    <span className="text-xs text-muted-foreground w-10">
                      {type.avgProgress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Goals Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Goals</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search goals..." className="pl-10 w-[250px]" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Goal</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentGoals.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell className="font-medium">{goal.user}</TableCell>
                  <TableCell>{goal.goal}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 w-[150px]">
                      <Progress value={goal.progress} className="h-2" />
                      <span className="text-sm text-muted-foreground w-10">
                        {goal.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{formatCurrency(goal.current)}</p>
                      <p className="text-xs text-muted-foreground">
                        of {formatCurrency(goal.target)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        goal.status === 'completed'
                          ? 'success'
                          : goal.status === 'on-track'
                          ? 'info'
                          : 'warning'
                      }
                    >
                      {goal.status === 'completed' && <CheckCircle className="mr-1 h-3 w-3" />}
                      {goal.status === 'on-track' && <TrendingUp className="mr-1 h-3 w-3" />}
                      {goal.status === 'behind' && <Clock className="mr-1 h-3 w-3" />}
                      {goal.status.charAt(0).toUpperCase() + goal.status.slice(1).replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(goal.createdAt)}
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
