require('dotenv').config();


const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const { ref } = require('yup');
const {pullData, pullSpecData} = require('./helper/pullData');
//end of imports
//setting up apps
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql2');

app.post('/api/search', async (req, res)=>{
    const {spec, quarter} = req.body;
    if(!spec){
        try{
            const data = await pullData(quarter);
            res.status(200).json(data);
        }
        catch(error){
            res.status(404).send({message:"Failed"});
        }
    }
    else{
        try{
            const data = await pullSpecData(spec, quarter);
            res.status(200).json(data);
        }
        catch(error){
            res.status(404).send({message:"Failed"});
        }
    }

})
//final
app.listen(5000, async ()=>{
    console.log("Server Running on http://localhost:5000")
})