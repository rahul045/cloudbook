import NoteContext from './NoteContext';
import { useState, useContext } from 'react';
import AlertContext from '../Alertcontext';


const NoteState = (props) => {
    const notesinitial = [];
    const context = useContext(AlertContext);
    const { showAlert } = context;
    const [notes, setnotes] = useState(notesinitial);
    const host = "http://localhost:5000"
    // Get all note
    const getNote = async () => {
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('tokens')
            },

        });
        // console.log(localStorage.getItem('tokens'))
        const json = await response.json();

        setnotes(json);

    }


    // Add a note
    const addNote = async (title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('tokens')
            },

            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setnotes(notes.concat(note))
        showAlert("Note has been added successfully", "success");

    }
    //Delete a note
    const deleteNote = async (id) => {

        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('tokens')
            },


        });
        const json = response.json();


        const newNotes = notes.filter((note) => {
            return note._id !== id;
        })
        setnotes(newNotes);
        showAlert("Note has been deleteed successfully", "success");

    }
    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('tokens')
            },

            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));
        //Lgic to edit client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setnotes(newNotes);
        showAlert("Note has been updated successfully", "success");
    }

    return (
        <NoteContext.Provider value={{ notes, getNote, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;