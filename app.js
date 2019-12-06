const express = require('express');
const app = express();
const sqlInstance = require('mssql');
const url = require('url');

const port = 3000;

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configuration for database
const configDB = {
    user: 'sa',
    password: 'DataBaseExam2019',
    server: 'localhost',
    database: 'DataBaseExam2019'
};

app.get('/products', function (req, res) {
    sqlInstance.connect(configDB, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sqlInstance.Request();
        // query to the database and get the products
        request.query('SELECT * FROM TProduct', function (err, products) {
            if (err) console.log(err)
            // send records as a response
            console.log(products);
            res.status(200).json({
                products: products
            });
        }); 
    })
});

app.get('/product', function (req, res) {
    const id = req.query.id;
    sql_stmt = "SELECT * FROM TProduct WHERE nProductId = " + id;
    sqlInstance.connect(configDB, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sqlInstance.Request();
        // query to the database and get the products
        request.query(sql_stmt, function (err, product) {
            if (err) console.log(err)
            // send records as a response
            console.log(product);
            res.status(200).json({
                product: product
            });
        }); 
    })
});



app.get('', function (req, res) {
    res.sendFile(__dirname + '/public/index/index.html');
});

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/public/login/login.html');
});

app.get('/register', function (req, res) {
    res.sendFile(__dirname + '/public/register/register.html');
});







app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`))