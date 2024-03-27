const express = require('express');
const router = express.Router();
const pdf = require('../models/pdfSchema')
require('dotenv').config()


router.get('/show', async (req, res) => {
    const data = await pdf.find({})
    res.status(200).send({ data })
})


module.exports = router;