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

// This endpoint fetches the username and password for validation
app.post("/signin", (req, res) => {
    const enteredUsername = req.body.username;
    const enteredPassword = req.body.password;
    console.log('UserName: ', enteredUsername);
    console.log('Password: ', enteredPassword);
    if (enteredUsername && enteredPassword) {
        sqlInstance.connect(configDB, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sqlInstance.Request();
            // query the database and get the id of the user
            const sql_stmt ="SELECT nUserId FROM TUser WHERE cUsername='" + enteredUsername + "' AND cPassword='" + enteredPassword + "';"
            console.log(sql_stmt);
            request.query(sql_stmt, function (err, result) {
                console.log('A USER ID WAS RETURNED: ', result);
                const nUserId = result.recordset[0].nUserId;
                console.log(nUserId);
                if (err) console.log(err);
                if (nUserId > 0) {
                    console.log('A USER ID WAS RETURNED: ', nUserId);
                    res.status(200).json({
                        response: "Logged In",
                        userid: nUserId
                    });
                } else {
                    console.log('NO USER ID WAS RETURNED!');
                    res.json({"response": "username or password is INCORRECT"});
                }
            }); 
        });       
    } else {
        res.json({"response": "username or password is INCORRECT"});
    }
});


// This endpoint fetches the user credentials and creditcard information for storing
app.post("/registeruser", (req, res) => {
    const enteredUsername = req.body.username;
    const enteredPassword = req.body.password;
    const enteredName = req.body.name;
    const enteredSurname = req.body.surname;
    const enteredAddress = req.body.address;
    const enteredZipCode = req.body.zipcode;
    const enteredPhonenumber = req.body.phonenumber;
    const enteredEmail = req.body.email;
    const enteredCardName = req.body.cardname;
    const enteredCardNumber = req.body.cardnumber;
    const enteredExpirationMonth = req.body.expirationmonth;
    if (enteredExpirationMonth.lenght === 1) {
        enteredExpirationMonth = '0' + enteredExpirationMonth;
    }
    const enteredExpirationYear = req.body.expirationyear;
    if (enteredExpirationYear.lenght === 1) {
        enteredExpirationYear = '0' + enteredExpirationMonth;
    }
    const enteredExpirationDate = enteredExpirationMonth + enteredExpirationYear;
    const enteredCCV = req.body.ccv;
    let usernameIsUnique = false;

    if (enteredName && enteredSurname && enteredPassword && enteredAddress && enteredZipCode && enteredPhonenumber && enteredEmail && enteredUsername && enteredPassword && enteredCardName && enteredCardNumber && enteredExpirationDate && enteredCCV) {

        var pool = new sqlInstance.ConnectionPool(configDB);
        pool.connect().then(function() { 
            // Check if username already exists in database
            // create PreparedStatement object
            const ps = new sqlInstance.PreparedStatement(pool)
            ps.input('enteredUsername', sqlInstance.VarChar(16));
            ps.prepare("SELECT * FROM TUser WHERE cUsername = @enteredUsername;", err => {
                // ... error checks
                if(err) console.log(err);
                ps.execute({enteredUsername}, (err, result) => {
                    // ... error checks
                    if(err) console.log(err);
                    console.log(ps.statement);
                    console.log(result.recordset);
                    if (result.recordset[0]) {
                        console.log('RESULT: ', result.recordset[0]);
                        usernameIsUnique = false;
                        /*res.status(200).json({
                            message: "A User with this username already exists!",
                        });*/
                    } else {
                        usernameIsUnique = true;
                        /*res.status(200).json({
                            message: "The chosen username is unique. Congratulations!",
                        });*/
                    }       
                    // release the connection after queries are executed
                    ps.unprepare(err => {
                        // ... error checks
                        if(err) console.log(err);
                    })

                    console.log('ABOUT TO CHECK IF USERNAMEISUNIQUE IS TRUE!!!');
                    console.log(usernameIsUnique);
                    // If the username is unique, the user and the creditcard can be written to the database
                    if (usernameIsUnique === true) {
                        console.log('USER IS UNIQUE!');

                        // Writing to TUser should be equivalent to executing this sql server stored procedure: 
                        // EXEC registerUserWithCreditCard @username = 'testuser2',@password = 'TestPassword2',@name = 'user2',@surname = 'testuser2',@address = 'Testaddress 2',@zipcode = '2200',@phonenumber = '12121212',@email = 'test2@test2.test',@cardholder = 'Test User2',@cardnumber = '1234123412341234',@cardexpirationdate = '0220',@cardccv = '123';

                        // var pool = new sqlInstance.ConnectionPool(configDB);
                        // pool.connect().then(function() { 
            
                        // create PreparedStatement object
                        const ps2 = new sqlInstance.PreparedStatement(pool)
                        ps2.input('enteredUsername', sqlInstance.VarChar(16));
                        ps2.input('enteredPassword', sqlInstance.VarChar(16));
                        ps2.input('enteredName', sqlInstance.VarChar(255));
                        ps2.input('enteredSurname', sqlInstance.VarChar(255));
                        ps2.input('enteredAddress', sqlInstance.VarChar(100));
                        ps2.input('enteredZipCode', sqlInstance.VarChar(4));
                        ps2.input('enteredPhonenumber', sqlInstance.VarChar(8));
                        ps2.input('enteredEmail', sqlInstance.VarChar(320));
                        ps2.input('enteredCardName', sqlInstance.VarChar(100));
                        ps2.input('enteredCardNumber', sqlInstance.VarChar(16));
                        ps2.input('enteredExpirationDate', sqlInstance.VarChar(4));
                        ps2.input('enteredCCV', sqlInstance.VarChar(3));
                        ps2.prepare("EXEC registerUserWithCreditCard @username = @enteredUsername, @password = @enteredPassword, @name = @enteredName, @surname = @enteredSurname, @address = @enteredAddress, @zipcode = @enteredZipCode, @phonenumber = @enteredPhonenumber, @email = @enteredEmail, @cardholder = @enteredCardName, @cardnumber = @enteredCardNumber, @cardexpirationdate = @enteredExpirationDate, @cardccv = @enteredCCV;", err => {
                            // ... error checks
                            if(err) console.log(err);
                            ps2.execute({enteredUsername, enteredPassword, enteredName, enteredSurname, enteredAddress, enteredZipCode, enteredPhonenumber, enteredEmail, enteredCardName, enteredCardNumber, enteredExpirationDate, enteredCCV}, (err, result) => {
                                // ... error checks
                                if(err) {
                                    console.log(err);
                                    res.status(200).json({
                                    message: 'user created successfully'
                                });
                            } else {
                                console.log(ps.statement)
                                console.log(result)
                                res.status(200).json({
                                    message: 'unable to create user'
                                });
                            }
                            // release the connection after queries are executed
                            ps2.unprepare(err => {
                                // ... error checks
                                if(err) console.log(err);
                            })
                        })
                    })
                }

                })
            })
        }).catch(function (err) {
            console.log(err);
        });
    }
});



