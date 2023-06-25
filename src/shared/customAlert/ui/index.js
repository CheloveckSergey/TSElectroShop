import React, { useContext } from 'react';
import NoteStoreProvider, { NoteContext } from '../model/store';
import './styles.scss';

export const CustomAlert = () => {

  const { notes } = useContext(NoteContext);

  return (
    <div className='alert-container'>
      {notes.map((note, index) => 
        <div className={`alert-panel ${note.showen ? 'showen' : ''}`} key={index}>
          <h3>{note.name}</h3>
          <h4>{note.message}</h4>
        </div>
      )}
    </div>
  )
}


export const NoteProvider = ({ children }) => {

  return (
    <NoteStoreProvider>
      <CustomAlert />
      {children}
    </NoteStoreProvider>
  );
}
