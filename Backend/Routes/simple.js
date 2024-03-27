const express = require('express');
const router = express.Router();
const User = require('../models/userSchema')
const JWT = require('jsonwebtoken')
const pdf = require('../models/pdfSchema')
const bcrypt = require('bcrypt')
const multer = require("multer");
const { storage, cloudinary } = require('../Cloudinary')
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
    res.status(200).send({ token})
  }
  else {
    res.status(500).json({ msg: "Cannot login into the app" });
    return;
  }
});

router.post('/upload/file', upload.single('file'), async (req, res) => {
  try {
    const token=req.body.token;
    const user=JWT.verify(token,process.env.SECRET_KEY)
    const file = await cloudinary.uploader.upload(req.file.path, {
      pages: true,
      resource_type: 'auto',
      public_id: req.file.originalname
    });
    console.log(user)
    const PDF = new pdf({
      name: file.public_id,
      size: file.bytes,
      url:file.secure_url,
      authorId:user.id,
      authorName:user.FirstName
    })
    await PDF.save()
    res.status(201).send({
      message: "File uploaded successfully",
      data: file.secure_url,
      size: file.bytes,
      name: file.public_id,
      pdf:PDF
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: "File did not get uploaded successfully"
    });
  }
});

router.post('/Logout',(req,res)=>{

})


module.exports = router;