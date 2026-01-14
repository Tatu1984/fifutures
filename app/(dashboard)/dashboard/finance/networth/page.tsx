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
  AreaChart,
  Area,
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
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Car,
  CreditCard,
  Landmark,
} from 'lucide-react';
import { formatCurrency, formatDate, cn } from '@/lib/utils';

const trendData = [
  { month: 'Jan', avgNetWorth: 125000, users: 234 },
  { month: 'Feb', avgNetWorth: 132000, users: 256 },
  { month: 'Mar', avgNetWorth: 145000, users: 278 },
  { month: 'Apr', avgNetWorth: 156000, users: 298 },
  { month: 'May', avgNetWorth: 168000, users: 324 },
  { month: 'Jun', avgNetWorth: 182000, users: 356 },
];

const assetBreakdown = [
  { name: 'Real Estate', value: 45, icon: Building2, color: 'hsl(var(--chart-1))' },
  { name: 'Retirement', value: 25, icon: Landmark, color: 'hsl(var(--chart-2))' },
  { name: 'Investments', value: 15, icon: TrendingUp, color: 'hsl(var(--chart-3))' },
  { name: 'Cash & Savings', value: 10, icon: CreditCard, color: 'hsl(var(--chart-4))' },
  { name: 'Vehicles', value: 5, icon: Car, color: 'hsl(var(--chart-5))' },
];

const userNetWorths = [
  {
    id: '1',
    user: 'William Martinez',
    email: 'w.martinez@example.com',
    assets: 450000,
    liabilities: 180000,
    netWorth: 270000,
    change: 12.5,
    lastUpdated: new Date('2024-03-15'),
  },
  {
    id: '2',
    user: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    assets: 320000,
    liabilities: 95000,
    netWorth: 225000,
    change: 8.2,
    lastUpdated: new Date('2024-03-14'),
  },
  {
    id: '3',
    user: 'James Brown',
    email: 'j.brown@example.com',
    assets: 280000,
    liabilities: 120000,
    netWorth: 160000,
    change: -2.3,
    lastUpdated: new Date('2024-03-13'),
  },
  {
    id: '4',
    user: 'Emma Wilson',
    email: 'emma.w@example.com',
    assets: 185000,
    liabilities: 45000,
    netWorth: 140000,
    change: 15.8,
    lastUpdated: new Date('2024-03-12'),
  },
  {
    id: '5',
    user: 'Michael Chen',
    email: 'm.chen@example.com',
    assets: 210000,
    liabilities: 85000,
    netWorth: 125000,
    change: 5.4,
    lastUpdated: new Date('2024-03-11'),
  },
];

export default function NetWorthPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Net Worth Tracking</h1>
          <p className="text-muted-foreground">
            Monitor user assets, liabilities, and net worth growth.
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
              Users Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">356</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">12% of all users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Net Worth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <p className="text-2xl font-bold">$182K</p>
            </div>
            <p className="text-xs text-emerald-500 mt-1">+8.3% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Assets Tracked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$64.8M</p>
            <p className="text-xs text-muted-foreground mt-1">Across all users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Liabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$21.2M</p>
            <p className="text-xs text-muted-foreground mt-1">Debt ratio: 33%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Average Net Worth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `$${value / 1000}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [formatCurrency(value), 'Avg Net Worth']}
                  />
                  <Area
                    type="monotone"
                    dataKey="avgNetWorth"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorNetWorth)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Asset Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assetBreakdown.map((asset) => {
                const Icon = asset.icon;
                return (
                  <div key={asset.name} className="flex items-center gap-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${asset.color}20` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: asset.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{asset.name}</span>
                        <span className="text-sm text-muted-foreground">{asset.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${asset.value}%`,
                            backgroundColor: asset.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Net Worth Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>User Net Worth Snapshots</CardTitle>
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
                <TableHead>Assets</TableHead>
                <TableHead>Liabilities</TableHead>
                <TableHead>Net Worth</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userNetWorths.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.user}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-emerald-500">
                    {formatCurrency(user.assets)}
                  </TableCell>
                  <TableCell className="text-red-500">
                    {formatCurrency(user.liabilities)}
                  </TableCell>
                  <TableCell className="font-bold">
                    {formatCurrency(user.netWorth)}
                  </TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        'flex items-center gap-1',
                        user.change > 0 ? 'text-emerald-500' : 'text-red-500'
                      )}
                    >
                      {user.change > 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {user.change > 0 ? '+' : ''}
                      {user.change}%
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(user.lastUpdated)}
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
