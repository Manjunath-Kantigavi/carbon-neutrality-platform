import React from 'react';

const ProgressTracker = ({ suggestion, savedData, onUpdate }) => {
  const currentStatus = savedData?.status || suggestion.status || 'pending';
  const currentProgress = savedData?.progress || 0;

  const handleStatusChange = (status) => {
    let progress = currentProgress;
    
    // Set progress based on status
    if (status === 'completed') {
      progress = 100;
    } else if (status === 'pending') {
      progress = 0;
    }

    onUpdate({
      status,
      progress,
      lastUpdated: new Date().toISOString()
    });
  };

  const handleProgressChange = (e) => {
    const progress = parseInt(e.target.value, 10);
    onUpdate({
      progress,
      lastUpdated: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Progress Tracking</h3>
      
      {/* Status Buttons */}
      <div className="flex flex-wrap gap-2">
        {['pending', 'in-progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${currentStatus === status 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Progress Slider - Only show for 'in-progress' status */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="progress" className="text-sm font-medium text-gray-700">
            Progress: {currentProgress}%
          </label>
        </div>
        <input
          type="range"
          id="progress"
          name="progress"
          min="0"
          max="100"
          value={currentProgress}
          onChange={handleProgressChange}
          disabled={currentStatus !== 'in-progress'}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer
            ${currentStatus === 'in-progress'
              ? 'bg-gray-200'
              : 'bg-gray-100 cursor-not-allowed'}`}
        />
      </div>
    </div>
  );
};

export default ProgressTracker;
