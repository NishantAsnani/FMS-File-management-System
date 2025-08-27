const express = require('express');
const router = express.Router();
const User = require('../models/userSchema')
const auth = require('../middleware')
const PDF = require("../models/pdfSchema")
require('dotenv').config()


router.get('/show', auth, async (req, res) => {
    const user = await req.user.populate('pdf');
    const data = user.pdf
    res.status(200).send({ data,Firstname:req.user.Firstname })
})


router.post('/giveAccess', auth, async (req, res) => {
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
        res.status(200).send({ message: "Access rights given sucessfully" })
    }
})

router.post('/delete', auth, async (req, res) => {
    const pdf = req.body.pdf;

    if (pdf.authorId != req.user._id) {
        return res.status(403).send({ message: "Cannot delete, you are not the author" });
    }

    try {
        const deletedPDF = await PDF.findByIdAndDelete(pdf._id);
        if (!deletedPDF) {
            return res.status(404).send({ message: "PDF not found" });
        }
        res.status(200).send({ message: "PDF deleted successfully" });
    } catch (error) {
        console.error("Error deleting PDF:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

module.exports = router;