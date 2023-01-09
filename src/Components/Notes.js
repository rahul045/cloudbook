import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext'
import Addnote from './Addnote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNote, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('tokens')) { console.log(localStorage.getItem('tokens')); getNote(); }
        else {
            console.log('ghjgh');
            navigate("/login");
        }
        // eslint-disable-next-line 
    }, [])
    const onChange = (e) => {
        setNote({
            ...note, [e.target.name]: e.target.value
        });
    }
    const refClose = useRef(null);
    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        // editNote(note.etitle, note.edescription, note.etag);
    }
    const ref = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    return (
        <>
            <Addnote />

            <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: "none" }}>
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" name="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" name="etitle" id="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" name="edescription" className="form-label" >Description</label>
                                    <input type="text" name="edescription" className="form-control" id="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" name="etag" htmlFor="etag">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 3 || note.edescription.length < 5} onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2 >Your Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {
                    notes.map((note, index) => {
                        return <Noteitem key={index} note={note} updateNote={updateNote} />
                    })
                }
            </div>
        </>
    )
}

export default Notes
