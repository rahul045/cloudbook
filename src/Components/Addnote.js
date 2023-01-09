import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext'
const Addnote = () => {
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const context = useContext(NoteContext);
    const { addNote } = context;
    const Add_note = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }
    const onChange = (e) => {
        setNote({
            ...note, [e.target.name]: e.target.value
        });
    }
    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" name="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" id="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} required minLength={3} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" name="description" className="form-label" >Description</label>
                    <input type="text" name="description" className="form-control" id="description"
                        value={note.description} onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label className="form-label" name="tag" htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button type="submit" disabled={note.title.length < 3 || note.description.length < 5} className="btn btn-primary" onClick={Add_note}>Add note</button>
            </form>

        </div>

    )
}

export default Addnote
