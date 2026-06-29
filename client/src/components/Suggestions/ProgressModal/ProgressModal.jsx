import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useSuggestionStore from '../../../store/suggestionStore';
import ProgressTracker from './ProgressTracker';
import ImpactMetrics from './ImpactMetrics';

const ProgressModal = ({ suggestion, onClose }) => {
  const updateSuggestion = useSuggestionStore(state => state.updateSuggestion);
  const savedData = useSuggestionStore(state => state.getSuggestion(suggestion?.id));
  const [localChanges, setLocalChanges] = useState(savedData || {});

  const handleUpdate = useCallback((data) => {
    if (!suggestion?.id) return;
    setLocalChanges(prev => ({ ...prev, ...data }));
  }, [suggestion?.id]);

  const handleSave = () => {
    updateSuggestion(suggestion.id, localChanges);
    onClose();
  };

  if (!suggestion) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-y-auto max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{suggestion.title}</h2>
                <p className="mt-1 text-gray-600">{suggestion.description}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            <ProgressTracker
              suggestion={suggestion}
              savedData={localChanges}
              onUpdate={handleUpdate}
            />

            <ImpactMetrics suggestion={suggestion} />
          </div>

          {/* Footer with Save Button */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProgressModal;
