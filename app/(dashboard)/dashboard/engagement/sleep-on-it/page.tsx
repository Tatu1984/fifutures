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
  LineChart,
  Line,
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
  Clock,
  DollarSign,
  ShoppingCart,
  TrendingDown,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

const savingsData = [
  { month: 'Jan', saved: 12500, items: 89 },
  { month: 'Feb', saved: 15800, items: 112 },
  { month: 'Mar', saved: 18900, items: 134 },
  { month: 'Apr', saved: 22400, items: 156 },
  { month: 'May', saved: 28600, items: 189 },
  { month: 'Jun', saved: 34200, items: 223 },
];

const outcomeData = [
  { name: 'Didn\'t Buy', value: 68, color: 'hsl(var(--chart-1))' },
  { name: 'Still Bought', value: 22, color: 'hsl(var(--chart-2))' },
  { name: 'Pending', value: 10, color: 'hsl(var(--muted))' },
];

const categoryBreakdown = [
  { category: 'Electronics', items: 234, avgPrice: 450, savedRate: 72 },
  { category: 'Clothing', items: 189, avgPrice: 120, savedRate: 65 },
  { category: 'Home & Garden', items: 156, avgPrice: 280, savedRate: 78 },
  { category: 'Entertainment', items: 98, avgPrice: 85, savedRate: 58 },
  { category: 'Other', items: 67, avgPrice: 150, savedRate: 70 },
];

const recentItems = [
  {
    id: '1',
    user: 'Sarah Johnson',
    item: 'iPhone 15 Pro',
    price: 1199,
    addedAt: new Date('2024-03-10'),
    waitPeriod: '7 days',
    outcome: 'skipped',
  },
  {
    id: '2',
    user: 'Michael Chen',
    item: 'Sony WH-1000XM5',
    price: 349,
    addedAt: new Date('2024-03-12'),
    waitPeriod: '3 days',
    outcome: 'purchased',
  },
  {
    id: '3',
    user: 'Emma Wilson',
    item: 'Designer Handbag',
    price: 890,
    addedAt: new Date('2024-03-13'),
    waitPeriod: '14 days',
    outcome: 'pending',
  },
  {
    id: '4',
    user: 'James Brown',
    item: 'Standing Desk',
    price: 599,
    addedAt: new Date('2024-03-08'),
    waitPeriod: '7 days',
    outcome: 'skipped',
  },
  {
    id: '5',
    user: 'Olivia Davis',
    item: 'Fitness Watch',
    price: 249,
    addedAt: new Date('2024-03-14'),
    waitPeriod: '3 days',
    outcome: 'pending',
  },
];

export default function SleepOnItPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sleep On It</h1>
          <p className="text-muted-foreground">
            Track impulse purchase deferrals and savings.
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
              Total Items Tracked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
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
              <DollarSign className="h-5 w-5 text-emerald-500" />
              <p className="text-2xl font-bold">$132K</p>
            </div>
            <p className="text-xs text-emerald-500 mt-1">Items not purchased</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-emerald-500" />
              <p className="text-2xl font-bold">68%</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Items not bought</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Wait Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">5.2 days</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Before decision</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Savings Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={savingsData}>
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
                    formatter={(value: number, name: string) => [
                      name === 'saved' ? formatCurrency(value) : value,
                      name === 'saved' ? 'Saved' : 'Items',
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="saved"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    name="saved"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Purchase Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={outcomeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {outcomeData.map((entry, index) => (
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
            <div className="mt-4 flex justify-center gap-6">
              {outcomeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Items Tracked</TableHead>
                <TableHead>Avg. Price</TableHead>
                <TableHead>Not Purchased Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryBreakdown.map((cat) => (
                <TableRow key={cat.category}>
                  <TableCell className="font-medium">{cat.category}</TableCell>
                  <TableCell>{cat.items}</TableCell>
                  <TableCell>{formatCurrency(cat.avgPrice)}</TableCell>
                  <TableCell>
                    <Badge variant={cat.savedRate >= 70 ? 'success' : 'secondary'}>
                      {cat.savedRate}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Items</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search items..." className="pl-10 w-[250px]" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Wait Period</TableHead>
                <TableHead>Added</TableHead>
                <TableHead>Outcome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.user}</TableCell>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>{formatCurrency(item.price)}</TableCell>
                  <TableCell>{item.waitPeriod}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(item.addedAt)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.outcome === 'skipped'
                          ? 'success'
                          : item.outcome === 'purchased'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {item.outcome === 'skipped' && (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      )}
                      {item.outcome === 'purchased' && (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {item.outcome === 'pending' && (
                        <Clock className="mr-1 h-3 w-3" />
                      )}
                      {item.outcome.charAt(0).toUpperCase() + item.outcome.slice(1)}
                    </Badge>
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
