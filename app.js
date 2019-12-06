const express = require('express');
const app = express();
const sqlInstance = require('mssql');

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

app.get('/', function (req, res) {
    sqlInstance.connect(configDB, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sqlInstance.Request();
        // query to the database and get the products
        request.query('select * from TProduct', function (err, products) {
            if (err) console.log(err)
            // send records as a response
            console.log(products);
            res.status(200).json({
                products: products
            });
        }); 
})});







app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`))