import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Stack,
  TextField,
  Divider,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { uploadETLData, generateSampleETLData } from '../services/api';
import type { ETLProgress } from '../types';

const steps = [
  'Preparing Data',
  'Uploading to Server',
  'Processing Reports',
  'Integration Complete'
];

export const DataIntegrationPage: React.FC = () => {
  const [progress, setProgress] = useState<ETLProgress>({
    status: 'idle',
    progress: 0,
    message: 'Ready to integrate financial data',
  });
  
  const [customData, setCustomData] = useState<string>('');
  const [showSampleData, setShowSampleData] = useState(false);
  const [lastResult, setLastResult] = useState<string>('');

  const handleIntegration = async (useCustomData: boolean = false) => {
    try {
      setProgress({
        status: 'uploading',
        progress: 25,
        message: 'Preparing data payload...',
      });

      let payload;
      if (useCustomData && customData.trim()) {
        try {
          payload = JSON.parse(customData);
        } catch {
          throw new Error('Invalid JSON format in custom data');
        }
      } else {
        payload = generateSampleETLData();
      }

      setProgress({
        status: 'uploading',
        progress: 50,
        message: 'Uploading data to server...',
      });

      const response = await uploadETLData(payload);

      setProgress({
        status: 'processing',
        progress: 75,
        message: 'Processing financial reports...',
      });

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setProgress({
        status: 'completed',
        progress: 100,
        message: response.message || 'Data integration completed successfully!',
      });

      setLastResult(`✅ Successfully processed ${response.processed_reports || payload.data.length} reports`);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during integration';
      setProgress({
        status: 'error',
        progress: 0,
        message: errorMessage,
        error: errorMessage,
      });
      setLastResult(`Integration failed: ${errorMessage}`);
    }
  };

  const handleReset = () => {
    setProgress({
      status: 'idle',
      progress: 0,
      message: 'Ready to integrate financial data',
    });
    setLastResult('');
  };

  const getStepIcon = (step: number) => {
    const currentStep = Math.floor(progress.progress / 25);
    if (step < currentStep) return <CheckCircleIcon color="success" />;
    if (step === currentStep && progress.status === 'error') return <ErrorIcon color="error" />;
    return undefined;
  };

  const sampleDataPreview = JSON.stringify(generateSampleETLData(), null, 2);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Data Integration Center
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Upload financial data to integrate with your profit and loss reports. 
        Use the sample data below or provide your own JSON payload.
      </Typography>

      {/* Progress Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Integration Status
            </Typography>
            <Chip 
              label={progress.status.toUpperCase()} 
              color={
                progress.status === 'completed' ? 'success' :
                progress.status === 'error' ? 'error' :
                progress.status === 'idle' ? 'default' : 'primary'
              }
              variant="outlined"
            />
          </Box>

          {progress.status !== 'idle' && (
            <Box sx={{ mb: 3 }}>
              <Stepper 
                activeStep={Math.floor(progress.progress / 25)} 
                alternativeLabel
                sx={{ mb: 2 }}
              >
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel icon={getStepIcon(index)}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <LinearProgress 
                variant="determinate" 
                value={progress.progress} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          )}

          <Typography variant="body2" sx={{ mb: 2 }}>
            {progress.message}
          </Typography>

          {progress.status === 'error' && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {progress.error}
            </Alert>
          )}

          {lastResult && (
            <Alert 
              severity={progress.status === 'completed' ? 'success' : 'error'} 
              sx={{ mb: 2 }}
            >
              {lastResult}
            </Alert>
          )}

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              onClick={() => handleIntegration(false)}
              disabled={progress.status === 'uploading' || progress.status === 'processing'}
              sx={{ minWidth: 160 }}
            >
              Run Sample Data
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onClick={() => handleIntegration(true)}
              disabled={progress.status === 'uploading' || progress.status === 'processing' || !customData.trim()}
              sx={{ minWidth: 160 }}
            >
              Upload Custom Data
            </Button>

            {progress.status !== 'idle' && (
              <Button
                variant="text"
                startIcon={<RefreshIcon />}
                onClick={handleReset}
                sx={{ minWidth: 120 }}
              >
                Reset
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Custom Data Input */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Custom Data Upload
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            Paste your JSON data here or use the sample data format shown below.
          </Typography>
          
          <TextField
            multiline
            rows={8}
            fullWidth
            placeholder="Paste your JSON data here..."
            value={customData}
            onChange={(e) => setCustomData(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
              Sample Data Format
            </Typography>
            <IconButton 
              onClick={() => setShowSampleData(!showSampleData)}
              size="small"
            >
              <ExpandMoreIcon 
                sx={{ 
                  transform: showSampleData ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }}
              />
            </IconButton>
          </Box>

          <Collapse in={showSampleData}>
            <Box sx={{ position: 'relative' }}>
              <pre
                style={{
                  backgroundColor: '#f5f5f5',
                  padding: '16px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '12px',
                  maxHeight: '400px',
                  border: '1px solid #e0e0e0'
                }}
              >
                {sampleDataPreview}
              </pre>
              <Button
                size="small"
                startIcon={<CodeIcon />}
                onClick={() => setCustomData(sampleDataPreview)}
                sx={{ mt: 1 }}
              >
                Use Sample Data
              </Button>
            </Box>
          </Collapse>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Integration Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Supported Data Format
              </Typography>
              <Typography variant="body2" color="text.secondary">
                JSON payload with company financial data including revenue, expenses, and profit/loss information
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Processing Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The system will automatically create companies, accounts, reports, and line items based on your data
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                File Size Limit
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Maximum upload size: 100MB
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}; 