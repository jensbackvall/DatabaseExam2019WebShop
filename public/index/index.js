
// Fetches all products via en endpoint '/product'. This endpoints queries databse for all products
$.ajax({
    "url": "../products",
    "method": "GET"
}).done(res => {
    const jsonList = res.products.recordset;
    console.log(jsonList);

    for (let i = 0; i < jsonList.length; i++) {
        const htmlString = "<div class='product'><h3>" + jsonList[i].cName + "</h3>" + jsonList[i].cDescription.substring(0,85) + "...<br><br>price: DKK " + jsonList[i].nUnitPrice + "<br><br><br><a href='/productview?id=" + jsonList[i].nProductId + "'>go to product</a></div>"
        $(".product-box__products").append(htmlString);
    }
});