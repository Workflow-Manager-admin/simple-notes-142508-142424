import React from 'react';

const NotesList = ({ notes, onDelete }) => {
  return (
    <>
      {notes.map((note) => (
        <div
          key={note.id}
          className="note-card"
        >
          <h2>{note.title || 'Untitled'}</h2>
          <p>{note.content}</p>
          <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default NotesList;
