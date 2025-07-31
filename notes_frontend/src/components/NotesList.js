import React from 'react';

const NotesList = ({ notes, onSelect, onDelete, activeNoteId }) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`note-item ${activeNoteId === note.id ? 'active' : ''}`}
          onClick={() => onSelect(note)}
        >
          <div className="note-item-header">
            <h3>{note.title || 'Untitled'}</h3>
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}>
              X
            </button>
          </div>
          <p>{note.content.substring(0, 50) + (note.content.length > 50 ? '...' : '')}</p>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
