import React, { useState, useCallback, useMemo } from 'react';
import ProgressModal from './ProgressModal/ProgressModal';
import useSuggestionStore from '../../store/suggestionStore';

const EnvironmentalSuggestions = ({ filters }) => {
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('priority'); // 'priority', 'status', 'progress'
  const getSuggestion = useSuggestionStore(state => state.getSuggestion);

  const handleSuggestionClick = useCallback((suggestion) => {
    setSelectedSuggestion(suggestion);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedSuggestion(null);
  }, []);

  const suggestions = [
    {
      id: 1,
      title: "Carbon Footprint Monitoring",
      description: "Implement continuous monitoring of carbon emissions and greenhouse gases.",
      icon: "/icons/smart-meter.svg",
      frequency: "Weekly",
      status: "pending",
      category: "Emissions",
      priority: "High"
    },
    {
      id: 2,
      title: "Water Quality Assessment",
      description: "Regular testing and monitoring of water quality in mining areas.",
      icon: "/icons/process-optimization.svg",
      frequency: "Monthly",
      status: "pending",
      category: "Water",
      priority: "High"
    },
    {
      id: 3,
      title: "Waste Management System",
      description: "Comprehensive waste reduction and recycling program implementation.",
      icon: "/icons/waste-heat-recovery.svg",
      frequency: "Quarterly",
      status: "in-progress",
      category: "Waste",
      priority: "High"
    },
    {
      id: 4,
      title: "Biodiversity Protection",
      description: "Monitor and protect local flora and fauna in mining regions.",
      icon: "/icons/local-sourcing.svg",
      frequency: "Daily",
      status: "completed",
      category: "Biodiversity",
      priority: "High"
    },
    {
      id: 5,
      title: "Environmental Compliance",
      description: "Ensure adherence to environmental regulations and standards.",
      icon: "/icons/training.svg",
      frequency: "Quarterly",
      status: "pending",
      category: "Compliance",
      priority: "Medium"
    }
  ];

  const getFrequencyColor = (frequency) => {
    switch (frequency.toLowerCase()) {
      case 'daily':
        return 'bg-blue-100 text-blue-800';
      case 'weekly':
        return 'bg-green-100 text-green-800';
      case 'monthly':
        return 'bg-purple-100 text-purple-800';
      case 'quarterly':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-orange-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const sortedAndFilteredSuggestions = useMemo(() => {
    let filtered = suggestions.filter(suggestion => {
      if (!filters) return true;
      const categoryMatch = !filters.category || filters.category === 'all' || suggestion.category === filters.category;
      const priorityMatch = !filters.priority || filters.priority === 'all' || suggestion.priority === filters.priority;
      return categoryMatch && priorityMatch;
    });

    return filtered.sort((a, b) => {
      const getSortValue = (suggestion) => {
        const savedData = getSuggestion(suggestion.id);
        switch (sortBy) {
          case 'priority':
            return { high: 3, medium: 2, low: 1 }[suggestion.priority.toLowerCase()] || 0;
          case 'status':
            const status = savedData?.status || suggestion.status;
            return { completed: 3, 'in-progress': 2, pending: 1 }[status.toLowerCase()] || 0;
          case 'progress':
            return savedData?.progress || 0;
          default:
            return 0;
        }
      };
      return getSortValue(b) - getSortValue(a);
    });
  }, [filters, sortBy, getSuggestion]);

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedAndFilteredSuggestions.map((suggestion) => {
        const savedData = getSuggestion(suggestion.id);
        const progress = savedData?.progress || 0;
        const status = savedData?.status || suggestion.status;

        return (
          <div
            key={suggestion.id}
            onClick={() => handleSuggestionClick(suggestion)}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
          >
            {/* Priority Indicator */}
            <div className={`absolute top-0 right-0 w-16 h-16 ${getPriorityColor(suggestion.priority)}`}>
              <div className="absolute transform rotate-45 bg-current text-white text-xs font-bold py-1 right-[-35px] top-[32px] w-[170px] text-center">
                {suggestion.priority} Priority
              </div>
            </div>

            <div className="p-6">
              {/* Header */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={suggestion.icon} 
                    alt="" 
                    className="w-8 h-8"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/icons/default-suggestion.svg';
                    }} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-black">
                    {suggestion.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFrequencyColor(suggestion.frequency)}`}>
                      {suggestion.frequency}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                      {status}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {suggestion.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                {suggestion.description}
              </p>

              {/* Progress Section */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-medium text-gray-900">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: status === 'completed' ? '#10B981' : 
                                    status === 'in-progress' ? '#3B82F6' : 
                                    '#F59E0B'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {sortedAndFilteredSuggestions.map((suggestion) => {
        const savedData = getSuggestion(suggestion.id);
        const progress = savedData?.progress || 0;
        const status = savedData?.status || suggestion.status;

        return (
          <div
            key={suggestion.id}
            onClick={() => handleSuggestionClick(suggestion)}
            className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
          >
            <div className="p-4 flex items-center space-x-4">
              {/* Icon and Title */}
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={suggestion.icon} 
                  alt="" 
                  className="w-6 h-6"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/icons/default-suggestion.svg';
                  }} 
                />
              </div>
              
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900 truncate">
                    {suggestion.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(suggestion.priority)} bg-opacity-10`}>
                      {suggestion.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                      {status}
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-300 rounded-full"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: status === 'completed' ? '#10B981' : 
                                        status === 'in-progress' ? '#3B82F6' : 
                                        '#F59E0B'
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{progress}%</span>
                </div>
                
                {/* Category and Frequency */}
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{suggestion.category}</span>
                  <span className="text-gray-300">•</span>
                  <span className={`text-sm ${getFrequencyColor(suggestion.frequency)}`}>
                    {suggestion.frequency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Toggle and Sort Controls */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            List View
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="block w-full rounded-md border-gray-300 text-base focus:border-black focus:ring-black sm:text-sm"
          >
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="progress">Progress</option>
          </select>
        </div>
      </div>

      {/* Suggestions Grid/List */}
      {viewMode === 'grid' ? renderGridView() : renderListView()}

      {/* Progress Modal */}
      {selectedSuggestion && (
        <ProgressModal
          suggestion={selectedSuggestion}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default EnvironmentalSuggestions;
