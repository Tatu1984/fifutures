export interface User {
  id: string;
  uid: string;
  email: string;
  displayName: string | null;
  fullname: string | null;
  photoUrl: string | null;
  phoneNumber: string | null;
  createdTime: Date;
  lastLogin: Date | null;
  lastVisit: Date | null;
  streak: number;
  streakEligible: boolean;
  startStreak: Date | null;
  daysSinceLastVisit: number;
  daysSinceLastLogin: number;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  averageStreak: number;
  usersWithStreaks: number;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: Date;
}

export interface UserFilter {
  search?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  hasStreak?: boolean;
  isActive?: boolean;
  sortBy?: 'createdTime' | 'lastLogin' | 'streak' | 'displayName';
  sortOrder?: 'asc' | 'desc';
}
