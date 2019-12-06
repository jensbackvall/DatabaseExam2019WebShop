const express = require('express');
const app = express();
const sqlStatements = require('./backend/sqlMethods');

const port = 3000;

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    fetchAllProducts;
});





app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`))