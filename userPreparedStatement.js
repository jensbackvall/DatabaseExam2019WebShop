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

function listUsers(){
    sql_stmt = "SELECT * FROM TUser;";

    connection.query(sql_stmt,function (err, rows){
        console.log();
        console.log("User Listing");
        console.log();

        console.table(rows);

        console.log("Total rows returned: " + rows.length);
    });
}

function registerUser(){
    var nUserId = getArgument('--nUserId');
    var cName = getArgument('--cName');
    var cSurname = getArgument('--cSurname');
    var cAddress = getArgument('--cAddress');
    var cPhoneNumber = getArgument('--cPhoneNumber');
    var cEmail = getArgument('--cEmail');
    var nTotalPurchase = getArgument('--nTotalPurchase');
    var cZipCode = getArgument('--cZipCode');
    var cUserName = getArgument('--cUserName');
    var cPassword = getArgument('--cPassword');
   // var nAverageRating = getArgument('--nAverageRating'); // skal denne med´????

    sql_stmt = "INSERT INTO TUser(nUserId,cName,cSurname,cAddress,cPhoneNumber,cEmail,nTotalPurchase,cZipCode,cUserName,cPassword) VALUES (?,?,?,?,?,?,?,?,?,?)";



    var values = [nUserId, cName, cSurname,cAddress,cPhoneNumber,cEmail,nTotalPurchase,cZipCode,cUserName,cPassword];

    sql_stmt = mssql.format(sql_stmt, values); 
    
    connection.query(sql_stmt, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Created new User with id ' + result.insertId);
    } )
    registerCard();
}

function registerCard(){
    var nCreditcardId = getArgument('--nCreditcardId');
    var cCardNumber = getArgument('--cCardNumber');
    var cCardHolder = getArgument('--cCardHolder');
    var cExpiringDate = getArgument('--cExpiringDate');
    var cCCV = getArgument('--cCCV');
    var nTotalPurchase = getArgument('--nTotalPurchase');
    var nUserId = getArgument('--nUserId');

    sql_stmt = "INSERT INTO TCreditCard(nCreditcardId,cCardNumber,cCardHolder,cExpiringDate,cCCV,nTotalPurchase,nUserId) VALUES (?,?,?,?,?,?,?)";



    var values = [nCreditcardId, cCardNumber, cCardHolder,cExpiringDate,cCCV,nTotalPurchase,nUserId];

    sql_stmt = mssql.format(sql_stmt, values); 

    connection.query(sql_stmt, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Created new User with id ' + result.insertId);
    })
}


function updateUser (){
    var nUserId = getArgument('--nUserId');
    var cName = getArgument('--cName');
    var cSurname = getArgument('--cSurname');
    var cAddress = getArgument('--cAddress');
    var cPhoneNumber = getArgument('--cPhoneNumber');
    var cEmail = getArgument('--cEmail');
    var nTotalPurchase = getArgument('--nTotalPurchase');
    var cZipCode = getArgument('--cZipCode');
    var cUserName = getArgument('--cUserName');
    var cPassword = getArgument('--cPassword');

    sql_stmt = "UPDATE TUser SET cName = ?,cSurname = ?,cAddress = ?,cPhoneNumber = ?,cEmail = ?,nTotalPurchase = ?,cZipCode = ?,cUserName = ?,cPassword = ?, WHERE nUserId = ?";

    var values = [nUserId, cName, cSurname, cAddress, cPhoneNumber, cEmail, nTotalPurchase,cZipCode,cUserName,cPassword];

    sql_stmt = mssql.format(sql_stmt, values);

    connection.query(sql_stmt, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Updated User with id ' + nUserId);
    })
}

function deleteProducts(){
    var id = getArgument('--nUserId');

    sql_stmt = "DELETE * FROM TProduct WHERE nUserId = ?";

    var nUserId = [id];

    sql_stmt = mssql.format(sql_stmt, nUserId);

    connection.query(sql_stmt, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Deleted User with id ' + id);
    })
}

app.get('/product', function (req, res) {
    const id = req.query.id;
    sql_stmt = "SELECT * FROM TUser WHERE nUserId = " + id;
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

listUsers();

connection.end(function(error) {
    if (error){
        console.log('The following error occured while trying to connect to MSSQL ' + error.message);
    }else{
        console.log();
        console.log('Connection to MSSQL established closed');
    }
});