// This endpoint fetches all products from the database, ordering them by price ascending
app.get('/products', function (req, res) {
    sqlInstance.connect(configDB, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sqlInstance.Request();
        // query to the database and get the products
        request.query('SELECT * FROM TProduct ORDER BY nUnitPrice', function (err, products) {
            if (err) console.log(err);
            // send records as a response
            // console.log(products);
            res.status(200).json({
                products: products
            });
        }); 
    });
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
            // console.log(product);
            res.status(200).json({
                product: product
            });
        }); 
    })
});

// TODO: This endpoint fetches all products from the database, based on a given search word or string, ordering them by price ascending
// The equivalent query in azure data studio: SELECT * FROM TProduct WHERE (cName LIKE '%ban%' OR cDescription LIKE '%banana%' ) ORDER BY nUnitPrice;
app.get('/search', function (req, res) {
    const search = req.query.name.split('?');
    const nameSearch = search[0];
    const descriptionSearch = search[1].substring(12);
    var pool = new sqlInstance.ConnectionPool(configDB);
    pool.connect().then(function(){ 
        // create PreparedStatement object
        const ps = new sqlInstance.PreparedStatement(pool)
        ps.input('nameSearch', sqlInstance.VarChar(255));
        ps.input('descriptionSearch', sqlInstance.VarChar(2048));
        ps.prepare("SELECT * FROM TProduct WHERE (cName LIKE @nameSearch AND cDescription LIKE @descriptionSearch) ORDER BY nUnitPrice;", err => {
            // ... error checks
            if(err) console.log(err);
            ps.execute({nameSearch: "%"+nameSearch+"%",descriptionSearch: "%"+descriptionSearch+"%"}, (err, result) => {
                // ... error checks
                if(err) console.log(err);
                console.log(result)
                console.log(ps.statement)
                res.status(200).json({
                    products: result
                  });
                // release the connection after queries are executed
                ps.unprepare(err => {
                    // ... error checks
                    if(err) console.log(err);
                })
                })
        })
    }).catch(function (err) {
        console.log(err);
    });
});




// Run the backend on the chosen port
app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`))