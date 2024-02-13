require('dotenv').config();
const mysql = require("mysql2");


// gets everything
async function pullData(){
    var query = "SELECT * FROM Classes";
    var conn = mysql.createConnection({
        connectionLimit: 10,
        host: process.env.host,
        port: process.env.dbPort,
        user: process.env.user,
        password: process.env.password,
        database: process.env.dbName
    })
    var data;
    await conn.promise().query(query)
        .then(([rows, fields]) => {
            data = JSON.stringify(rows);
        })    
        .catch((err) => {
            console.error(err);
         });

    return data;
}

// searches
async function pullSpecData(specification){
    var query = "";
    const coursenumRegexPattern = "[a-zA-Z][a-zA-Z]([a-zA-Z]?)[0-9][0-9][0-9][a-cA-C]?";
    // if match 
    if(coursenumRegexPattern.test(specification)){
        query = "SELECT * FROM Classes WHERE courseNum = ?"
    }
    else{
        query = "SELECT * FROM Classes WHERE courseName LIKE '%' ||  ? || '%'"
    }

    var values = [specification];
    var conn = mysql.createConnection({
        connectionLimit: 10,
        host: process.env.host,
        port: process.env.dbPort,
        user: process.env.user,
        password: process.env.password,
        database: process.env.dbName
    })
    var data;
    await conn.promise().query(query, values)
        .then(([rows, fields]) => {
            data = JSON.stringify(rows);
        })    
        .catch((err) => {
            console.error(err);
         });

    return data;
}


module.exports = {pullData, pullSpecData };