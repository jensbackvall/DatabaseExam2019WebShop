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

// This endpoint fetches all products from the database, ordering them by price ascending
app.get('/products', function (req, res) {
    sqlInstance.connect(configDB, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sqlInstance.Request();
        // query to the database and get the products
        request.query('SELECT * FROM TProduct ORDER BY nUnitPrice', function (err, products) {
            if (err) console.log(err)
            // send records as a response
            console.log(products);
            res.status(200).json({
                products: products
            });
        }); 
    })
});

// This endpoint fetches a single product from the database based on the products id
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

// TODO: This endpoint fetches all products from the database, based on a given search word or string, ordering them by price ascending
app.get('/search', function (req, res) {
    sqlInstance.connect(configDB, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sqlInstance.Request();
        // query to the database and get the products
        request.query('SELECT * FROM TProduct ORDER BY nUnitPrice', function (err, products) {
            if (err) console.log(err)
            // send records as a response
            console.log(products);
            res.status(200).json({
                products: products
            });
        }); 
    })
});

app.get('/searchresults', function (req, res) {
    res.sendFile(__dirname + '/public/searchresults/searchresults.html');
})

app.get('/shoppingbasket', function (req, res) {
    res.sendFile(__dirname + '/public/shopping-basket/shoppingbasket.html');
});

app.get('/productview', function (req, res) {
    res.sendFile(__dirname + '/public/productview/productview.html');
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