
const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

//Route:1 Fetch all notes using: GET "api/notes/fetchallnotes" . Login required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})

//Route:2 Add a new note using: POST "api/notes/addnote" . Login required.
router.post('/addnote', fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', "Enter description of length at least 5").isLength({ min: 5 })], async (req, res) => {

        //If there are errors return Bad requests and errors
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, description, tag } = req.body;
            const note = new Note({
                title, description, tag, user: req.user.id
            })

            const savenote = await note.save();
            res.json(savenote);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }

    })

//Route:3 Update a note using: PUT "api/notes/updatenote/:id" . Login required.
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    //If there are errors return Bad requests and errors
    try {

        const { title, description, tag } = req.body;
        // Create a new note object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tile = tag }
        //Find a note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")

        }
        //Allowed updation only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})

//Route:4 Delete a note using: DELETE "api/notes/deletenote/:id" . Login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    //If there are errors return Bad requests and errors
    try {
        //Find a note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")

        }
        //Allowed deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})


module.exports = router;