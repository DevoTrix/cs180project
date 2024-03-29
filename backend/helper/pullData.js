require("dotenv").config();
const mysql = require("mysql2");

// gets everything
async function pullData(conn, quarter) {
  var query = "SELECT * FROM Class WHERE term = ?";
  var values = ['202420'];
  var data;
  await conn
    .promise()
    .query(query, values)
    .then(([rows, fields]) => {
      data = JSON.stringify(rows);
    })
    .catch((err) => {
      console.error(err);
    });

  return data;
}

// searches
async function pullSpecData(conn, specification, quarter) {
  var query = "";
  const coursenumRegexPattern =/^([a-zA-Z]+)([a-zA-Z]?)([a-zA-Z]?)([0-9]{3})([a-cA-C]?)$/;
  let quart = '202420';
  const match = specification.match(coursenumRegexPattern);
  let values;
  if(match){
    const num = specification.substring(match[1].length, specification.length);
    query ="SELECT * FROM Class WHERE subject = ? AND coursenum = ? AND term = ?";
    values = [match[1], num, quart]
  }else{
    var cntns = '%' + specification + '%';
    query ="SELECT * FROM Class WHERE courseName LIKE ? AND term = ?";

    values = [cntns, quart]
  }

  // conn.connect();
  let data;
  await conn
    .promise()
    .query(query,values)
    .then(([rows, fields]) => {
      data = JSON.stringify(rows);
    })
    .catch((err) => {
      console.error(err);
    });
  // conn.end();
  return data;
}

module.exports = { pullData, pullSpecData };
