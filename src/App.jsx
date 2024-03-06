import { useState, useEffect } from "react";
import Note from "./Note";
import noteService from "./noteservice";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [showAllNotes, setShowAllNotes] = useState(true);

  useEffect(() => {
    async function main() {
      const notes = await noteService.getAll();
      setNotes(notes);
    }
    main();
  }, []);

  const addNote = async (event) => {
    event.preventDefault();
    const newNote = {
      content: input,
      important: Math.random() > 0.5,
    };
    const savedNote = await noteService.create(newNote);
    if (savedNote) {
      setNotes([...notes, savedNote]);
    }
    setInput("");
  };

  const addInput = (event) => setInput(event.target.value);

  const deleteNote = async (id) => {
    const deletedNote = await noteService.remove(id);
    if (deletedNote) {
      setNotes(notes.filter((note) => note.id !== deleted.id));
    }
  };

  const toggleImportance = async (id) => {
    const note = notes.find((note) => note.id === id);
    const toggledNote = { ...note, important: !note.important };
    const updatedNote = await noteService.change(id, toggledNote);
    if (updatedNote) {
      setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)));
    }
  };

  const notesToShow = showAllNotes
    ? notes // all
    : notes.filter((note) => note.important); // or only important

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAllNotes(!showAllNotes)}>
        Show {showAllNotes ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            toggleImportance={toggleImportance}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input id="input" type="text" value={input} onChange={addInput} />
        <input type="submit" value="spara" />
      </form>
    </div>
  );
};

export default App;
