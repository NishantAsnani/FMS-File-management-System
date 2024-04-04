const express = require('express');
const router = express.Router();
const pdf = require('../models/pdfSchema')
const User = require('../models/userSchema')
const JWT = require('jsonwebtoken')
const auth = require('../middleware')
require('dotenv').config()


router.get('/show', auth, async (req, res) => {
    const user = await req.user.populate('pdf');
    const data = user.pdf
    res.status(200).send({ data })
})


router.post('/giveAccess',auth, async (req, res) => {
    const email = req.body.email
    const pdf = req.body.pdf
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404).send({ message: "No such user exists" })
    }
    else if (pdf.authorId == user.id) {
        res.status(403).send({ message: "Cannot give rights to self" })
    }
    else {
        user.pdf.push(pdf)
        await user.save();
        res.status(200).send({message:"Access rights given sucessfully"})
    }
})

module.exports = router;