const sqlInstance = require('mssql');

// configuration for database
const configDB = {
    user: 'sa',
    password: 'DataBaseExam2019',
    server: 'localhost',
    database: 'DataBaseExam2019'
};

const fetchAllProducts = sqlInstance.connect(configDB, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sqlInstance.Request();
    // query to the database and get the products
    request.query('select * from TProduct', function (err, products) {
        if (err) console.log(err)
          // send records as a response
       console.log(products);
       res.status(200).json({
        message: "Products fetched successfully",
        products: products
      });
    });
});


module.exports.sqlMethods = sqlMethods;