export interface AnalyticsOverview {
  totalUsers: number;
  activeUsers: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  userGrowth: {
    current: number;
    previous: number;
    percentageChange: number;
  };
  engagement: {
    averageSessionDuration: number;
    averageStreakLength: number;
    retentionRate: number;
  };
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface UserGrowthData {
  date: string;
  newUsers: number;
  totalUsers: number;
}

export interface EngagementData {
  date: string;
  activeUsers: number;
  sessions: number;
  avgDuration: number;
}

export interface FeatureUsageData {
  feature: string;
  usageCount: number;
  uniqueUsers: number;
  percentageOfUsers: number;
}

export interface LearningProgressData {
  module: string;
  started: number;
  completed: number;
  completionRate: number;
}

export interface RetentionCohort {
  cohort: string;
  week0: number;
  week1: number;
  week2: number;
  week3: number;
  week4: number;
}

export interface DashboardStats {
  users: {
    total: number;
    new: number;
    active: number;
    trend: number;
  };
  engagement: {
    averageStreak: number;
    streakTrend: number;
    dailyActive: number;
    activeTrend: number;
  };
  content: {
    totalLessons: number;
    completionRate: number;
    popularModule: string;
  };
  finance: {
    budgetsCreated: number;
    goalsSet: number;
    averageGoalProgress: number;
  };
}
