import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import NotesList from './components/NotesList';
import NoteView from './components/NoteView';
import CreateNote from './components/CreateNote';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes-app-data'));
    if (savedNotes) {
      setNotes(savedNotes);
      setFilteredNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes-app-data', JSON.stringify(notes));
    const results = notes.filter(note =>
      (note.title && note.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredNotes(results);
  }, [notes, searchTerm]);

  const addNote = (newNote) => {
    const noteWithId = { ...newNote, id: uuidv4() };
    const newNotes = [noteWithId, ...notes];
    setNotes(newNotes);
    setSelectedNote(noteWithId);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    if (selectedNote && selectedNote.id === id) {
      setSelectedNote(newNotes.length > 0 ? newNotes[0] : null);
    }
  };

  const updateNote = (updatedNote) => {
    const newNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(newNotes);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Filter notes..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <CreateNote onAdd={addNote} />
          <NotesList
            notes={filteredNotes}
            onSelect={setSelectedNote}
            onDelete={deleteNote}
            activeNoteId={selectedNote ? selectedNote.id : null}
          />
        </div>
        <div className="note-view-container">
          <NoteView note={selectedNote} onUpdate={updateNote} />
        </div>
      </div>
    </div>
  );
}

export default App;
