'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Star,
  Heart,
  Filter,
} from 'lucide-react';
import { formatDate, truncate } from '@/lib/utils';

interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  isActive: boolean;
  favoritesCount: number;
  createdAt: Date;
}

const categories = [
  'Budgeting',
  'Saving',
  'Investing',
  'Credit',
  'Retirement',
  'Taxes',
  'Insurance',
  'General',
];

const mockTips: Tip[] = [
  {
    id: '1',
    title: 'The 50/30/20 Rule',
    content:
      'Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.',
    category: 'Budgeting',
    isActive: true,
    favoritesCount: 234,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Pay Yourself First',
    content:
      'Before paying bills or spending money, automatically transfer a portion of your income to savings.',
    category: 'Saving',
    isActive: true,
    favoritesCount: 189,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    title: 'Emergency Fund Target',
    content:
      'Aim to save 3-6 months of living expenses in an easily accessible account for emergencies.',
    category: 'Saving',
    isActive: true,
    favoritesCount: 312,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    title: 'Rule of 72',
    content:
      'Divide 72 by your expected annual return to estimate how many years it takes to double your money.',
    category: 'Investing',
    isActive: true,
    favoritesCount: 156,
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '5',
    title: 'Credit Utilization',
    content:
      'Keep your credit utilization below 30% of your available credit to maintain a good credit score.',
    category: 'Credit',
    isActive: true,
    favoritesCount: 267,
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '6',
    title: 'Compound Interest Power',
    content:
      'Start investing early to take advantage of compound interest - time is your biggest asset.',
    category: 'Investing',
    isActive: true,
    favoritesCount: 198,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '7',
    title: '401(k) Match',
    content:
      'Always contribute enough to your 401(k) to get the full employer match - it\&apos;s free money!',
    category: 'Retirement',
    isActive: true,
    favoritesCount: 345,
    createdAt: new Date('2024-03-01'),
  },
  {
    id: '8',
    title: 'The Latte Factor',
    content:
      'Small daily expenses add up. $5/day = $1,825/year. Track your spending to find hidden costs.',
    category: 'General',
    isActive: false,
    favoritesCount: 89,
    createdAt: new Date('2024-03-05'),
  },
];

export default function TipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredTips = mockTips.filter((tip) => {
    const matchesSearch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Educational Tips</h1>
          <p className="text-muted-foreground">
            Manage financial tips and rules of thumb.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tip
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Tip</DialogTitle>
              <DialogDescription>
                Create a new educational tip for users.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter tip title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <textarea
                  id="content"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter tip content"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Save Tip</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mockTips.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {mockTips.filter((t) => t.isActive).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Favorites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {mockTips.reduce((acc, t) => acc + t.favoritesCount, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{categories.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Tips Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Favorites</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTips.map((tip) => (
              <TableRow key={tip.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{tip.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {truncate(tip.content, 60)}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{tip.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={tip.isActive ? 'success' : 'secondary'}>
                    {tip.isActive ? 'Active' : 'Draft'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    {tip.favoritesCount}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(tip.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
