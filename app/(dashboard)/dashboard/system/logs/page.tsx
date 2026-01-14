'use client';

import { useState } from 'react';
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
  Search,
  Download,
  Filter,
  RefreshCw,
  Activity,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { formatDateTime, cn } from '@/lib/utils';

interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'success';
  action: string;
  user: string | null;
  details: string;
  ip: string;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    level: 'success',
    action: 'User Login',
    user: 'admin@fifutures.com',
    details: 'Admin user logged in successfully',
    ip: '192.168.1.1',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    level: 'info',
    action: 'User Created',
    user: null,
    details: 'New user sarah.j@example.com registered',
    ip: '10.0.0.45',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    level: 'warning',
    action: 'Failed Login',
    user: 'unknown@email.com',
    details: 'Failed login attempt - invalid password',
    ip: '203.45.67.89',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
    level: 'info',
    action: 'Content Updated',
    user: 'admin@fifutures.com',
    details: 'Updated tip: "The 50/30/20 Rule"',
    ip: '192.168.1.1',
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    level: 'error',
    action: 'API Error',
    user: null,
    details: 'Firebase connection timeout - retrying...',
    ip: 'server',
  },
  {
    id: '6',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    level: 'success',
    action: 'Backup Completed',
    user: 'system',
    details: 'Daily database backup completed successfully',
    ip: 'server',
  },
  {
    id: '7',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    level: 'info',
    action: 'User Deleted',
    user: 'admin@fifutures.com',
    details: 'Deleted user account: test@example.com',
    ip: '192.168.1.1',
  },
  {
    id: '8',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    level: 'warning',
    action: 'Rate Limit',
    user: null,
    details: 'Rate limit reached for IP 45.67.89.12',
    ip: '45.67.89.12',
  },
  {
    id: '9',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    level: 'success',
    action: 'Goal Achieved',
    user: 'm.chen@example.com',
    details: 'User achieved goal: Emergency Fund ($10,000)',
    ip: '10.0.0.78',
  },
  {
    id: '10',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    level: 'info',
    action: 'Module Viewed',
    user: 'emma.w@example.com',
    details: 'User completed module: Investing 101',
    ip: '10.0.0.92',
  },
];

const levelConfig = {
  info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  error: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
  success: { icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
};

export default function LogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.user && log.user.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const logCounts = {
    total: mockLogs.length,
    info: mockLogs.filter((l) => l.level === 'info').length,
    warning: mockLogs.filter((l) => l.level === 'warning').length,
    error: mockLogs.filter((l) => l.level === 'error').length,
    success: mockLogs.filter((l) => l.level === 'success').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
          <p className="text-muted-foreground">
            Monitor system activity and audit events.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={cn('mr-2 h-4 w-4', isRefreshing && 'animate-spin')} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">{logCounts.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              <p className="text-2xl font-bold">{logCounts.info}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <p className="text-2xl font-bold">{logCounts.success}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <p className="text-2xl font-bold">{logCounts.warning}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Errors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-2xl font-bold">{logCounts.error}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Logs Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead className="w-[100px]">Level</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="w-[120px]">IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const config = levelConfig[log.level];
                const Icon = config.icon;
                return (
                  <TableRow key={log.id}>
                    <TableCell className="text-muted-foreground font-mono text-xs">
                      {formatDateTime(log.timestamp)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(config.color, config.bg, 'gap-1')}
                      >
                        <Icon className="h-3 w-3" />
                        {log.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{log.action}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {log.user || '-'}
                    </TableCell>
                    <TableCell className="max-w-md text-sm text-muted-foreground">
                      {log.details}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {log.ip}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredLogs.length} of {mockLogs.length} logs
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
