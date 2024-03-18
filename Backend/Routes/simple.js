const express=require('express');
const router=express.Router();
const User=require('../models/userSchema')
const JWT=require('jsonwebtoken')
const pdf=require('../models/pdfSchema')
const auth=require('../middleware/auth')
const bodyParser=require('body-parser')
const bcrypt=require('bcrypt')
const multer = require("multer");
const {storage,cloudinary}=require('../Cloudinary')
const upload=multer({storage})


router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }))

router.post("/Signup", async (req, res) => {
    const Duplicate = await User.findOne({email:req.body.email});
    if (Duplicate) {
      console.log("User already exists");
      return res.status(400).json({ msg: "User already exists" });
    } 
  
    else {
      const user = new User({
        ...req.body,
      });
      await user.save()
        .then(() => {
          console.log("User added ");
          res.status(200).send({message:"User created sucessfully"})
        })
        .catch((e) => {
          console.log("Error adding a User ", e);
          res.status(500).send({message:e.message})
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
  
    const validPassword = await bcrypt.compare(password,user.password );
    if (validPassword) {
        const payload={
            id:User.id,
            email:User.email
        }
      const token=JWT.sign(payload,process.env.SECRET_KEY)
      res.status(200).send({msg:token})
      // res.setHeader('authorization',token)
    } else {
      res.status(500).json({ msg: "Invalid Username or password" });
      return;
    }
  });


  router.post('/upload/file',upload.single('file'),async (req,res)=>{
    try{
        console.log(req.body.file)
        const file=await cloudinary.uploader.upload(req.file.path,
        {
        pages:true,
        resource_type:'auto'})
        console.log(file)
        res.status(201).send({
            message:"File uploaded sucessfully",
            data:file.secure_url
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            message:"File  did not get uploaded sucessfully"
        })   
    }
})









module.exports=router;