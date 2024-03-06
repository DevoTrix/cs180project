require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ref } = require("yup");
const { pullData, pullSpecData } = require("./helper/pullData");
//end of imports
//setting up apps
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require("mysql2");

app.post("/api/search", async (req, res) => {
  const { spec, quarter } = req.body;
  var conn = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.host,
    port: process.env.dbPort,
    user: process.env.user,
    password: process.env.pswd,
    database: process.env.dbName,
  });
  if (!spec) {
    try {
      const data = await pullData(quarter);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).send({ message: "Failed" });
    }
  } else {
    try {
      // console.log("hello");
      // res.status(200).send({ message: "Success" });
      const data = await pullSpecData(conn, spec, quarter);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).send({ message: "Failed" });
    }
  }
});
//final
app.listen(5001, async () => {
  console.log("Server Running on http://localhost:5001");
});
