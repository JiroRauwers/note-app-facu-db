import { useState, useEffect } from 'react'
import { app, database } from '../../firebaseConfig';
import {
    doc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    deleteDoc
} from 'firebase/firestore'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const dbInstance = collection(database, 'notes');

export default function NoteDetails({ ID }) {
    const [singleNote, setSingleNote] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDesc, setNoteDesc] = useState('');
    const getSingleNote = async () => {
        if (ID) {
            const singleNote = doc(database, 'notes', ID)
            const data = await getDoc(singleNote)
            setSingleNote({ ...data.data(), id: data.id })
        }
    }

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setSingleNote(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                })[0]);
            })
    }

    const getEditData = () => {
        setIsEdit(true);
        setNoteTitle(singleNote?.noteTitle);
        setNoteDesc(singleNote?.noteDesc)
    }

    useEffect(() => {
        getNotes();
    }, [])

    useEffect(() => {
        getSingleNote();
    }, [ID])

    const editNote = (id) => {
        const collectionById = doc(database, 'notes', id)

        updateDoc(collectionById, {
            noteTitle: noteTitle,
            noteDesc: noteDesc,
        })
            .then(() => {
                window.location.reload()
            })
    }

    const deleteNote = (id) => {
        const collectionById = doc(database, 'notes', id)

        deleteDoc(collectionById)
            .then(() => {
                window.location.reload()
            })
    }
    return (
        <>
            <div>
                <button
                    className={`btn  edit`}
                    onClick={getEditData}
                >Edit
                </button>
                <button
                    className={`btn delete`}
                    onClick={() => deleteNote(singleNote.id)}
                >Delete
                </button>
            </div>
            {isEdit ? (
                <div className={`inputContainer`}>
                    <input
                        className={'input'}
                        placeholder='Enter the Title..'
                        onChange={(e) => setNoteTitle(e.target.value)}
                        value={noteTitle}
                    />
                    <div className={`reactQuill`}>
                        <ReactQuill
                            onChange={setNoteDesc}
                            value={noteDesc}
                        />
                    </div>
                    <button
                        onClick={() => editNote(singleNote.id)}
                        className={'btn save'}>
                        Update Note
                    </button>
                </div>
            ) : (
                <></>
            )}
            {singleNote && 
                <>    
                    <h2>{ singleNote.noteTitle }</h2>
                    <div dangerouslySetInnerHTML={{ __html: singleNote.noteDesc }}></div>
                </>
            }
        </>
    )
}