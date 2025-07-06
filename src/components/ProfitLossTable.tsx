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

interface ProfitLossTableProps {
  reports: Report[];
}

export const ProfitLossTable: React.FC<ProfitLossTableProps> = ({ reports }) => {
  return (
    <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Box sx={{ p: 3, backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Financial Performance Overview
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Monthly profit and loss summary with expandable details
        </Typography>
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