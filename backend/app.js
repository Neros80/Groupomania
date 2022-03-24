// const express = require ('express');

// const app = express();
// const mysql = require ('mysql')

// const connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'Rap80@fh62'
//   });
 
//   const cors = require('cors');
//   const corsOption = {
//     origin:'*',
//     credential: true,
//     optionSuccesStatus: 200,
//     exposeHeaders:[
//       'Content-Disposition'
//     ]
//   };
//   app.use(cors(corsOption))
//   app.use((req, res, next) => {
//     // res.setHeader('Access-Control-Allow-Origin', '*');
//     // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
//   });
  
//   connection.connect();

//   connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) throw err;
//     console.log('The solution is: ', rows[0].solution);
//   });
  
//   connection.end();
