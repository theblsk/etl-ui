import React from 'react';
import { Card, CardContent, Typography, Box, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import type { DashboardMetrics } from '../utils/dashboardMetrics';
import { formatCurrency, formatPeriod } from '../utils/formatters';

interface InsightsPanelProps {
  metrics: DashboardMetrics;
  insights: string[];
}

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ metrics, insights }) => {
  const getInsightIcon = (insight: string) => {
    if (insight.includes('Strong') || insight.includes('Excellent')) {
      return <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />;
    }
    if (insight.includes('needs') || insight.includes('requires')) {
      return <ErrorIcon sx={{ color: 'error.main', fontSize: 20 }} />;
    }
    if (insight.includes('could be') || insight.includes('attention')) {
      return <WarningIcon sx={{ color: 'warning.main', fontSize: 20 }} />;
    }
    return <LightbulbIcon sx={{ color: 'info.main', fontSize: 20 }} />;
  };

  const getInsightColor = (insight: string): 'success' | 'error' | 'warning' | 'info' => {
    if (insight.includes('Strong') || insight.includes('Excellent')) return 'success';
    if (insight.includes('needs') || insight.includes('requires')) return 'error';
    if (insight.includes('could be') || insight.includes('attention')) return 'warning';
    return 'info';
  };

  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0' }}>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <LightbulbIcon sx={{ color: 'primary.main', fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            AI Financial Insights
          </Typography>
        </Box>

        {/* Key Performance Highlights */}
        <Box mb={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Performance Highlights
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            <Chip
              label={`${metrics.profitableMonths}/${metrics.totalMonths} Profitable Months`}
              color={metrics.profitableMonths / metrics.totalMonths > 0.7 ? 'success' : 'warning'}
              size="small"
              sx={{ fontWeight: 500 }}
            />
            <Chip
              label={`${metrics.averageMargin.toFixed(1)}% Avg Margin`}
              color={metrics.averageMargin > 15 ? 'success' : metrics.averageMargin > 5 ? 'warning' : 'error'}
              size="small"
              sx={{ fontWeight: 500 }}
            />
            {metrics.bestMonth && (
              <Chip
                label={`Best: ${formatPeriod(metrics.bestMonth.periodStart, metrics.bestMonth.periodEnd)}`}
                color="success"
                size="small"
                sx={{ fontWeight: 500 }}
              />
            )}
          </Box>
        </Box>

        {/* Best & Worst Performance */}
        {(metrics.bestMonth || metrics.worstMonth) && (
          <Box mb={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Performance Range
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {metrics.bestMonth && (
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Best Month ({formatPeriod(metrics.bestMonth.periodStart, metrics.bestMonth.periodEnd)})
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                    {formatCurrency(metrics.bestMonth.netProfit)}
                  </Typography>
                </Box>
              )}
              {metrics.worstMonth && (
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Worst Month ({formatPeriod(metrics.worstMonth.periodStart, metrics.worstMonth.periodEnd)})
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'error.main' }}>
                    {formatCurrency(metrics.worstMonth.netProfit)}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* AI Insights */}
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Strategic Recommendations
          </Typography>
          <List dense sx={{ p: 0 }}>
            {insights.map((insight, index) => (
              <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {getInsightIcon(insight)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 500,
                        color: `${getInsightColor(insight)}.main`
                      }}
                    >
                      {insight}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
}; 