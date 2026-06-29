import React, { useState } from 'react';

const SuggestionProgress = ({ suggestion, onProgressUpdate }) => {
  const [implementation, setImplementation] = useState({
    status: suggestion.status || 'pending', // pending, in-progress, completed
    progress: suggestion.progress || 0,
    startDate: suggestion.startDate || null,
    completionDate: suggestion.completionDate || null,
    impact: suggestion.impact || {
      emissionReduction: 0,
      costSaving: 0,
      resourceSaved: 0
    },
    notes: suggestion.notes || ''
  });

  const statusColors = {
    pending: 'bg-gray-200',
    'in-progress': 'bg-blue-200',
    completed: 'bg-green-200'
  };

  const statusIcons = {
    pending: '⏳',
    'in-progress': '🔄',
    completed: '✅'
  };

  const handleStatusChange = (newStatus) => {
    const updatedImplementation = {
      ...implementation,
      status: newStatus,
      startDate: newStatus === 'in-progress' && !implementation.startDate ? new Date() : implementation.startDate,
      completionDate: newStatus === 'completed' ? new Date() : null
    };
    setImplementation(updatedImplementation);
    onProgressUpdate(updatedImplementation);
  };

  const handleProgressChange = (e) => {
    const progress = parseInt(e.target.value);
    const updatedImplementation = {
      ...implementation,
      progress,
      status: progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'pending'
    };
    setImplementation(updatedImplementation);
    onProgressUpdate(updatedImplementation);
  };

  const handleImpactChange = (field, value) => {
    const updatedImplementation = {
      ...implementation,
      impact: {
        ...implementation.impact,
        [field]: parseFloat(value)
      }
    };
    setImplementation(updatedImplementation);
    onProgressUpdate(updatedImplementation);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{suggestion.title}</h3>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm ${statusColors[implementation.status]}`}>
            {statusIcons[implementation.status]} {implementation.status.charAt(0).toUpperCase() + implementation.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Implementation Progress</label>
          <span className="text-sm font-semibold">{implementation.progress}%</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={implementation.progress}
            onChange={handleProgressChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div 
            className="absolute left-0 top-0 h-2 bg-green-500 rounded-lg transition-all duration-300"
            style={{ width: `${implementation.progress}%` }}
          />
        </div>
      </div>

      {/* Status Controls */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {['pending', 'in-progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              implementation.status === status
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {statusIcons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Impact Metrics */}
      <div className="space-y-4">
        <h4 className="font-medium mb-2">Impact Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <label className="text-sm font-medium block mb-1">Emission Reduction (kg CO2)</label>
            <input
              type="number"
              value={implementation.impact.emissionReduction}
              onChange={(e) => handleImpactChange('emissionReduction', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <label className="text-sm font-medium block mb-1">Cost Saving (₹)</label>
            <input
              type="number"
              value={implementation.impact.costSaving}
              onChange={(e) => handleImpactChange('costSaving', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <label className="text-sm font-medium block mb-1">Resources Saved (units)</label>
            <input
              type="number"
              value={implementation.impact.resourceSaved}
              onChange={(e) => handleImpactChange('resourceSaved', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Implementation Dates */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {implementation.startDate && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <span className="text-sm font-medium block">Started</span>
            <span className="text-sm text-gray-600">
              {new Date(implementation.startDate).toLocaleDateString()}
            </span>
          </div>
        )}
        {implementation.completionDate && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <span className="text-sm font-medium block">Completed</span>
            <span className="text-sm text-gray-600">
              {new Date(implementation.completionDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Notes Section */}
      <div className="mt-6">
        <label className="text-sm font-medium block mb-2">Implementation Notes</label>
        <textarea
          value={implementation.notes}
          onChange={(e) => {
            const updatedImplementation = { ...implementation, notes: e.target.value };
            setImplementation(updatedImplementation);
            onProgressUpdate(updatedImplementation);
          }}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          rows="3"
          placeholder="Add any notes about the implementation..."
        />
      </div>
    </div>
  );
};

export default SuggestionProgress;
