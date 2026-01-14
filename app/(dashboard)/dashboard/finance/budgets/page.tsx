'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Search,
  Download,
  Filter,
  Wallet,
  TrendingUp,
  Users,
  DollarSign,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

const monthlyData = [
  { month: 'Jan', budgets: 145, total: 125000 },
  { month: 'Feb', budgets: 178, total: 156000 },
  { month: 'Mar', budgets: 203, total: 189000 },
  { month: 'Apr', budgets: 234, total: 215000 },
  { month: 'May', budgets: 256, total: 234000 },
  { month: 'Jun', budgets: 289, total: 267000 },
];

const categoryData = [
  { name: 'Housing', value: 35, color: 'hsl(var(--chart-1))' },
  { name: 'Transportation', value: 15, color: 'hsl(var(--chart-2))' },
  { name: 'Food', value: 12, color: 'hsl(var(--chart-3))' },
  { name: 'Utilities', value: 10, color: 'hsl(var(--chart-4))' },
  { name: 'Entertainment', value: 8, color: 'hsl(var(--chart-5))' },
  { name: 'Other', value: 20, color: 'hsl(var(--muted))' },
];

const recentBudgets = [
  {
    id: '1',
    user: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    income: 5500,
    expenses: 4200,
    savings: 1300,
    date: new Date('2024-03-15'),
  },
  {
    id: '2',
    user: 'Michael Chen',
    email: 'm.chen@example.com',
    income: 7200,
    expenses: 5800,
    savings: 1400,
    date: new Date('2024-03-14'),
  },
  {
    id: '3',
    user: 'Emma Wilson',
    email: 'emma.w@example.com',
    income: 4800,
    expenses: 4000,
    savings: 800,
    date: new Date('2024-03-13'),
  },
  {
    id: '4',
    user: 'James Brown',
    email: 'j.brown@example.com',
    income: 6500,
    expenses: 5200,
    savings: 1300,
    date: new Date('2024-03-12'),
  },
  {
    id: '5',
    user: 'Olivia Davis',
    email: 'olivia.d@example.com',
    income: 8000,
    expenses: 6000,
    savings: 2000,
    date: new Date('2024-03-11'),
  },
];

export default function BudgetsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budget Tracking</h1>
          <p className="text-muted-foreground">
            Overview of user budgets and spending patterns.
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
              Total Budgets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">1,289</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Users with Budgets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">892</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">31% of all users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-500" />
              <p className="text-2xl font-bold">$6,234</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all budgets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Savings Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <p className="text-2xl font-bold">18.5%</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+2.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Budgets Created Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
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
                    dataKey="budgets"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    name="Budgets Created"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Average Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value}%`, 'Percentage']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2 text-sm">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-muted-foreground">{cat.name}</span>
                  <span className="ml-auto font-medium">{cat.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Budgets Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Budgets</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-[200px]" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budgets</SelectItem>
                <SelectItem value="positive">Positive Savings</SelectItem>
                <SelectItem value="negative">Over Budget</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Income</TableHead>
                <TableHead>Expenses</TableHead>
                <TableHead>Savings</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBudgets.map((budget) => {
                const savingsRate = ((budget.savings / budget.income) * 100).toFixed(1);
                return (
                  <TableRow key={budget.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{budget.user}</p>
                        <p className="text-sm text-muted-foreground">{budget.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-emerald-500">
                      {formatCurrency(budget.income)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatCurrency(budget.expenses)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={budget.savings > 0 ? 'success' : 'destructive'}
                      >
                        {formatCurrency(budget.savings)}
                      </Badge>
                    </TableCell>
                    <TableCell>{savingsRate}%</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(budget.date)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
