import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { formatCurrency } from '../utils/formatters';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  isCurrency?: boolean;
  isPercentage?: boolean;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon,
  color = 'primary',
  isCurrency = false,
  isPercentage = false,
}) => {
  const formatValue = (val: string | number): string => {
    if (isCurrency) {
      return formatCurrency(val);
    }
    if (isPercentage) {
      return `${typeof val === 'number' ? val.toFixed(1) : val}%`;
    }
    return val.toString();
  };

  const getTrendColor = (trendValue?: number): 'success' | 'error' | 'default' => {
    if (trendValue === undefined) return 'default';
    return trendValue >= 0 ? 'success' : 'error';
  };

  const getTrendIcon = (trendValue?: number) => {
    if (trendValue === undefined) return null;
    return trendValue >= 0 ? 
      <TrendingUpIcon sx={{ fontSize: 16 }} /> : 
      <TrendingDownIcon sx={{ fontSize: 16 }} />;
  };

  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%',
        borderRadius: 3,
        border: '1px solid #e2e8f0',
        '&:hover': {
          boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out',
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          {icon && (
            <Box sx={{ color: `${color}.main`, opacity: 0.7 }}>
              {icon}
            </Box>
          )}
        </Box>
        
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            fontWeight: 700, 
            mb: 1,
            color: `${color}.main`,
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }}
        >
          {formatValue(value)}
        </Typography>
        
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {subtitle}
          </Typography>
        )}
        
        {trend !== undefined && (
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              icon={getTrendIcon(trend) || undefined}
              label={`${trend >= 0 ? '+' : ''}${trend.toFixed(1)}%`}
              size="small"
              color={getTrendColor(trend)}
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />
            {trendLabel && (
              <Typography variant="caption" color="text.secondary">
                {trendLabel}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}; 