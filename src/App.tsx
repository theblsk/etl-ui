import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box, Paper, Tabs, Tab } from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ProfitLossPage } from './pages/ProfitLossPage';
import { DashboardPage } from './pages/DashboardPage';
import { DataIntegrationPage } from './pages/DataIntegrationPage';

// Kudwa-inspired theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1', // Indigo color similar to Kudwa
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#10b981', // Green accent
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      color: '#0f172a',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.3,
      color: '#1e293b',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      color: '#374151',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#64748b',
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#374151',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f1f5f9',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            color: '#374151',
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#f8fafc',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e2e8f0',
        },
        indicator: {
          backgroundColor: '#6366f1',
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          minHeight: 48,
          '&.Mui-selected': {
            color: '#6366f1',
          },
        },
      },
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const getTabValue = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 1;
      case '/integration':
        return 2;
      default:
        return 0;
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate('/reports');
        break;
      case 1:
        navigate('/dashboard');
        break;
      case 2:
        navigate('/integration');
        break;
      default:
        navigate('/reports');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h1" component="h1" gutterBottom>
            AI Finance Analyst
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', mt: 2, fontSize: '1.125rem' }}>
            Automate data integration, financial statement consolidation, and insights generation
          </Typography>
        </Box>

        {/* Navigation Tabs */}
        <Paper elevation={0} sx={{ mb: 4, borderRadius: 3 }}>
          <Tabs 
            value={getTabValue()} 
            onChange={handleTabChange}
            aria-label="financial views"
            sx={{ px: 2 }}
          >
            <Tab 
              icon={<TableViewIcon />} 
              label="Profit & Loss Table" 
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
            <Tab 
              icon={<DashboardIcon />} 
              label="Dashboard Analytics" 
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
            <Tab 
              icon={<CloudUploadIcon />} 
              label="Data Integration" 
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
          </Tabs>
        </Paper>

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<ProfitLossPage />} />
          <Route path="/reports" element={<ProfitLossPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/integration" element={<DataIntegrationPage />} />
        </Routes>

        {/* Footer Section */}
        <Box sx={{ mt: 8, textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Powered by Kudwa AI Finance Management
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
