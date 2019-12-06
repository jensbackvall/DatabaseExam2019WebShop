// til prepared statements - ikke sikkert det fungerer til mssql

// https://kode-blog.io/nodejs-database-mysql

var mssql = require('mssql');
require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database : ''
});

var sql_stmt = "";

function getArgument(argument){
    var index = process.argv.indexOf(argument);

    return (index === -1) ? null : process.argv[index + 1];
}

connection.connect(function(error){
    if(error){
        console.log();
        console.log('The following error occured while trying to connect to MSSQL ' + error.message);
        return;
    }
    console.log();
    console.log('Connection to MSSQL established successfully');       

});

function listProducts(){
    sql_stmt = "SELECT * FROM TProducts;";

    connection.query(sql_stmt,function (err, rows){
        console.log();
        console.log("Products Listing");
        console.log();

        console.table(rows);

        console.log("Total rows returned: " + rows.length);
    });
}

function addProduct(){
    var cName = getArgument('--cName');
    var cDescription = getArgument('--cDescription');
    var nUnitPrice = getArgument('--nUnitPrice');
    var nStock = getArgument('--nStock');
   // var nAverageRating = getArgument('--nAverageRating'); // skal denne med´????

    sql_stmt = "INSERT INTO TProduct(cName,cDescription,nUnitPrice,nStock) VALUES (?,?,?,?)";


    var values = [cName, cDescription, nUnitPrice,nStock];

    sql_stmt = mssql.format(sql_stmt, values); // I tvivl om denne fungerer??? ændret fra -> sql_stmt = mysql.format(sql_stmt, values);

    connection.query(sql_stmt, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Created new product with id ' + result.insertId);
    })
}

function updateProduct (){
    var nProductId = getArgument('--nProductId');
    var cName = getArgument('--cName');
    var cDescription = getArgument('--cDescription');
    var nUnitPrice = getArgument('--nUnitPrice');
    var nStock = getArgument('--nStock');
    var nAverageRating = getArgument('--nAverageRating');

    sql_stmt = "UPDATE TProduct SET cName = ?,cDescription = ?,nUnitPrice = ?,nStock = ?,nAverageRating = ?, WHERE nProductId = ?";

    var values = [cName, cDescription, nUnitPrice, nStock, nAverageRating, nProductId];

    sql_stmt = mssql.format(sql_stmt, values);

    connection.query(sql_stmt, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Updated Product with id ' + nProductId);
    })
}

function deleteProducts(){
    var id = getArgument('--nProductId');

    sql_stmt = "DELETE FROM TProduct WHERE nProductId = ?";

    var nProductId = [id];

    sql_stmt = mssql.format(sql_stmt, nProductId);

    connection.query(sql_stmt, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Deleted Product with id ' + id);
    })
}

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

var action = getArgument('--action');

switch(action){
    case "add":
        addRecord();
        break;

    case "update":
        updateRecord();
        break;

    case "delete":
        deleteRecord();
        break;
}

listProducts();

connection.end(function(error) {
    if (error){
        console.log('The following error occured while trying to connect to MSSQL ' + error.message);
    }else{
        console.log();
        console.log('Connection to MSSQL established closed');
    }
});
