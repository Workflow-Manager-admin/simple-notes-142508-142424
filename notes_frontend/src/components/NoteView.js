import React, { useState, useEffect } from 'react';

const NoteView = ({ note, onUpdate }) => {
  const [editedNote, setEditedNote] = useState(note);

  useEffect(() => {
    setEditedNote(note);
  }, [note]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote(prevNote => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleBlur = () => {
    if (editedNote) {
        onUpdate(editedNote);
    }
  };

  if (!note) {
    return <div className="note-view placeholder">Select a note to view or edit.</div>;
  }

  return (
    <div className="note-view">
      <input
        name="title"
        value={editedNote.title}
        onChange={handleChange}
        onBlur={handleBlur}
        className="note-title-input"
        placeholder="Title"
      />
      <textarea
        name="content"
        value={editedNote.content}
        onChange={handleChange}
        onBlur={handleBlur}
        className="note-content-input"
        placeholder="Content"
        rows="10"
      />
    </div>
  );
};

export default NoteView;
