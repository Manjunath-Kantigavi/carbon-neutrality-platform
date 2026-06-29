import React, { useState, useCallback, useMemo } from 'react';
import useSuggestionStore from '../../store/suggestionStore';

const GeneralSuggestions = ({ filters }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('category');
  const getSuggestion = useSuggestionStore(state => state.getSuggestion);

  const suggestions = [
    {
      id: 'g1',
      title: "Energy Conservation",
      description: "Implement energy-saving practices in mining operations to reduce carbon footprint.",
      icon: "/icons/smart-meter.svg",
      category: "Energy",
      impact: "High",
      timeframe: "Long-term",
      difficulty: "Medium"
    },
    {
      id: 'g2',
      title: "Water Management",
      description: "Develop water recycling systems for mining processes to minimize water wastage.",
      icon: "/icons/process-optimization.svg",
      category: "Water",
      impact: "High",
      timeframe: "Medium-term",
      difficulty: "High"
    },
    {
      id: 'g3',
      title: "Waste Reduction",
      description: "Implement comprehensive waste management and recycling programs.",
      icon: "/icons/waste-heat-recovery.svg",
      category: "Waste",
      impact: "Medium",
      timeframe: "Short-term",
      difficulty: "Low"
    },
    {
      id: 'g4',
      title: "Green Technology",
      description: "Adopt renewable energy sources for mining operations.",
      icon: "/icons/training.svg",
      category: "Technology",
      impact: "High",
      timeframe: "Long-term",
      difficulty: "High"
    },
    {
      id: 'g5',
      title: "Biodiversity Protection",
      description: "Establish protected areas and wildlife corridors around mining sites.",
      icon: "/icons/local-sourcing.svg",
      category: "Environment",
      impact: "Medium",
      timeframe: "Medium-term",
      difficulty: "Medium"
    }
  ];

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'energy':
        return 'bg-yellow-100 text-yellow-800';
      case 'water':
        return 'bg-blue-100 text-blue-800';
      case 'waste':
        return 'bg-green-100 text-green-800';
      case 'technology':
        return 'bg-purple-100 text-purple-800';
      case 'environment':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeframeColor = (timeframe) => {
    switch (timeframe.toLowerCase()) {
      case 'short-term':
        return 'bg-green-100 text-green-800';
      case 'medium-term':
        return 'bg-blue-100 text-blue-800';
      case 'long-term':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sortedAndFilteredSuggestions = useMemo(() => {
    let filtered = suggestions.filter(suggestion => {
      if (!filters) return true;
      const categoryMatch = !filters.category || filters.category === 'all' || suggestion.category === filters.category;
      return categoryMatch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'impact':
          const impactOrder = { high: 3, medium: 2, low: 1 };
          return impactOrder[b.impact.toLowerCase()] - impactOrder[a.impact.toLowerCase()];
        case 'difficulty':
          const difficultyOrder = { high: 3, medium: 2, low: 1 };
          return difficultyOrder[a.difficulty.toLowerCase()] - difficultyOrder[b.difficulty.toLowerCase()];
        case 'timeframe':
          const timeframeOrder = { 'short-term': 1, 'medium-term': 2, 'long-term': 3 };
          return timeframeOrder[a.timeframe.toLowerCase()] - timeframeOrder[b.timeframe.toLowerCase()];
        case 'category':
        default:
          return a.category.localeCompare(b.category);
      }
    });
  }, [filters, sortBy]);

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedAndFilteredSuggestions.map((suggestion) => {
        const savedData = getSuggestion(suggestion.id);
        const progress = savedData?.progress || 0;
        const status = savedData?.status || 'pending';

        return (
          <div
            key={suggestion.id}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
          >
            {/* Impact Indicator */}
            <div className={`absolute top-0 right-0 w-16 h-16 ${getImpactColor(suggestion.impact)}`}>
              <div className="absolute transform rotate-45 bg-current text-white text-xs font-bold py-1 right-[-35px] top-[32px] w-[170px] text-center">
                {suggestion.impact} Impact
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(suggestion.category)}`}>
                      {suggestion.category}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTimeframeColor(suggestion.timeframe)}`}>
                      {suggestion.timeframe}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(suggestion.difficulty)}`}>
                      {suggestion.difficulty} Difficulty
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                {suggestion.description}
              </p>

              {/* Implementation Tips */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Implementation Tips</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Research best practices</li>
                  <li>• Create implementation timeline</li>
                  <li>• Monitor progress regularly</li>
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {sortedAndFilteredSuggestions.map((suggestion) => (
        <div
          key={suggestion.id}
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
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-black">
                  {suggestion.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(suggestion.category)}`}>
                    {suggestion.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(suggestion.impact)} bg-opacity-10`}>
                    {suggestion.impact} Impact
                  </span>
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="mt-1 flex items-center space-x-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTimeframeColor(suggestion.timeframe)}`}>
                  {suggestion.timeframe}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(suggestion.difficulty)}`}>
                  {suggestion.difficulty} Difficulty
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Controls */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'grid' 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'list' 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            List View
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border-gray-200 rounded-lg focus:ring-black focus:border-black"
          >
            <option value="category">Category</option>
            <option value="impact">Impact</option>
            <option value="difficulty">Difficulty</option>
            <option value="timeframe">Timeframe</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? renderGridView() : renderListView()}
    </div>
  );
};

export default GeneralSuggestions;
