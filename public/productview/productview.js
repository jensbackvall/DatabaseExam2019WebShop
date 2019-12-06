// Get the products id from the url parameters
const urlParams = new URLSearchParams(window.location.search);
const thisId = urlParams.get('id');

// Get the product from the database via the endpoint /product, which takes an id
$.ajax({
    "url": "../product?id=" + thisId,
    "method": "GET"
}).done(res => {
    const thisProduct = res.product.recordsets[0][0];
    console.log(thisProduct);

    const htmlString = "<div><h3>" + thisProduct.cName + "</h3><br><br>" + thisProduct.cDescription + "<br><br>price: " + thisProduct.nUnitPrice + "</div>"
    $(".product").append(htmlString);


});
