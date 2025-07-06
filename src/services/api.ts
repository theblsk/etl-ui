import axios from 'axios';
import type { Company, Report, ApiResponse, ETLPayload, ETLResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic fetch function
const fetchData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await apiClient.get<ApiResponse<T>>(endpoint);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

// Company API functions
export const fetchCompanies = () => fetchData<Company[]>('/companies');
export const fetchCompanyById = (id: number) => fetchData<Company>(`/companies/${id}`);

// Report API functions
export const fetchReports = () => fetchData<Report[]>('/reports');
export const fetchReportById = (id: number) => fetchData<Report>(`/reports/${id}`);
export const fetchReportWithLineItems = (id: number) => fetchData<Report>(`/reports/${id}/line-items`);
export const fetchReportsByCompany = (companyId: number) => fetchData<Report[]>(`/reports/company/${companyId}`);

// ETL API functions
export const uploadETLData = async (payload: ETLPayload): Promise<ETLResponse> => {
  try {
    const response = await apiClient.post<ETLResponse>('/etl', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 300000, // 5 minutes timeout for large uploads
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading ETL data:', error);
    throw error;
  }
};

// Sample ETL data generation for demo purposes
export const generateSampleETLData = (): ETLPayload => {
  return {
    data: [
      {
        rootfi_company_id: 1001,
        platform_id: "2023-01-01_2023-01-31",
        period_start: "2023-01-01",
        period_end: "2023-01-31",
        gross_profit: 15000,
        net_profit: 8500,
        revenue: [
          {
            name: "Operating Revenue",
            value: 25000,
            line_items: [
              { name: "Product Sales", value: 20000, account_id: "SALES-001" },
              { name: "Service Revenue", value: 5000, account_id: "SERVICE-001" }
            ]
          }
        ],
        cost_of_goods_sold: [
          {
            name: "Cost of Goods Sold",
            value: 10000,
            line_items: [
              { name: "Materials", value: 6000, account_id: "COGS-001" },
              { name: "Labor", value: 4000, account_id: "COGS-002" }
            ]
          }
        ],
        operating_expenses: [
          {
            name: "Operating Expenses",
            value: 6500,
            line_items: [
              { name: "Rent", value: 2000, account_id: "EXPENSE-001" },
              { name: "Marketing", value: 1500, account_id: "EXPENSE-002" },
              { name: "Utilities", value: 800, account_id: "EXPENSE-003" },
              { name: "Insurance", value: 1200, account_id: "EXPENSE-004" },
              { name: "Office Supplies", value: 1000, account_id: "EXPENSE-005" }
            ]
          }
        ]
      },
      {
        rootfi_company_id: 1001,
        platform_id: "2023-02-01_2023-02-28",
        period_start: "2023-02-01",
        period_end: "2023-02-28",
        gross_profit: 18000,
        net_profit: 12200,
        revenue: [
          {
            name: "Operating Revenue",
            value: 30000,
            line_items: [
              { name: "Product Sales", value: 24000, account_id: "SALES-001" },
              { name: "Service Revenue", value: 6000, account_id: "SERVICE-001" }
            ]
          }
        ],
        cost_of_goods_sold: [
          {
            name: "Cost of Goods Sold",
            value: 12000,
            line_items: [
              { name: "Materials", value: 7200, account_id: "COGS-001" },
              { name: "Labor", value: 4800, account_id: "COGS-002" }
            ]
          }
        ],
        operating_expenses: [
          {
            name: "Operating Expenses",
            value: 5800,
            line_items: [
              { name: "Rent", value: 2000, account_id: "EXPENSE-001" },
              { name: "Marketing", value: 1200, account_id: "EXPENSE-002" },
              { name: "Utilities", value: 600, account_id: "EXPENSE-003" },
              { name: "Insurance", value: 1200, account_id: "EXPENSE-004" },
              { name: "Office Supplies", value: 800, account_id: "EXPENSE-005" }
            ]
          }
        ]
      },
      {
        rootfi_company_id: 1001,
        platform_id: "2023-03-01_2023-03-31",
        period_start: "2023-03-01",
        period_end: "2023-03-31",
        gross_profit: 22000,
        net_profit: 15800,
        revenue: [
          {
            name: "Operating Revenue",
            value: 35000,
            line_items: [
              { name: "Product Sales", value: 28000, account_id: "SALES-001" },
              { name: "Service Revenue", value: 7000, account_id: "SERVICE-001" }
            ]
          }
        ],
        cost_of_goods_sold: [
          {
            name: "Cost of Goods Sold",
            value: 13000,
            line_items: [
              { name: "Materials", value: 7800, account_id: "COGS-001" },
              { name: "Labor", value: 5200, account_id: "COGS-002" }
            ]
          }
        ],
        operating_expenses: [
          {
            name: "Operating Expenses",
            value: 6200,
            line_items: [
              { name: "Rent", value: 2000, account_id: "EXPENSE-001" },
              { name: "Marketing", value: 1800, account_id: "EXPENSE-002" },
              { name: "Utilities", value: 700, account_id: "EXPENSE-003" },
              { name: "Insurance", value: 1200, account_id: "EXPENSE-004" },
              { name: "Office Supplies", value: 500, account_id: "EXPENSE-005" }
            ]
          }
        ]
      }
    ]
  };
}; 