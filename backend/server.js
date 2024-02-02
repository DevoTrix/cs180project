require('dotenv').config();


const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const { ref } = require('yup');
//end of imports
//setting up apps
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql2');


//final
app.listen(5000, async ()=>{
    console.log("Server Running on http://localhost:5000")
})