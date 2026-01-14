'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Wallet,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  Target,
  Lightbulb,
  BookMarked,
  LineChart,
  Flame,
  Clock,
  NotebookPen,
  CreditCard,
  Database,
  FileText,
  Activity,
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { title: 'Analytics', href: '/dashboard/analytics', icon: LineChart },
    ],
  },
  {
    title: 'Users',
    items: [
      { title: 'All Users', href: '/dashboard/users', icon: Users },
      { title: 'User Analytics', href: '/dashboard/analytics/users', icon: Activity },
    ],
  },
  {
    title: 'Content',
    items: [
      { title: 'Learning Modules', href: '/dashboard/content/learning', icon: BookOpen },
      { title: 'Tips', href: '/dashboard/content/tips', icon: Lightbulb },
      { title: 'Glossary', href: '/dashboard/content/glossary', icon: BookMarked },
      { title: 'Scenarios', href: '/dashboard/content/scenarios', icon: Target },
    ],
  },
  {
    title: 'Finance',
    items: [
      { title: 'Budgets', href: '/dashboard/finance/budgets', icon: Wallet },
      { title: 'Goals', href: '/dashboard/finance/goals', icon: TrendingUp },
      { title: 'Net Worth', href: '/dashboard/finance/networth', icon: CreditCard },
    ],
  },
  {
    title: 'Engagement',
    items: [
      { title: 'Streaks', href: '/dashboard/engagement/streaks', icon: Flame },
      { title: 'Sleep On It', href: '/dashboard/engagement/sleep-on-it', icon: Clock },
      { title: 'Journals', href: '/dashboard/engagement/journals', icon: NotebookPen },
    ],
  },
  {
    title: 'System',
    items: [
      { title: 'Settings', href: '/dashboard/system/settings', icon: Settings },
      { title: 'Activity Logs', href: '/dashboard/system/logs', icon: FileText },
      { title: 'Storage', href: '/dashboard/system/storage', icon: Database },
    ],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-sidebar transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-sidebar-foreground">
                Fifutures
              </span>
            </Link>
          )}
          {collapsed && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary mx-auto">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-6">
            {navigation.map((section) => (
              <div key={section.title}>
                {!collapsed && (
                  <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                    {section.title}
                  </h4>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== '/dashboard' &&
                        pathname.startsWith(item.href));
                    const Icon = item.icon;

                    if (collapsed) {
                      return (
                        <Tooltip key={item.href}>
                          <TooltipTrigger asChild>
                            <Link href={item.href}>
                              <Button
                                variant={isActive ? 'secondary' : 'ghost'}
                                size="icon"
                                className={cn(
                                  'w-full h-10',
                                  isActive &&
                                    'bg-sidebar-accent text-sidebar-accent-foreground'
                                )}
                              >
                                <Icon className="h-5 w-5" />
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="ml-2">
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant={isActive ? 'secondary' : 'ghost'}
                          className={cn(
                            'w-full justify-start gap-3',
                            isActive &&
                              'bg-sidebar-accent text-sidebar-accent-foreground'
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          {item.title}
                          {item.badge && (
                            <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                              {item.badge}
                            </span>
                          )}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* Collapse Toggle */}
        <div className="border-t p-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Collapse
              </>
            )}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
