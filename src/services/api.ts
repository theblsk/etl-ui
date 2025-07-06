import axios from 'axios';
import type { Company, Report, ApiResponse } from '../types';

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