export interface LearningModule {
  id: string;
  name: string;
  description: string;
  category: LearningCategory;
  order: number;
  isActive: boolean;
  lessonsCount: number;
  completionRate: number;
}

export type LearningCategory =
  | 'credit'
  | 'investing'
  | 'retirement'
  | 'tax'
  | 'estate'
  | 'risk_management'
  | 'behavioral_biases'
  | 'consumerism'
  | 'economic_indicators';

export interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  favoritesCount: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  relatedTerms: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Scenario {
  id: string;
  ageGroup: '14-18' | '19-25' | '26-35' | '36-50' | '50+';
  title: string;
  content: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentStats {
  totalModules: number;
  totalTips: number;
  totalGlossaryTerms: number;
  totalScenarios: number;
  activeTips: number;
  averageCompletionRate: number;
}
