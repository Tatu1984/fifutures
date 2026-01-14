'use client';

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Budget Tracking', value: 35, color: 'hsl(var(--chart-1))' },
  { name: 'Goal Setting', value: 25, color: 'hsl(var(--chart-2))' },
  { name: 'Learning Modules', value: 20, color: 'hsl(var(--chart-3))' },
  { name: 'Sleep On It', value: 12, color: 'hsl(var(--chart-4))' },
  { name: 'Net Worth', value: 8, color: 'hsl(var(--chart-5))' },
];

export function EngagementChart() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Feature Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--popover-foreground))',
                }}
                formatter={(value: number) => [`${value}%`, 'Usage']}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
