import React, { useState } from 'react';

interface StickyNotesModalProps {
    onClose: () => void;
    onSave: (note: string) => void;
    onDelete: (index: number) => void;
    isVisible: boolean;
    notes: string[];
}

const StickyNotesModal: React.FC<StickyNotesModalProps> = ({ onClose, onSave, onDelete, isVisible, notes }) => {
    const [note, setNote] = useState('');

    const handleSave = () => {
      if (note.trim() !== '') {
        onSave(note); 
        setNote('');
      }
    };

    const handleNoteSelect = (selectedNote: string) => {
        setNote(selectedNote);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="flex bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full animate-scale-up">
            <div className="w-1/3 p-4 border-r border-gray-300 overflow-y-auto">
              <h4 className="font-semibold text-lg mb-3">Previous Notes</h4>
              {notes.map((storedNote, index) => (
                <div key={index} className="flex justify-between bg-white p-2 mb-2 rounded-lg shadow hover:shadow-md transform hover:-translate-y-1 transition duration-300 cursor-pointer">
                  <p onClick={() => handleNoteSelect(storedNote)}>{storedNote}</p>
                  <button onClick={() => onDelete(index)} className="text-red-500 hover:text-red-700">Delete</button>
                </div>
              ))}
            </div>
            <div className="w-2/3 p-4 relative">
              <button onClick={onClose} className="absolute top-2 right-2 text-xl font-semibold">&times;</button>
              <h3 className="text-lg font-semibold mb-4">Add a Sticky Note</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Type your note here..."
                rows={5}
              ></textarea>
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
                  Save Note
                </button>
                <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      );
};

export default StickyNotesModal;