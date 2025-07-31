import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import './App.css';
import backgroundImage from './assets/old_notepad.jpeg';

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
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
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="app-container">
      <div className="notepad-page">
        <div className="spiral-container">
          <div className="spiral"></div>
        </div>
        <Header onSearch={handleSearch} searchTerm={searchTerm} />
        <div className="main-content">
          <div className="create-note-area">
            <CreateNote onAdd={addNote} />
          </div>
          <div className="notes-grid">
            <NotesList
              notes={filteredNotes}
              onDelete={deleteNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
