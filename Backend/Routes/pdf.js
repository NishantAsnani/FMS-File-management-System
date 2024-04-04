const express = require('express');
const router = express.Router();
const pdf = require('../models/pdfSchema')
const User = require('../models/userSchema')
const JWT = require('jsonwebtoken')
require('dotenv').config()


router.get('/show', async (req, res) => {
    const token = req.headers.authorization;
    const loggedinUser = JWT.verify(token, process.env.SECRET_KEY)
    const user = await User.findById(loggedinUser.id).populate('pdf');

    const data = user.pdf
    res.status(200).send({ data })
})


module.exports = router;