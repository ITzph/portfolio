const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const process = require('process');

const connection = mysql.createConnection({
  multipleStatements: true,
  host: 'localhost',
  user: 'root',
  password: 'carlogino',
  port: 3306,
});

connection.connect(async (err) => {
  if (err) throw err;
  const users = fs.readFileSync(path.join(__dirname, './seeder.sql')).toString();

  const query = await connection.query(users, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  process.exit();
});
