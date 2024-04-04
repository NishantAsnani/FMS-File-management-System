const express = require('express');
const router = express.Router();
const User = require('../models/userSchema')
const JWT = require('jsonwebtoken')
const pdf = require('../models/pdfSchema')
const bcrypt = require('bcrypt')
const multer = require("multer");
const { storage, cloudinary } = require('../Cloudinary')
const auth=require('../middleware')
const upload = multer({ storage })
require('dotenv').config()


router.post("/Signup", async (req, res) => {
  const Duplicate = await User.findOne({ email: req.body.email });
  if (Duplicate) {
    console.log("User already exists");
    return res.status(409).json({ msg: "User already exists" });
  }

  else {
    const user = new User({
      ...req.body,
    });
    await user.save()
      .then(() => {
        console.log("User added ");
        res.status(200).send({ message: "User created sucessfully" })
      })
      .catch((e) => {
        console.log("Error adding a User ", e);
        res.status(500).send({ message: e.message })
      });
    return;
  }
});



router.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ msg: "Data not found" });
    return;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    const token = await user.generateAuthToken()
    res.status(200).send({ token })
  }
  else {
    res.status(500).json({ msg: "Cannot login into the app" });
    return;
  }
});

router.post("/Logout",auth,async (req, res) => {
  try {
      req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({ message: "Sucessfully logged out " });
  } catch (e) {
    res.send({ message: "error" });
  }
});

router.post('/upload/file',auth,upload.single('file'), async (req, res) => {
  try {
    const user=req.user
    const file = await cloudinary.uploader.upload(req.file.path, {
      pages: true,
      resource_type: 'auto',
      public_id: req.file.originalname
    });


    const PDF = new pdf({
      name: file.public_id,
      size: file.bytes,
      url: file.secure_url,
      authorId: user.id,
      authorName: user.Firstname
    })
    await PDF.save()


    user.pdf.push(PDF)
    await user.save();

    res.status(201).send({
      message: "File uploaded successfully",
      pdf: PDF
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: "File did not get uploaded successfully"
    });
  }
});




module.exports = router;