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

// ETL-related types
export interface ETLLineItem {
  name: string;
  value: number;
  account_id: string;
}

export interface ETLRevenueSection {
  name: string;
  value: number;
  line_items: ETLLineItem[];
}

export interface ETLReportData {
  rootfi_company_id: number;
  platform_id: string;
  period_start: string;
  period_end: string;
  gross_profit: number;
  net_profit: number;
  revenue: ETLRevenueSection[];
  cost_of_goods_sold?: ETLRevenueSection[];
  operating_expenses?: ETLRevenueSection[];
  non_operating_expenses?: ETLRevenueSection[];
  other_income?: ETLRevenueSection[];
}

export interface ETLPayload {
  data: ETLReportData[];
}

export interface ETLResponse {
  success: boolean;
  message: string;
  processed_reports?: number;
  errors?: string[];
}

export interface ETLProgress {
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  message: string;
  error?: string;
} 