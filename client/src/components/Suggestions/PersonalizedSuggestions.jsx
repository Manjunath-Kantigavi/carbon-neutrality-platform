import React, { useState, useEffect } from 'react';
import { getSuggestions } from '../../api/api';
import { CircularProgress, Button } from '@mui/material';

const PersonalizedSuggestions = ({ filters }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [summary, setSummary] = useState(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getSuggestions();
      setSuggestions(res.data.suggestions || []);
      setSummary(res.data.summary || null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to generate suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  
  const filteredSuggestions = suggestions.filter((s) => {
    if (filters.category !== 'all' && s.category !== filters.category) return false;
    if (filters.priority !== 'all' && s.priority !== filters.priority) return false;
    if (filters.timeframe !== 'all' && s.timeframe !== filters.timeframe) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <CircularProgress sx={{ color: '#FFA500' }} />
        <p className="text-gray-500">Generating personalized suggestions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500 font-medium text-center">{error}</p>
        <Button variant="contained" onClick={fetchSuggestions} sx={{ backgroundColor: '#FFA500' }}>
          Retry
        </Button>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2">
        <p className="text-gray-500">No suggestions generated yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary context */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Total Emissions</p>
            <p className="text-lg font-semibold text-red-600">{summary.emissionsTonsPerYear} tCO2/yr</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Carbon Offset</p>
            <p className="text-lg font-semibold text-green-600">{summary.carbonOffsetTonsPerYear} tCO2/yr</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Net Emissions</p>
            <p className="text-lg font-semibold text-orange-600">{summary.netEmissionsTonsPerYear} tCO2/yr</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-xs text-gray-500 uppercase">Equipment Efficiency</p>
            <p className="text-lg font-semibold text-blue-600">{summary.efficiency}%</p>
          </div>
        </div>
      )}

      {filteredSuggestions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No suggestions match the selected filters.</p>
      ) : (
        filteredSuggestions.map((suggestion, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{suggestion.title}</h3>
                <div className="flex items-center flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    suggestion.priority?.toLowerCase() === 'high' ? 'bg-red-100 text-red-800' :
                    suggestion.priority?.toLowerCase() === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {suggestion.priority} Priority
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {suggestion.timeframe}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    {suggestion.category}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{suggestion.explanation}</p>

            {suggestion.emissionReductionPotential && (
              <div className="bg-green-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-gray-600">Emission Reduction Potential</p>
                <p className="text-lg font-semibold text-green-700">{suggestion.emissionReductionPotential}</p>
              </div>
            )}

            {Array.isArray(suggestion.actionSteps) && suggestion.actionSteps.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Action Steps:</p>
                <ul className="list-disc list-inside space-y-1">
                  {suggestion.actionSteps.map((step, i) => (
                    <li key={i} className="text-gray-700 text-sm">{step}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PersonalizedSuggestions;