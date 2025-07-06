import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Stack,
  Paper,
  Table,
  TableHead,
  TableBody,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import type { Report, LineItem } from '../types';
import { formatCurrency, formatPeriod } from '../utils/formatters';
import { useReportWithLineItems } from '../hooks/useReports';

interface ProfitLossTableRowProps {
  report: Report;
}

export const ProfitLossTableRow: React.FC<ProfitLossTableRowProps> = ({ report }) => {
  const [open, setOpen] = useState(false);
  const { data: reportWithLineItems, isLoading, error } = useReportWithLineItems(open ? report.id : null);

  // Group line items by category
  const groupedLineItems = reportWithLineItems?.lineItems?.reduce((acc, item) => {
    const category = item.account.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, LineItem[]>);

  const getCategoryTotal = (items: LineItem[]): number => {
    return items.reduce((sum, item) => sum + parseFloat(item.value), 0);
  };

  const getCategoryColor = (category: string): 'success' | 'error' | 'warning' | 'info' | 'default' => {
    switch (category) {
      case 'Operating Revenue':
        return 'success';
      case 'Cost of Goods Sold':
        return 'error';
      case 'Operating Expenses':
        return 'warning';
      case 'Non Operating Expenses':
        return 'info';
      default:
        return 'default';
    }
  };

  const netProfitValue = parseFloat(report.netProfit);
  const grossProfitValue = parseFloat(report.grossProfit);
  const isPositive = netProfitValue > 0;

  return (
    <>
      <TableRow 
        sx={{ 
          '& > *': { borderBottom: 'unset' },
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#f8fafc',
          }
        }}
        onClick={() => setOpen(!open)}
      >
        <TableCell sx={{ width: 50 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            sx={{ 
              color: 'primary.main',
              '&:hover': { backgroundColor: 'primary.light', color: 'white' }
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
          {formatPeriod(report.periodStart, report.periodEnd)}
        </TableCell>
        <TableCell align="right" sx={{ fontWeight: 500 }}>
          {formatCurrency(report.grossProfit)}
        </TableCell>
        <TableCell align="right" sx={{ fontWeight: 500 }}>
          <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
            {isPositive ? (
              <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16 }} />
            ) : (
              <TrendingDownIcon sx={{ color: 'error.main', fontSize: 16 }} />
            )}
            <span style={{ color: isPositive ? '#10b981' : '#ef4444' }}>
              {formatCurrency(report.netProfit)}
            </span>
          </Box>
        </TableCell>
        <TableCell align="right">
          <Chip
            label={
              grossProfitValue > 0 
                ? `${((netProfitValue / grossProfitValue) * 100).toFixed(1)}%`
                : 'N/A'
            }
            size="small"
            color={isPositive ? 'success' : 'error'}
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </TableCell>
        <TableCell align="right">
          <Chip
            label={open ? 'Collapse' : 'Expand'}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 500, cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              {isLoading && (
                <Box display="flex" justifyContent="center" alignItems="center" p={4}>
                  <CircularProgress size={24} sx={{ mr: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Loading line items...
                  </Typography>
                </Box>
              )}
              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                  Failed to load line items
                </Alert>
              )}
              {groupedLineItems && (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 3 }}>
                    Financial Breakdown
                  </Typography>
                  <Stack spacing={3}>
                    {Object.entries(groupedLineItems).map(([category, items]) => (
                      <Box key={category}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {category}
                          </Typography>
                          <Chip 
                            label={formatCurrency(getCategoryTotal(items))}
                            size="small"
                            color={getCategoryColor(category)}
                            sx={{ fontWeight: 500 }}
                          />
                        </Box>
                        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f8fafc' }}>
                                  Account Name
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: 600, backgroundColor: '#f8fafc' }}>
                                  Amount
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {items.filter(item => parseFloat(item.value) !== 0).length > 0 ? (
                                items
                                  .filter(item => parseFloat(item.value) !== 0)
                                  .map(item => (
                                    <TableRow 
                                      key={item.id}
                                      sx={{ 
                                        '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                                        '&:hover': { backgroundColor: '#f0f9ff' }
                                      }}
                                    >
                                      <TableCell sx={{ py: 1.5 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                          {item.account.name}
                                        </Typography>
                                      </TableCell>
                                      <TableCell align="right" sx={{ py: 1.5 }}>
                                        <Typography 
                                          variant="body2" 
                                          sx={{ 
                                            fontWeight: 500,
                                            color: parseFloat(item.value) > 0 ? 'success.main' : 'error.main'
                                          }}
                                        >
                                          {formatCurrency(item.value)}
                                        </Typography>
                                      </TableCell>
                                    </TableRow>
                                  ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={2} sx={{ py: 3, textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                      No transactions recorded for {category.toLowerCase()} in this period
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </Paper>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}; 