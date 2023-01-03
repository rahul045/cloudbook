const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { findOne } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "CloudBookbuildbyRk";
const fetchuser = require('../middleware/fetchuser')
//Route:1  Create a user using:POST "/api/auth/createuser". No login required

router.post('/createuser',
    [body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', "Enter valid email").isEmail(),
    body('password', "Enter password of length at least 5").isLength({ min: 5 })],
    async (req, res) => {
        //If there are errors return Bad requests and errors

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Check whether the user with same email exists already
        try {

            let user = await User.findOne({ email: req.body.email });
            if (user) { return res.status(400).json({ error: "Sorry with this email exists already" }) }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user:
                    { id: user.id }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            // console.log(token);
            res.json({ authtoken });
            // res.json(user);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    })

//Roue:2  Login a user using:POST "/api/auth/login".

router.post('/login',
    [
        body('email', "Enter valid email").isEmail(),
        body('password', "Password cannot be blank").exists()],
    async (req, res) => {
        //If there are errors return Bad requests and errors

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ error: "Invalid Credentials" });
            }
            const passcomp = await bcrypt.compare(password, user.password);
            if (!passcomp) {
                return res.status(400).json({ error: "Invalid Credentials" });
            }
            const data = {
                user:
                    { id: user.id }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    })

//Route:3 Get loggedin User details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,
    async (req, res) => {
        try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    })
module.exports = router;