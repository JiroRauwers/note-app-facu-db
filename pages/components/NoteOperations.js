import { useState, useEffect } from 'react';
import { app, database } from '../../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const dbInstance = collection(database, 'notes');
export default function NoteOperations({ getSingleNote }) {
    const [isInputVisible, setInputVisible] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDesc, setNoteDesc] = useState('');
    const [notesArray, setNotesArray] = useState([]);
    const inputToggle = () => {
        setInputVisible(!isInputVisible)
    }

    const addDesc = (value) => {
        setNoteDesc(value)
    }

    const saveNote = () => {
        addDoc(dbInstance, {
            noteTitle: noteTitle,
            noteDesc: noteDesc
        })
            .then(() => {
                setNoteTitle('')
                setNoteDesc('')
                getNotes();
            })
    }

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setNotesArray(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }));
            })
    }

    useEffect(() => {
        getNotes();
    }, [])
    return (
        <>
            <div className={`container containerBtn`}>
                <button
                    onClick={inputToggle}
                    className={`btn`}>
                    Add a New Note
                </button>
            </div>

            {isInputVisible ? (
                <div className={`container container-Input`}>
                    <input
                        className={`input`}
                        placeholder='Enter the Title..'
                        onChange={(e) => setNoteTitle(e.target.value)}
                        value={noteTitle}
                    />
                    <div className={`reactQuill`}>
                        <ReactQuill
                            onChange={addDesc}
                            value={noteDesc}
                        />
                    </div>
                    <button
                        onClick={saveNote}
                        className={`btn save`}>
                        Save Note
                    </button>
                </div>
            ) : (
                <></>
            )}

            <div className={`display-note`}>
                {notesArray.map((note, id) => {
                    return (
                        <div key={note.id}
                            className={`innerNote`}
                            onClick={() => getSingleNote(note.id)}>
                            <h4>{note.noteTitle}</h4>
                        </div>
                    )
                })}
            </div>
        </>
    )
}