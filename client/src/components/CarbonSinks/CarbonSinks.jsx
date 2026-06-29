import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Box,
  createTheme,
  ThemeProvider,
  CircularProgress,
} from '@mui/material';
import { FaTree, FaLeaf, FaMountain, FaIndustry } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CarbonSinksInput from './CarbonSinksInput';
import CarbonSinksVisualisation from './CarbonSinksVisualisation';
import MethaneEntrapment from './MethaneEntrapment';
import { getLatestOperation, submitCarbonSinks, getEmissionByOperation } from '../../api/api';

const theme = createTheme({
  palette: {
    primary: { main: '#FFA500', light: '#FFD9B3' },
    secondary: { main: '#32CD32' },
  },
});

const CarbonSinks = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showCharts, setShowCharts] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emissionData, setEmissionData] = useState(null);

  const [operationId, setOperationId] = useState(null);
  const [loadingOp, setLoadingOp] = useState(true);
  const [opError, setOpError] = useState(null);

  const [data, setData] = useState({
    afforestation: { areaHectares: 0, plantingRate: 0, treeType: 'broadleaf', sequestrationTonsPerYear: 0 },
    soilCarbon: { areaHectares: 0, practice: 'organic', sequestrationTonsPerYear: 0 },
    grassland: { areaHectares: 0, grassType: 'native', sequestrationTonsPerYear: 0 },
    methaneCapture: { captureRateM3: 0, captureMethod: '', purityPercent: 0, pressureKPa: 0 }
  });

  //  Fetch latest mining operation on mount
  useEffect(() => {
    const fetchOperation = async () => {
      try {
        const res = await getLatestOperation();
        setOperationId(res.data.operation._id);
      } catch (err) {
        setOpError(err?.response?.data?.message || "Could not load mining operation.");
      } finally {
        setLoadingOp(false);
      }
    };
    fetchOperation();
  }, []);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setShowCharts(true);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleReset = () => {
    setActiveStep(0);
    setShowCharts(false);
    setSubmitted(false);
    setData({
      afforestation: { areaHectares: 0, plantingRate: 0, treeType: 'broadleaf', sequestrationTonsPerYear: 0 },
      soilCarbon: { areaHectares: 0, practice: 'organic', sequestrationTonsPerYear: 0 },
      grassland: { areaHectares: 0, grassType: 'native', sequestrationTonsPerYear: 0 },
      methaneCapture: { captureRateM3: 0, captureMethod: '', purityPercent: 0, pressureKPa: 0 }
    });
  };

  const calculateCarbonSeq = (type, values) => {
    let seqRate;
    switch (type) {
      case 'afforestation':
        seqRate = values.treeType === 'broadleaf' ? 2.5 : values.treeType === 'evergreen' ? 2.0 : 2.2;
        return (values.areaHectares * values.plantingRate * seqRate) / 1000;
      case 'soilCarbon':
        seqRate = values.practice === 'organic' ? 3.0 : 2.0;
        return (values.areaHectares * seqRate) / 1000;
      case 'grassland':
        seqRate = values.grassType === 'native' ? 4.0 : values.grassType === 'perennial' ? 3.5 : 3.0;
        return (values.areaHectares * seqRate) / 1000;
      default:
        return 0;
    }
  };

  const handleDataUpdate = (type, newValues) => {
    const estimatedSeq = calculateCarbonSeq(type, newValues);
    setData(prev => ({
      ...prev,
      [type]: { ...newValues, sequestrationTonsPerYear: estimatedSeq }
    }));
  };

  const handleMethaneCaptureUpdate = (newMethaneCapture) => {
    setData(prev => ({ ...prev, methaneCapture: newMethaneCapture }));
  };

  // Actual submission
  const handleFinalSubmit = async () => {
    if (!operationId) {
      toast.error("No mining operation linked. Please submit one first.");
      return;
    }

    setSubmitting(true);
    try {
      const totalSequestrationTons =
        (data.afforestation.sequestrationTonsPerYear || 0) +
        (data.soilCarbon.sequestrationTonsPerYear || 0) +
        (data.grassland.sequestrationTonsPerYear || 0);

      const creditsPerMonth = Math.round((data.methaneCapture.captureRateM3 || 0) * 0.8);

      await submitCarbonSinks({
        operationId,
        methaneCapture: { ...data.methaneCapture, creditsPerMonth },
        afforestation: data.afforestation,
        soilCarbon: data.soilCarbon,
        grassland: data.grassland,
        totalSequestrationTons
      });

      // Fetch the emission record for THIS operation to compute net emissions
      try {
        const emissionRes = await getEmissionByOperation(operationId);
        setEmissionData(emissionRes.data.emission);
      } catch (emissionErr) {
        console.error("Could not fetch emission data:", emissionErr);
        setEmissionData(null); // graceful fallback — still show success, just without comparison
      }

      toast.success("Carbon sink data submitted successfully!");
      setSubmitted(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    {
      label: 'Methane Capture',
      icon: FaIndustry,
      content: (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-3 sm:p-6 bg-white rounded-xl shadow-lg">
          <MethaneEntrapment
            methaneCapture={data.methaneCapture}
            setMethaneCapture={handleMethaneCaptureUpdate}
          />
        </motion.div>
      )
    },
    {
      label: 'Afforestation',
      icon: FaTree,
      content: (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-3 sm:p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <FaTree className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Afforestation</h3>
              <p className="text-gray-600">Track tree planting and carbon sequestration</p>
            </div>
          </div>
          <CarbonSinksInput type="afforestation" data={data.afforestation} onUpdate={(v) => handleDataUpdate('afforestation', v)} />
        </motion.div>
      )
    },
    {
      label: 'Soil Carbon',
      icon: FaLeaf,
      content: (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-3 sm:p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
              <FaLeaf className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Soil Carbon</h3>
              <p className="text-gray-600">Manage soil carbon sequestration</p>
            </div>
          </div>
          <CarbonSinksInput type="soilCarbon" data={data.soilCarbon} onUpdate={(v) => handleDataUpdate('soilCarbon', v)} />
        </motion.div>
      )
    },
    {
      label: 'Grassland',
      icon: FaMountain,
      content: (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-3 sm:p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
              <FaMountain className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Grassland</h3>
              <p className="text-gray-600">Monitor grassland restoration</p>
            </div>
          </div>
          <CarbonSinksInput type="grassland" data={data.grassland} onUpdate={(v) => handleDataUpdate('grassland', v)} />
        </motion.div>
      )
    }
  ];

  //  Block UI until operation is confirmed
  if (loadingOp) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <CircularProgress sx={{ color: '#FFA500' }} />
        <p className="text-gray-500">Loading your mining operation...</p>
      </div>
    );
  }

  if (opError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500 font-medium">{opError}</p>
        <Button variant="contained" onClick={() => navigate('/dashboard/dataInput')} sx={{ backgroundColor: '#FFA500' }}>
          Go to Emission Data
        </Button>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto p-2 sm:p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-3 sm:p-6 overflow-hidden">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-green-500 bg-opacity-20 flex items-center justify-center">
                  <FaTree className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Afforestation</p>
                  <h4 className="text-xl font-semibold text-gray-900">{(data.afforestation.sequestrationTonsPerYear || 0).toFixed(2)} tCO2/year</h4>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500 bg-opacity-20 flex items-center justify-center">
                  <FaLeaf className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Soil Carbon</p>
                  <h4 className="text-xl font-semibold text-gray-900">{(data.soilCarbon.sequestrationTonsPerYear || 0).toFixed(2)} tCO2/year</h4>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-500 bg-opacity-20 flex items-center justify-center">
                  <FaMountain className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Grassland</p>
                  <h4 className="text-xl font-semibold text-gray-900">{(data.grassland.sequestrationTonsPerYear || 0).toFixed(2)} tCO2/year</h4>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center">
                  <FaIndustry className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Methane Capture</p>
                  <h4 className="text-xl font-semibold text-gray-900">{(data.methaneCapture.captureRateM3 || 0).toFixed(2)} m³</h4>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stepper / Charts / Success */}
          {submitted ? (
            <Box className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-semibold">Carbon sink data submitted successfully!</h3>
              </div>

              {emissionData ? (
                (() => {
                  const totalEmissionsTons = (emissionData.totalDailyKg || 0) / 1000 * 365; // yearly tons
                  const totalSequestrationTons =
                    (data.afforestation.sequestrationTonsPerYear || 0) +
                    (data.soilCarbon.sequestrationTonsPerYear || 0) +
                    (data.grassland.sequestrationTonsPerYear || 0) +
                    ((data.methaneCapture.captureRateM3 || 0) * 0.8 / 1000);
                  const netEmissions = totalEmissionsTons - totalSequestrationTons;
                  const isNetPositive = netEmissions <= 0;

                  return (
                    <>
                      <p className="text-gray-400 mb-6">Here's how your carbon sinks offset this operation's emissions:</p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Emissions</p>
                          <p className="text-2xl font-bold text-red-400">{totalEmissionsTons.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">tCO2/year</p>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Total Sinks</p>
                          <p className="text-2xl font-bold text-green-400">{totalSequestrationTons.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">tCO2/year</p>
                        </div>

                        <div className={`${isNetPositive ? 'bg-green-500/10 border-green-500/30' : 'bg-orange-500/10 border-orange-500/30'} border rounded-lg p-4`}>
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Net Emissions</p>
                          <p className={`text-2xl font-bold ${isNetPositive ? 'text-green-400' : 'text-orange-400'}`}>
                            {netEmissions > 0 ? '+' : ''}{netEmissions.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">tCO2/year</p>
                        </div>
                      </div>

                      <div className={`p-4 rounded-lg mb-6 ${isNetPositive ? 'bg-green-500/10 border border-green-500/30' : 'bg-orange-500/10 border border-orange-500/30'}`}>
                        <p className={`text-sm font-medium ${isNetPositive ? 'text-green-400' : 'text-orange-400'}`}>
                          {isNetPositive
                            ? "🎉 Your carbon sinks fully offset this operation's emissions!"
                            : `⚠️ You're still emitting ${Math.abs(netEmissions).toFixed(2)} tCO2/year more than your sinks offset. Check Suggestions for ways to close this gap.`}
                        </p>
                      </div>
                    </>
                  );
                })()
              ) : (
                <p className="text-gray-400 mb-6">Carbon sink data saved. Emission comparison unavailable right now.</p>
              )}

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" onClick={() => navigate('/dashboard/suggestions')} sx={{ backgroundColor: '#22c55e', '&:hover': { backgroundColor: '#16a34a' }, textTransform: 'none', fontWeight: 600 }}>
                  View Suggestions →
                </Button>
                <Button variant="outlined" onClick={() => navigate('/dashboard/visualise')} sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Full Dashboard
                </Button>
                <Button onClick={handleReset} sx={{ color: '#FFA500', textTransform: 'none', fontWeight: 600 }}>
                  Submit Another
                </Button>
              </Box>
            </Box>
          ) : !showCharts ? (
            <Stepper activeStep={activeStep} orientation="vertical" sx={{ '& .MuiStepContent-root': { marginLeft: '12px', paddingLeft: '8px', paddingRight: '0px' } }}>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    StepIconComponent={() => (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index === activeStep ? 'bg-orange-500 text-white' :
                        index < activeStep ? 'bg-green-500 text-white' :
                          'bg-gray-200 text-gray-500'
                        }`}>
                        {React.createElement(step.icon, { className: 'w-4 h-4' })}
                      </div>
                    )}
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    {step.content}
                    <Box sx={{ mb: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1, color: '#059669', borderColor: '#059669', '&:hover': { color: '#fff', borderColor: '#059669', backgroundColor: '#059669' } }}
                      >
                        {index === steps.length - 1 ? 'Review' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1, color: '#F59E0B' }}
                        variant="text"
                      >
                        Back
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h3 className="text-xl font-semibold text-gray-900">Carbon Sequestration Analysis</h3>
                <div className="flex gap-3 flex-wrap">
                  <Button onClick={() => setShowCharts(false)} variant="outlined">
                    Edit Data
                  </Button>
                  <Button
                    onClick={handleFinalSubmit}
                    variant="contained"
                    disabled={submitting}
                    sx={{ backgroundColor: '#22c55e', '&:hover': { backgroundColor: '#16a34a' } }}
                  >
                    {submitting ? 'Submitting...' : 'Confirm & Submit'}
                  </Button>
                </div>
              </div>
              <CarbonSinksVisualisation data={data} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </ThemeProvider>
  );
};

export default CarbonSinks;