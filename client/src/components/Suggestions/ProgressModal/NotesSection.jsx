import React, { useState } from 'react';

const NotesSection = ({ suggestion, savedData, onUpdate }) => {
  const [newNote, setNewNote] = useState('');
  const notes = savedData?.notes || [];

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    console.log('Adding note:', newNote);
    onUpdate({
      notes: [
        ...notes,
        {
          id: Date.now(),
          text: newNote.trim(),
          timestamp: new Date().toISOString()
        }
      ]
    });
    setNewNote('');
  };

  const handleDeleteNote = (noteId) => {
    console.log('Deleting note:', noteId);
    onUpdate({
      notes: notes.filter(note => note.id !== noteId)
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Implementation Notes</h3>
      
      {/* Add Note */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
          placeholder="Add a note..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
        />
        <button
          onClick={handleAddNote}
          className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800"
        >
          Add
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex justify-between items-start p-3 bg-gray-50 rounded-md"
          >
            <div className="space-y-1">
              <p className="text-sm text-gray-700">{note.text}</p>
              <p className="text-xs text-gray-500">
                {new Date(note.timestamp).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleDeleteNote(note.id)}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Delete</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesSection;
