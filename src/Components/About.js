import React, { useContext, useEffect } from 'react'
import NoteContext from '../Context/notes/NoteContext'
const About = () => {
    const a = useContext(NoteContext);

    return (
        <div>
            <h1>ABOUT IS ABOUT</h1>
        </div>
    )
}

export default About
