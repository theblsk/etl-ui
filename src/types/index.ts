export interface Company {
  id: number;
  platformCompanyId: number;
  name: string;
}

export interface Account {
  id: number;
  platformAccountId: string;
  name: string;
  category: string;
}

export interface LineItem {
  id: number;
  reportId: number;
  accountId: number;
  value: string;
  account: Account;
}

export interface Report {
  id: number;
  platformReportId: string;
  companyId: number;
  periodStart: string;
  periodEnd: string;
  grossProfit: string;
  netProfit: string;
  lineItems?: LineItem[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface ApiError {
  success: boolean;
  error: string;
} 