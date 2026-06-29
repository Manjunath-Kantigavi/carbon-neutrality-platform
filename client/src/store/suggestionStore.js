import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSuggestionStore = create(
  persist(
    (set, get) => ({
      suggestions: {},
      
      getSuggestion: (id) => {
        return get().suggestions[id] || null;
      },

      updateSuggestion: (id, data) => {
        set((state) => {
          const existingData = state.suggestions[id] || {};
          const newData = {
            ...existingData,
            ...data,
            lastUpdated: new Date().toISOString()
          };

          // Only update if data actually changed
          if (JSON.stringify(existingData) === JSON.stringify(newData)) {
            return state;
          }

          return {
            suggestions: {
              ...state.suggestions,
              [id]: newData
            }
          };
        });
      },

      getProgress: (id) => {
        const suggestion = get().suggestions[id];
        return suggestion?.progress || 0;
      },

      getStatusCounts: () => {
        const suggestions = Object.values(get().suggestions);
        return suggestions.reduce((acc, curr) => {
          const status = curr.status || 'pending';
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});
      },

      getTotalImpact: () => {
        const suggestions = Object.values(get().suggestions);
        return suggestions.reduce((acc, curr) => {
          const impact = curr.impact || {};
          return {
            emissionReduction: (acc.emissionReduction || 0) + (impact.emissionReduction || 0),
            costSaving: (acc.costSaving || 0) + (impact.costSaving || 0),
            resourceSaved: (acc.resourceSaved || 0) + (impact.resourceSaved || 0)
          };
        }, {});
      }
    }),
    {
      name: 'suggestion-storage',
      getStorage: () => localStorage
    }
  )
);

export default useSuggestionStore;
