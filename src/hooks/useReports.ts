import { useQuery } from '@tanstack/react-query';
import { fetchReports, fetchReportWithLineItems } from '../services/api';

export const useReports = () => {
  return useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
  });
};

export const useReportWithLineItems = (reportId: number | null) => {
  return useQuery({
    queryKey: ['report', reportId, 'lineItems'],
    queryFn: () => fetchReportWithLineItems(reportId!),
    enabled: !!reportId,
  });
}; 