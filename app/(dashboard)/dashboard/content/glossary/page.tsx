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
  Search,
  Plus,
  Edit,
  Trash2,
  BookMarked,
  ArrowUpDown,
} from 'lucide-react';
import { formatDate, truncate } from '@/lib/utils';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  createdAt: Date;
}

const mockTerms: GlossaryTerm[] = [
  {
    id: '1',
    term: 'APR',
    definition:
      'Annual Percentage Rate - The yearly interest rate charged for borrowing or earned through an investment.',
    category: 'Credit',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    term: 'Asset Allocation',
    definition:
      'The process of dividing investments among different asset categories like stocks, bonds, and cash.',
    category: 'Investing',
    createdAt: new Date('2024-01-12'),
  },
  {
    id: '3',
    term: 'Compound Interest',
    definition:
      'Interest calculated on the initial principal and also on the accumulated interest of previous periods.',
    category: 'General',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '4',
    term: 'Diversification',
    definition:
      'A risk management strategy that mixes a variety of investments within a portfolio.',
    category: 'Investing',
    createdAt: new Date('2024-01-18'),
  },
  {
    id: '5',
    term: 'FICO Score',
    definition:
      'A credit score created by the Fair Isaac Corporation, used by lenders to assess credit risk.',
    category: 'Credit',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '6',
    term: 'IRA',
    definition:
      'Individual Retirement Account - A tax-advantaged account for retirement savings.',
    category: 'Retirement',
    createdAt: new Date('2024-01-22'),
  },
  {
    id: '7',
    term: 'Liquidity',
    definition:
      'How quickly an asset can be converted to cash without significantly affecting its price.',
    category: 'Investing',
    createdAt: new Date('2024-01-25'),
  },
  {
    id: '8',
    term: 'Net Worth',
    definition:
      'The total value of assets minus total liabilities. A measure of financial health.',
    category: 'General',
    createdAt: new Date('2024-01-28'),
  },
  {
    id: '9',
    term: '401(k)',
    definition:
      'An employer-sponsored retirement savings plan that allows employees to save and invest pre-tax dollars.',
    category: 'Retirement',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '10',
    term: 'Budget',
    definition:
      'A financial plan that estimates income and expenses over a specified period.',
    category: 'Budgeting',
    createdAt: new Date('2024-02-05'),
  },
];

const categories = ['All', 'General', 'Credit', 'Investing', 'Retirement', 'Budgeting', 'Taxes'];

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredTerms = mockTerms
    .filter((term) => {
      const matchesSearch =
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.term.localeCompare(b.term);
      }
      return b.term.localeCompare(a.term);
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Glossary</h1>
          <p className="text-muted-foreground">
            Manage financial terms and definitions.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Term
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <BookMarked className="h-5 w-5 text-primary" />
              <p className="text-2xl font-bold">{mockTerms.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{categories.length - 1}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Last Updated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Terms Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  className="h-8 p-0 font-medium"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  Term
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Definition</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTerms.map((term) => (
              <TableRow key={term.id}>
                <TableCell className="font-medium">{term.term}</TableCell>
                <TableCell className="max-w-md">
                  <p className="text-muted-foreground">
                    {truncate(term.definition, 100)}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{term.category}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(term.createdAt)}
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

      {/* Alphabetical Navigation */}
      <div className="flex flex-wrap gap-1 justify-center">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
          <Button
            key={letter}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            {letter}
          </Button>
        ))}
      </div>
    </div>
  );
}
