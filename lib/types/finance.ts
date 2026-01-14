export interface Budget {
  id: string;
  userId: string;
  datePicker: Date;
  sources: BudgetItem[];
  giving: BudgetItem[];
  savings: BudgetItem[];
  spending: number;
  debt: number;
  emergencyFund: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetItem {
  name: string;
  amount: number;
}

export interface Goal {
  id: string;
  userId: string;
  goalName: string;
  goalDescription: string;
  amountSaved: number;
  amountNeeded: number;
  datePicker: Date;
  todaysDate: Date;
  createdAt: Date;
  updatedAt: Date;
  completionPercentage: number;
}

export interface NetWorth {
  id: string;
  userId: string;
  assets: {
    personalRealEstate: number;
    investmentRealEstate: number;
    checkingAccounts: number;
    savingsAccounts: number;
    cdAccounts: number;
    retirementAccounts: number;
    investmentAccounts: number;
    cars: number;
    otherAssets: number;
  };
  liabilities: {
    mortgage: number;
    carLoans: number;
    studentLoans: number;
    creditCards: number;
    otherDebts: number;
  };
  totalAssets: number;
  totalLiabilities: number;
  netWorthValue: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Credit {
  id: string;
  userId: string;
  creditScore: number;
  creditUtilization: number;
  accountsOpen: number;
  onTimePayments: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinanceStats {
  totalBudgets: number;
  totalGoals: number;
  totalNetWorthEntries: number;
  averageGoalCompletion: number;
  averageNetWorth: number;
  totalSavingsTracked: number;
}
