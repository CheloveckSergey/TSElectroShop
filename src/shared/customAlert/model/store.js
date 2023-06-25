import React, { createContext, useContext, useEffect, useState } from 'react';

export const NoteContext = createContext();

export function useNotes() {
  const { notes, setNotes } = useContext(NoteContext);

  useEffect(() => {
    if (!notes.length) return;

    changeClassOfLastNote();

    const { id } = notes[0];
    const timer = setTimeout(() => {
      deleteNote(id);
    }, 2000);
    
    return () => {
      clearTimeout(timer);
    }
  }, [notes]);

  function changeClassOfLastNote() {
    const lastNote = notes.at(-1);

    if (lastNote.showen) {
      return
    }

    const newLastNote = { ...lastNote, showen: true };
    const newNotes = notes.map(note => {
      if (note.id == lastNote.id) {
        return newLastNote
      }
      return note;
    });
    setNotes(newNotes);
  }

  function addNote(note) {
    setNotes([...notes, note]);
  }

  function deleteNote(id) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  function showNote(name, message) {
    const id = Math.random();
    const note = { name, message, id, showen: false };
    addNote(note);
  }

  return { showNote }
}

const NoteStoreProvider = ({ children }) => {

  // const [showNote, _setShowNote] = useState(false);
  // const [name, setName] = useState('');
  // const [message, setMessage] = useState('');
  
  // function setShowNote(name, message) {
  //   setName(name);
  //   setMessage(message);
  //   _setShowNote(true);
  //   setTimeout(() => {
  //     _setShowNote(false)
  //   }, 3000);
  // }

  const [notes, setNotes] = useState([]);

  // function addNote(note) {
  //   console.log([...notes, note]);
  //   setNotes([...notes, note]);
  // }

  // function deleteNote(id) {
  //   const newNotes = notes.filter((note) => note.id !== id);
  //   setNotes(newNotes);
  // }

  // function showNote(name, message) {
  //   const id = Math.random();
  //   const note = { name, message, id };
  //   addNote(note);
  //   setTimeout(() => {
  //     deleteNote(id);
  //   }, 3000);
  // }

  return (
    <NoteContext.Provider value={{
      // showNote,
      // setShowNote,
      // name,
      // setName,
      // message, 
      // setMessage
      notes,
      setNotes,
    }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export default NoteStoreProvider;
