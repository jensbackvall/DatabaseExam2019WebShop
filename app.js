const express = require('express');
const app = express();
const sqlInstance = require('mssql');

const port = 3000;

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// config for your database
const config = {
    user: 'sa',
    password: 'DataBaseExam2019',
    server: 'localhost',
    database: 'DataBaseExam2019'
};


app.get('/', function (req, res) {
  // connect to database
  sqlInstance.connect(config, function (err) {
      if (err) console.log(err);
      // create Request object
      var request = new sqlInstance.Request();
      // query to the database and get the products
      request.query('select * from TProduct', function (err, products) {
          if (err) console.log(err)
          // send records as a response
         console.log(products);
        //  res.json(products);
         res.status(200).json({
          message: "Products fetched successfully",
          products: products
        });
      });
  });
});





app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`))