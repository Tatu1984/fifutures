'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Eye,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  isActive: boolean;
}

interface Module {
  id: string;
  name: string;
  description: string;
  lessonsCount: number;
  completionRate: number;
  isActive: boolean;
  lessons: Lesson[];
}

const modules: Module[] = [
  {
    id: '1',
    name: 'Credit Basics',
    description: 'Understanding credit scores, reports, and how to build good credit',
    lessonsCount: 8,
    completionRate: 78,
    isActive: true,
    lessons: [
      { id: '1-1', title: 'What is Credit?', duration: '5 min', isActive: true },
      { id: '1-2', title: 'Understanding Credit Scores', duration: '8 min', isActive: true },
      { id: '1-3', title: 'How to Read Your Credit Report', duration: '10 min', isActive: true },
      { id: '1-4', title: 'Building Credit from Scratch', duration: '7 min', isActive: true },
    ],
  },
  {
    id: '2',
    name: 'Investing 101',
    description: 'Introduction to stocks, bonds, mutual funds, and investment strategies',
    lessonsCount: 12,
    completionRate: 65,
    isActive: true,
    lessons: [
      { id: '2-1', title: 'Why Invest?', duration: '6 min', isActive: true },
      { id: '2-2', title: 'Types of Investments', duration: '12 min', isActive: true },
      { id: '2-3', title: 'Risk vs Reward', duration: '8 min', isActive: true },
    ],
  },
  {
    id: '3',
    name: 'Retirement Planning',
    description: 'Planning for retirement, 401(k), IRA, and retirement accounts',
    lessonsCount: 10,
    completionRate: 45,
    isActive: true,
    lessons: [
      { id: '3-1', title: 'When Should You Start?', duration: '5 min', isActive: true },
      { id: '3-2', title: 'Understanding 401(k)', duration: '10 min', isActive: true },
    ],
  },
  {
    id: '4',
    name: 'Tax Basics',
    description: 'Understanding taxes, deductions, and tax-advantaged accounts',
    lessonsCount: 8,
    completionRate: 52,
    isActive: true,
    lessons: [],
  },
  {
    id: '5',
    name: 'Estate Planning',
    description: 'Wills, trusts, and protecting your assets for future generations',
    lessonsCount: 6,
    completionRate: 38,
    isActive: true,
    lessons: [],
  },
  {
    id: '6',
    name: 'Risk Management',
    description: 'Insurance, emergency funds, and protecting against financial risks',
    lessonsCount: 7,
    completionRate: 42,
    isActive: true,
    lessons: [],
  },
  {
    id: '7',
    name: 'Behavioral Biases',
    description: 'Understanding psychological biases that affect financial decisions',
    lessonsCount: 9,
    completionRate: 35,
    isActive: true,
    lessons: [],
  },
  {
    id: '8',
    name: 'Consumerism',
    description: 'Smart spending habits and avoiding consumerism traps',
    lessonsCount: 5,
    completionRate: 58,
    isActive: true,
    lessons: [],
  },
  {
    id: '9',
    name: 'Economic Indicators',
    description: 'Understanding inflation, interest rates, and economic cycles',
    lessonsCount: 8,
    completionRate: 28,
    isActive: false,
    lessons: [],
  },
];

export default function LearningModulesPage() {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const filteredModules = modules.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Modules</h1>
          <p className="text-muted-foreground">
            Manage educational content and learning paths.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Module
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Modules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{modules.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Lessons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {modules.reduce((acc, m) => acc + m.lessonsCount, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {Math.round(
                modules.reduce((acc, m) => acc + m.completionRate, 0) / modules.length
              )}
              %
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Modules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {modules.filter((m) => m.isActive).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search modules..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {filteredModules.map((module) => (
          <Collapsible
            key={module.id}
            open={expandedModules.includes(module.id)}
            onOpenChange={() => toggleModule(module.id)}
          >
            <Card>
              <CardContent className="p-0">
                <CollapsibleTrigger asChild>
                  <div className="flex cursor-pointer items-center gap-4 p-4 hover:bg-muted/50">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                    {expandedModules.includes(module.id) ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{module.name}</h3>
                        <Badge variant={module.isActive ? 'success' : 'secondary'}>
                          {module.isActive ? 'Active' : 'Draft'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {module.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{module.lessonsCount} lessons</p>
                      <div className="flex items-center gap-2">
                        <Progress value={module.completionRate} className="h-2 w-20" />
                        <span className="text-xs text-muted-foreground">
                          {module.completionRate}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="border-t bg-muted/30 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-medium">Lessons</h4>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-3 w-3" />
                        Add Lesson
                      </Button>
                    </div>
                    {module.lessons.length > 0 ? (
                      <div className="space-y-2">
                        {module.lessons.map((lesson, index) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-3 rounded-lg bg-background p-3"
                          >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              <p className="font-medium">{lesson.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {lesson.duration}
                              </p>
                            </div>
                            <Badge
                              variant={lesson.isActive ? 'success' : 'secondary'}
                              className="text-xs"
                            >
                              {lesson.isActive ? 'Active' : 'Draft'}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No lessons added yet. Click &quot;Add Lesson&quot; to get started.
                      </p>
                    )}
                  </div>
                </CollapsibleContent>
              </CardContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
