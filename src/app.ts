import express from "express";
var app = express();
import mysql, { MysqlError } from "mysql";
import bodyparser from 'body-parser';
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());
const saltRounds = 10;
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASS,
    database: 'demo',
    multipleStatements: true
});

mysqlConnection.connect((err: MysqlError) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(process.env.PORT, () => console.log('Express server is runnig at port no : 3000'));

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
    let age = req.body.age;
    let password = req.body.password;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        let sql = `INSERT INTO users (name , age , password ) VALUES ('${name}', '${age}', '${hash}')`;
         mysqlConnection.query(sql, (err, rows) => {
        if (!err)
            res.json('them thanh cong');
        else
            console.log(err);
    })
    });
    
});

app.put('/updateuser/:userid', (req: any, res: any) => {
    let name = req.body.name;
    let age = req.body.age;
    let sql = `UPDATE users SET name = '${name}', age = '${age}' WHERE UserId = ${req.params.userid}`;
    mysqlConnection.query(sql, (err, rows) => {
        if (!err)
            res.json('sua thanh cong');
        else
            console.log(err);
    })
});

app.delete('/deleteuser/:userid', (req:any, res:any) => {
    mysqlConnection.query(`DELETE FROM users WHERE UserId = ${req.params.userid}`, (err, rows) => {
        if (!err)
            res.json('xoa thanh cong');
        else
            console.log(err);
    });
});






