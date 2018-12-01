const mariadb = require('mariadb');
const fs = require('fs');
const path = require("path");
const credentials = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../tokens/dbCredentials.json'), "utf8"));
const script = fs.readFileSync(path.resolve(__dirname, "./schema.sql"),"utf8");



const pool = mariadb.createPool({
    host: credentials.host,
    port: credentials.port,
    user: credentials.user,
    //database: credentials.database,
    password: credentials.password
});

let queries = script.split(';');

pool.getConnection().then(c => {
  for (let query of queries) {
    console.log(query);
    c.query(query).then(rows => {
      console.log("successful");
    }).catch(err => {
      console.log(err);
    });
  }
});


