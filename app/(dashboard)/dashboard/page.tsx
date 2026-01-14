'use client';

import { Users, TrendingUp, Flame, BookOpen } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { OverviewChart } from '@/components/dashboard/overview-chart';
import { RecentUsers } from '@/components/dashboard/recent-users';
import { EngagementChart } from '@/components/dashboard/engagement-chart';
import { ActivityFeed } from '@/components/dashboard/activity-feed';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value="2,847"
          change={12.5}
          icon={<Users className="h-6 w-6" />}
        />
        <StatsCard
          title="Active Users"
          value="1,423"
          change={8.2}
          changeLabel="from last week"
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <StatsCard
          title="Avg. Streak"
          value="7.3 days"
          change={15.3}
          icon={<Flame className="h-6 w-6" />}
        />
        <StatsCard
          title="Lessons Completed"
          value="12,847"
          change={23.1}
          icon={<BookOpen className="h-6 w-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-7">
        <OverviewChart />
        <EngagementChart />
      </div>

      {/* Activity & Recent Users */}
      <div className="grid gap-4 lg:grid-cols-7">
        <ActivityFeed />
        <RecentUsers />
      </div>
    </div>
  );
}
