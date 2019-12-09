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
// This query works in azure data studio: SELECT * FROM TProduct WHERE (cName LIKE '%ban%' OR cDescription LIKE '%ban%' ) ORDER BY nUnitPrice;
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





app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`))