import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PercentIcon from '@mui/icons-material/Percent';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { MetricsCard } from './MetricsCard';
import { ProfitTrendChart } from './ProfitTrendChart';
import { InsightsPanel } from './InsightsPanel';
import type { Report } from '../types';
import { 
  calculateDashboardMetrics, 
  prepareTrendData, 
  getFinancialInsights 
} from '../utils/dashboardMetrics';

interface DashboardProps {
  reports: Report[];
}

export const Dashboard: React.FC<DashboardProps> = ({ reports }) => {
  const metrics = useMemo(() => calculateDashboardMetrics(reports), [reports]);
  const trendData = useMemo(() => prepareTrendData(reports), [reports]);
  const insights = useMemo(() => getFinancialInsights(metrics), [metrics]);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          Financial Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive insights and analytics for your financial performance
        </Typography>
      </Box>

      {/* Key Metrics Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 4 
      }}>
        <MetricsCard
          title="Total Revenue"
          value={metrics.totalRevenue}
          subtitle={`Across ${metrics.totalMonths} months`}
          trend={metrics.revenueGrowth}
          trendLabel="vs previous quarter"
          icon={<AttachMoneyIcon />}
          color="primary"
          isCurrency
        />
        <MetricsCard
          title="Total Profit"
          value={metrics.totalProfit}
          subtitle={`${metrics.profitableMonths} profitable months`}
          trend={metrics.profitGrowth}
          trendLabel="vs previous quarter"
          icon={<TrendingUpIcon />}
          color="success"
          isCurrency
        />
        <MetricsCard
          title="Average Margin"
          value={metrics.averageMargin}
          subtitle="Net profit margin"
          icon={<PercentIcon />}
          color="info"
          isPercentage
        />
        <MetricsCard
          title="Profitability Rate"
          value={metrics.totalMonths > 0 ? ((metrics.profitableMonths / metrics.totalMonths) * 100) : 0}
          subtitle={`${metrics.profitableMonths}/${metrics.totalMonths} months`}
          icon={<AccountBalanceIcon />}
          color="secondary"
          isPercentage
        />
      </Box>

      {/* Charts and Insights */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ProfitTrendChart data={trendData} />
        <InsightsPanel metrics={metrics} insights={insights} />
      </Box>
    </Box>
  );
}; 