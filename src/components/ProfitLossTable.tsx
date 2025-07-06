import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import type { Report } from '../types';
import { ProfitLossTableRow } from './ProfitLossTableRow';
import { formatCurrency } from '../utils/formatters';

interface ProfitLossTableProps {
  reports: Report[];
}

export const ProfitLossTable: React.FC<ProfitLossTableProps> = ({ reports }) => {
  const totalGrossProfit = reports.reduce((sum, report) => sum + parseFloat(report.grossProfit), 0);
  const totalNetProfit = reports.reduce((sum, report) => sum + parseFloat(report.netProfit), 0);
  const averageMargin = totalGrossProfit > 0 ? (totalNetProfit / totalGrossProfit) * 100 : 0;

  return (
    <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Box sx={{ p: 3, backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Financial Performance Overview
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Monthly profit and loss summary with expandable details
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                {formatCurrency(totalGrossProfit)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total Gross Profit
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: totalNetProfit >= 0 ? 'success.main' : 'error.main' }}>
                {formatCurrency(totalNetProfit)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total Net Profit
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: averageMargin >= 0 ? 'success.main' : 'error.main' }}>
                {averageMargin.toFixed(1)}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Average Margin
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table aria-label="profit and loss table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 50 }} />
              <TableCell sx={{ fontWeight: 600 }}>Period</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Gross Profit</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Net Profit</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Net Margin</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <ProfitLossTableRow key={report.id} report={report} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}; 