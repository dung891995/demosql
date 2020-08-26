import mysql, { MysqlError } from 'mysql'
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dung891995',
    database: 'demo',
    multipleStatements: true
});

mysqlConnection.connect((err: MysqlError) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));

app.get('/user', (req: any, res: any) => {
    mysqlConnection.query('SELECT * FROM users', (err, rows) => {
        if (!err)
            res.json(rows);
        else
            console.log(err);
    })
});

app.get('/postofuser/:userid', (req: any, res: any) => {
var userId = req.params.userid;
let sql = 'SELECT users.UserId,users.name, post.PostId, post.Title, post.Content FROM users  INNER JOIN post ON users.UserId =' + userId;
    mysqlConnection.query(sql, (err, rows) => {
        if (!err)
        res.json(rows);
    else
        console.log(err);
})
});
app.post('/createuser/', (req: any, res: any) => {
    let name = req.body.name;
    let age = req.body.age
    let sql = 'INSERT INTO users (name , age ) VALUES (' + name + ', ' + age + ')'
        mysqlConnection.query(sql, (err, rows) => {
            if (!err)
            res.json(rows);
        else
            console.log(err);
    })
    });





