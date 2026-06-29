import React, { useState } from 'react';
import {
  Stepper, Step, StepLabel, StepContent,
  Button, Paper, Typography, Box,
  createTheme, ThemeProvider, Alert, Snackbar,
} from '@mui/material';
import ExcavationData from './ExcavationData';
import TransportationData from './TransportationData';
import EquipmentData from './EquipmentData';
import { createMiningOperation } from '../../api/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: { main: '#FFA500', light: '#FFD9B3' },
    success: { main: '#4CAF50' },
  },
});

const DataInput = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const [excavationData, setExcavationData] = useState({
    excavationMethod: '',
    materialVolumeTons: '',
    equipmentType: '',
    fuelType: '',
  });

  const [transportationData, setTransportationData] = useState({
    transportedVolumeTons: '',
    transportMode: '',
    fuelType: '',
    distancePerTripMeters: '',
    loadCapacityTons: '',
    tripsPerDay: '',
  });

  const [equipmentData, setEquipmentData] = useState({
    equipmentCategory: '',
    fuelType: '',
    operatingHoursPerDay: '',
    fuelConsumptionRate: '',
    efficiencyPercentage: '',
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleReset = () => {
    setActiveStep(0);
    setExcavationData({ excavationMethod: '', materialVolumeTons: '', equipmentType: '', fuelType: '' });
    setTransportationData({ transportedVolumeTons: '', transportMode: '', fuelType: '', distancePerTripMeters: '', loadCapacityTons: '', tripsPerDay: '' });
    setEquipmentData({ equipmentCategory: '', fuelType: '', operatingHoursPerDay: '', fuelConsumptionRate: '', efficiencyPercentage: '' });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createMiningOperation({
        excavationData,
        transportationData,
        equipmentData,
      });
      toast.success("Mining operation submitted successfully!");
      setActiveStep((prev) => prev + 1);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      label: 'Excavation Data',
      description: 'Enter excavation-related information',
      component: <ExcavationData excavationData={excavationData} setExcavationData={setExcavationData} />,
    },
    {
      label: 'Transportation Data',
      description: 'Enter transportation-related information',
      component: <TransportationData transportationData={transportationData} setTransportationData={setTransportationData} />,
    },
    {
      label: 'Equipment Data',
      description: 'Enter equipment-related information',
      component: <EquipmentData equipmentData={equipmentData} setEquipmentData={setEquipmentData} />,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="p-6">
        <Typography variant="h5" component="h2" gutterBottom>
          Mining Operation Data Input
        </Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel optional={index === steps.length - 1 ? <Typography variant="caption">Last step</Typography> : null}>
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography className="mb-4">{step.description}</Typography>
                {step.component}
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                    disabled={loading}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? (loading ? 'Submitting...' : 'Submit') : 'Continue'}
                  </Button>
                  <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length && (
          <Box className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 mt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <Typography variant="h6" className="!text-white !font-semibold">
                Mining operation data submitted successfully!
              </Typography>
            </div>

            <Typography className="!text-gray-400 mb-6">
              Next, add your Carbon Sink details (afforestation, methane capture, etc.) to calculate your net carbon offset.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate('/dashboard/carbonSinks')}
                sx={{
                  backgroundColor: '#22c55e',
                  '&:hover': { backgroundColor: '#16a34a' },
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                }}
              >
                Go to Carbon Sinks →
              </Button>
              <Button
                onClick={handleReset}
                sx={{
                  color: '#FFA500',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: 'rgba(255,165,0,0.08)' },
                }}
              >
                Submit Another Operation
              </Button>
            </Box>
          </Box>
        )}
      </div>
    </ThemeProvider>
  );
};

export default DataInput; 