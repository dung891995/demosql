var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dung891995',
    database: 'demo'
});
db.connect(function (err) {
    if (err)
        throw err;
    console.log('Connected!');
});
// db.query('SELECT * FROM users', (err: any,rows: any) => {
//     if(err) throw err;
//     console.log('Data received from Db:');
//     console.log(rows);
//   });
