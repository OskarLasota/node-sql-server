const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
require('dotenv').config();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products';

//this should be hidden
const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});

connection.connect(err => {
    if(err){
        console.log("connection error");
        console.log(process.env.host);
        return err;
    }else{
        console.log("connection success");
    }
});
console.log(connection);

app.use(cors());

app.get('/', (req, res) => {
    res.send("to go /products to see products")
});

app.get('/products/add', (req,res) =>{
    const { name, price } = req.query;
    const INSERT_PRODUCTS_QUERY = `INSERT INTO products(name, price) VALUES ("${name}", "${price}")`;
    connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
        if(err){
            return res.send(err)
        }else{
            return res.send('successfully added product');
        }
    });
});


app.get('/products', (req,res) => {
    connection.query(SELECT_ALL_PRODUCTS_QUERY, (err,results) => {
        if(err){
            return res.send(err);
        }else{
            return res.json({
                data: results
            })
        }
    })
});

app.listen(4000, () => {
    console.log('products server listening on port 4000')
});