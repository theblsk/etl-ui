import React, { useMemo } from 'react';
import { Box, Typography, Card, CardContent, Chip, Alert, AlertTitle, Divider } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PercentIcon from '@mui/icons-material/Percent';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MetricsCard } from './MetricsCard';
import { ProfitTrendChart } from './ProfitTrendChart';
import { InsightsPanel } from './InsightsPanel';
import type { Report } from '../types';
import { 
  calculateDashboardMetrics, 
  prepareTrendData, 
  getFinancialInsights 
} from '../utils/dashboardMetrics';
import { formatCurrency } from '../utils/formatters';

interface DashboardProps {
  reports: Report[];
}

export const Dashboard: React.FC<DashboardProps> = ({ reports }) => {
  const metrics = useMemo(() => calculateDashboardMetrics(reports), [reports]);
  const trendData = useMemo(() => prepareTrendData(reports), [reports]);
  const insights = useMemo(() => getFinancialInsights(metrics), [metrics]);

  // Enhanced analytics
  const bestPerformingMonth = useMemo(() => {
    return reports.reduce((best, current) => {
      return parseFloat(current.netProfit) > parseFloat(best.netProfit) ? current : best;
    }, reports[0]);
  }, [reports]);

  const worstPerformingMonth = useMemo(() => {
    return reports.reduce((worst, current) => {
      return parseFloat(current.netProfit) < parseFloat(worst.netProfit) ? current : worst;
    }, reports[0]);
  }, [reports]);

  const profitabilityTrend = useMemo(() => {
    const sorted = [...reports].sort((a, b) => a.periodStart.localeCompare(b.periodStart));
    const recentHalf = sorted.slice(-Math.ceil(sorted.length / 2));
    const earlierHalf = sorted.slice(0, Math.floor(sorted.length / 2));
    
    const recentAvg = recentHalf.reduce((sum, r) => sum + parseFloat(r.netProfit), 0) / recentHalf.length;
    const earlierAvg = earlierHalf.reduce((sum, r) => sum + parseFloat(r.netProfit), 0) / earlierHalf.length;
    
    return recentAvg > earlierAvg ? 'improving' : recentAvg < earlierAvg ? 'declining' : 'stable';
  }, [reports]);

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

      {/* Alert for trend analysis */}
      {reports.length > 0 && (
        <Alert 
          severity={profitabilityTrend === 'improving' ? 'success' : profitabilityTrend === 'declining' ? 'warning' : 'info'}
          sx={{ mb: 3 }}
          icon={profitabilityTrend === 'improving' ? <CheckCircleIcon /> : profitabilityTrend === 'declining' ? <WarningIcon /> : <TrendingUpIcon />}
        >
          <AlertTitle>
            {profitabilityTrend === 'improving' ? 'Positive Trend' : profitabilityTrend === 'declining' ? 'Attention Required' : 'Stable Performance'}
          </AlertTitle>
          Your profitability trend is {profitabilityTrend}. 
          {profitabilityTrend === 'improving' && ' Keep up the excellent work!'}
          {profitabilityTrend === 'declining' && ' Consider reviewing your cost structure and revenue strategies.'}
          {profitabilityTrend === 'stable' && ' Your business maintains consistent performance.'}
        </Alert>
      )}

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

      {/* Performance Highlights */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: 3,
        mb: 4 
      }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUpIcon sx={{ color: 'success.main', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Best Performing Month
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'success.main', mb: 1 }}>
              {formatCurrency(bestPerformingMonth?.netProfit || 0)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {bestPerformingMonth?.periodStart} - {bestPerformingMonth?.periodEnd}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                label="Peak Performance" 
                color="success" 
                size="small" 
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingDownIcon sx={{ color: 'error.main', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Challenging Month
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'error.main', mb: 1 }}>
              {formatCurrency(worstPerformingMonth?.netProfit || 0)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {worstPerformingMonth?.periodStart} - {worstPerformingMonth?.periodEnd}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                label="Learning Opportunity" 
                color="warning" 
                size="small" 
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Charts and Insights */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ProfitTrendChart data={trendData} />
        <InsightsPanel metrics={metrics} insights={insights} />
      </Box>
    </Box>
  );
}; 