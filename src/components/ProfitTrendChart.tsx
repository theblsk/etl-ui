import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import type { TrendData } from '../utils/dashboardMetrics';
import { formatCurrency } from '../utils/formatters';

interface ProfitTrendChartProps {
  data: TrendData[];
  title?: string;
}

interface TooltipPayload {
  color: string;
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

export const ProfitTrendChart: React.FC<ProfitTrendChartProps> = ({ 
  data, 
  title = "Profit Trend Analysis" 
}) => {
  const theme = useTheme();

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: 2,
            p: 2,
            boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            {label}
          </Typography>
          {payload.map((entry: TooltipPayload, index: number) => (
            <Box key={index} display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: entry.color,
                  borderRadius: '50%',
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {entry.name}: {formatCurrency(entry.value)}
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          {title}
        </Typography>
        <Box sx={{ 
          width: '100%', 
          height: { xs: 300, md: 400 }
        }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="period" 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="grossProfit" 
                stroke={theme.palette.primary.main}
                strokeWidth={3}
                dot={{ fill: theme.palette.primary.main, strokeWidth: 2, r: 4 }}
                name="Gross Profit"
                activeDot={{ r: 6, stroke: theme.palette.primary.main, strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="netProfit" 
                stroke={theme.palette.secondary.main}
                strokeWidth={3}
                dot={{ fill: theme.palette.secondary.main, strokeWidth: 2, r: 4 }}
                name="Net Profit"
                activeDot={{ r: 6, stroke: theme.palette.secondary.main, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}; 