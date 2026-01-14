'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Download,
  Trash2,
  Database,
  HardDrive,
  Image,
  FileText,
  Video,
  FolderOpen,
  RefreshCw,
} from 'lucide-react';
import { formatDate, cn } from '@/lib/utils';

const storageStats = {
  total: 10, // GB
  used: 4.2,
  available: 5.8,
};

const folderBreakdown = [
  { name: 'Profile Pictures', size: 1.8, files: 2847, icon: Image, color: 'text-blue-500' },
  { name: 'Documents', size: 0.9, files: 456, icon: FileText, color: 'text-amber-500' },
  { name: 'Videos', size: 0.8, files: 23, icon: Video, color: 'text-purple-500' },
  { name: 'Learning Assets', size: 0.5, files: 189, icon: FolderOpen, color: 'text-emerald-500' },
  { name: 'Other', size: 0.2, files: 78, icon: Database, color: 'text-gray-500' },
];

const recentFiles = [
  {
    id: '1',
    name: 'profile_sarah_johnson.jpg',
    type: 'image/jpeg',
    size: '245 KB',
    uploadedBy: 'sarah.j@example.com',
    uploadedAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '2',
    name: 'investing_basics.mp4',
    type: 'video/mp4',
    size: '48.2 MB',
    uploadedBy: 'admin@fifutures.com',
    uploadedAt: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: '3',
    name: 'tax_guide_2024.pdf',
    type: 'application/pdf',
    size: '1.2 MB',
    uploadedBy: 'admin@fifutures.com',
    uploadedAt: new Date(Date.now() - 1000 * 60 * 180),
  },
  {
    id: '4',
    name: 'profile_michael_chen.jpg',
    type: 'image/jpeg',
    size: '312 KB',
    uploadedBy: 'm.chen@example.com',
    uploadedAt: new Date(Date.now() - 1000 * 60 * 240),
  },
  {
    id: '5',
    name: 'budget_template.xlsx',
    type: 'application/xlsx',
    size: '56 KB',
    uploadedBy: 'admin@fifutures.com',
    uploadedAt: new Date(Date.now() - 1000 * 60 * 300),
  },
];

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return Image;
  if (type.startsWith('video/')) return Video;
  return FileText;
};

export default function StoragePage() {
  const usedPercentage = (storageStats.used / storageStats.total) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Storage Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage Firebase Storage usage.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync
          </Button>
          <Button variant="outline">
            <Trash2 className="mr-2 h-4 w-4" />
            Clean Up
          </Button>
        </div>
      </div>

      {/* Storage Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {storageStats.used} GB used of {storageStats.total} GB
                </span>
                <span className="font-medium">{usedPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={usedPercentage} className="h-3" />
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <HardDrive className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">{storageStats.total} GB</p>
                <p className="text-xs text-muted-foreground">Total Storage</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <Database className="h-8 w-8 mx-auto text-amber-500 mb-2" />
                <p className="text-2xl font-bold">{storageStats.used} GB</p>
                <p className="text-xs text-muted-foreground">Used</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <FolderOpen className="h-8 w-8 mx-auto text-emerald-500 mb-2" />
                <p className="text-2xl font-bold">{storageStats.available} GB</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Files</span>
              <span className="font-bold">3,593</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Images</span>
              <span className="font-bold">2,847</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Documents</span>
              <span className="font-bold">456</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Videos</span>
              <span className="font-bold">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Other</span>
              <span className="font-bold">267</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Folder Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Storage by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {folderBreakdown.map((folder) => {
              const Icon = folder.icon;
              const percentage = (folder.size / storageStats.used) * 100;
              return (
                <div key={folder.name} className="flex items-center gap-4">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg bg-muted', folder.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{folder.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {folder.size} GB ({folder.files} files)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Files */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Uploads</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search files..." className="pl-10 w-[250px]" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentFiles.map((file) => {
                const Icon = getFileIcon(file.type);
                return (
                  <TableRow key={file.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{file.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{file.type.split('/')[1]}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{file.size}</TableCell>
                    <TableCell className="text-muted-foreground">{file.uploadedBy}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(file.uploadedAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
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
