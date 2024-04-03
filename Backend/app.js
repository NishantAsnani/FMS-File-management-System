const express = require("express");
const app = express();
const path = require("path");
const simpleRoutes = require('./Routes/simple');
const mongoose = require('mongoose');
const uri = process.env.URI
const cors = require('cors')
const bodyParser = require('body-parser')
const pdfRoutes=require('./Routes/pdf')


app.use(bodyParser.json({ limit: "50mb", extended: false }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.static(path.join(__dirname, "./public")));
app.use('/', simpleRoutes); //simple route handler
app.use('/pdf',pdfRoutes)  //pdf Routes handler





mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log("Oh no error ", err)
  })



app.listen(3001, () => {
  console.log("Listening to port 3001");
});
