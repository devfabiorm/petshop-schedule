import mysql from 'mysql';

const conection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'admin',
  database: 'petshop-schedule'
});

export default conection;