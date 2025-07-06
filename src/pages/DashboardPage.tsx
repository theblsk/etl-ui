import React from 'react';
import { Box, Typography } from '@mui/material';
import { Dashboard } from '../components/Dashboard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useReports } from '../hooks/useReports';

export const DashboardPage: React.FC = () => {
  const { data: reports, isLoading, error } = useReports();

  if (isLoading) {
    return <LoadingSpinner message="Loading financial reports..." />;
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Failed to load reports
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please make sure the backend server is running on port 3000.
        </Typography>
      </Box>
    );
  }

  // Filter out reports with zero gross and net profit
  const filteredReports = reports?.filter(
    report => parseFloat(report.grossProfit) !== 0 || parseFloat(report.netProfit) !== 0
  ) || [];

  if (filteredReports.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" gutterBottom>
          No Financial Data Available
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No reports with financial data found. Please check your data source.
        </Typography>
      </Box>
    );
  }

  return <Dashboard reports={filteredReports} />;
}; 