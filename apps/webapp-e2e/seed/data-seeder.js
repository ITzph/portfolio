const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const process = require('process');
require('dotenv').config();

const connection = mysql.createConnection({
  multipleStatements: true,
  host: process.env.PORTFOLIO_DB_HOST,
  user: process.env.PORTFOLIO_DB_USERNAME,
  password: process.env.PORTFOLIO_DB_PASSWORD,
  port: process.env.PORTFOLIO_DB_PORT,
});

connection.connect(async (err) => {
  if (err) throw err;
  const users = fs.readFileSync(path.join(__dirname, './seeder.sql')).toString();

  const query = await connection.query(users, (err, result) => {
    if (err) {
      console.error(err);
    }
  });
  process.exit();
});
