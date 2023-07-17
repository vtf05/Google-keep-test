import "./App.css";

import React, { useEffect, useRef, useState } from "react";
import { addNote, deleteNote, pinNote } from "./redux/noteSlice";
import { useDispatch, useSelector } from "react-redux";

import { BsFillPinFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { RootState } from "./redux/store";

interface Note {
  id: number;
  title: string;
  content: string;
  pin : boolean
}

const App: React.FC = () => {
  const {notes} = useSelector((state:RootState) => state.counter);
  const [isInputExpanded, setInputExpanded] = useState<Boolean>(false);
  const [newNote, setNewNote] = useState<Note>({
    id: 0,
    title: "",
    content: "",
    pin:false,
  });
  const addNoteRef = useRef<HTMLDivElement | null>(null);
  const  dispatch = useDispatch()



  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };
  
  
  
  const handleAddNote = () => {
    if (newNote.title.trim() !== "" || newNote.content.trim() !== "") {
      dispatch(addNote({ ...newNote, id: Date.now().toLocaleString() }));
      setNewNote({
        id: 0,
        title: "",
        content: "",
        pin :false 
      });
    }
    setInputExpanded(false);
    
  };
  console.log("notes",notes)
  return (
    
    <div className="app-container-2">
      {/* Top bar with logo and search */}
      <div className="top-bar">
        <div className="logo">Google Keep</div>
        <input
          type="text"
          className="search-input"
          placeholder="Search notes..."
        />
      </div>

      <div className="main-content">
        {/* Side Navigation */}
        <div className="side-nav">
          <div className="nav-item">Notes</div>
          <div className="nav-item">Reminders</div>
          <div className="nav-item">Labels</div>
          <div className="nav-item">Archive</div>
        </div>

        {/* Add Note Section */}
        <div className=".new">
        <div  className={`add-note ${isInputExpanded ? "expanded" : ""}`}>
          {isInputExpanded ? (
            <>
              <input
                type="text"
                name="title"
                placeholder="Title.."
                className="note-title-input"
                value={newNote.title}
                onChange={handleInputChange}
                autoFocus
              />

            <div className="note-content-input-wrapper">
              <textarea
                name="content"
                className="note-content-input"
                placeholder="Take a note..."
                value={newNote.content}
                onChange={handleInputChange}
              />
              <button className="custom-button" onClick={handleAddNote}>
                close
              </button>
            </div>
            

            </>
          ) : (
            <div
              className="note-input-placeholder"
              onClick={() => setInputExpanded(true)}
            >
              Add Note...
            </div>
          )}
        </div>
        {/* Notes Content */}
        { notes.filter((note) => note.pin).length>0?( <div className="note-heading">PINNED <BsFillPinFill size={12} color="black"/> </div>):(null)} 
        <div className="app-container" onClick={()=>{setInputExpanded(false)}}>
        {notes
            .filter((note) => note.pin)
            .map((note) => (
              <div key={note.id} className="note">
  
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <BsFillPinFill
                  size={18}
                  color="black"
                  className="icon"
                  onClick={()=>{dispatch(pinNote(note.id))}}
                />
                <MdDelete size={18} color="black"  className="delete-icon" onClick={() => dispatch(deleteNote(note.id))}/>

              </div>
            ))}
            </div>
        <div className="notes-container" onClick={()=>{setInputExpanded(false)}}>
          { notes.length>0?( <div className="note-heading" >OTHERS</div>):(null)}
          <div className="app-container">
            {notes.filter((note) => !note.pin).map((note) => (
              <div key={note.id}  className="note">
               
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <BsFillPinFill size={18} color="black"  className="icon" onClick={()=>{dispatch(pinNote(note.id))}}/>
                <MdDelete size={18} color="black" className="delete-icon"  onClick={() => dispatch(deleteNote(note.id))}/>

              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default App;
