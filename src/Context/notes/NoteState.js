import NoteContext from './NoteContext';
import { useState } from 'react';
const NoteState = (props) => {
    const notesinitial = [
        {
            "_id": "63b3db7acfda6fb0a00e6a24",
            "user": "63b2b4b188b37f25d86ddfaa",
            "title": "Maths Test",
            "description": "Test is on tuesday",
            "tag": "important",
            "date": "2023-01-03T07:38:34.015Z",
            "__v": 0
        },
        {
            "_id": "63b5342d2562742cbe5c4489",
            "user": "63b2b4b188b37f25d86ddfaa",
            "title": "Eng Test",
            "description": "Test is on monday",
            "tag": "important",
            "date": "2023-01-04T08:09:17.126Z",
            "__v": 0
        },
        {
            "_id": "63b5342f2562742cbe5c448b",
            "user": "63b2b4b188b37f25d86ddfaa",
            "title": "Eng Test",
            "description": "Test is on monday",
            "tag": "important",
            "date": "2023-01-04T08:09:19.503Z",
            "__v": 0
        },
        {
            "_id": "63b534302562742cbe5c448d",
            "user": "63b2b4b188b37f25d86ddfaa",
            "title": "Eng Test",
            "description": "Test is on monday",
            "tag": "important",
            "date": "2023-01-04T08:09:20.118Z",
            "__v": 0
        }
    ]

    const [notes, setnotes] = useState(notesinitial);


    return (
        <NoteContext.Provider value={{ notes, setnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;