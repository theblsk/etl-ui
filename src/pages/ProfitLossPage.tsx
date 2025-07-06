import React from 'react';
import { Box, Typography } from '@mui/material';
import { ProfitLossTable } from '../components/ProfitLossTable';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useReports } from '../hooks/useReports';

export const ProfitLossPage: React.FC = () => {
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
          Please make sure the backend server is running.
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

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Profit & Loss Report
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Click on any row to expand and view detailed line items for that period.
        </Typography>
      </Box>
      <ProfitLossTable reports={filteredReports} />
    </Box>
  );
}; 