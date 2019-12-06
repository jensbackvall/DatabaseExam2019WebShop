$.ajax({
    "url": "../products",
    "method": "GET"
}).done(res => {
    const jsonList = res.products.recordset;
    console.log(jsonList);

    for (let i = 0; i < jsonList.length; i++) {
        const htmlString = "<div class='product'><h3>" + jsonList[i].cName + "</h3>" + jsonList[i].cDescription.substring(0,50) + "...<br>price: " + jsonList[i].nUnitPrice + "<br><a href='/productview?id=" + jsonList[i].nProductId + "'>go to product</a></div>"
        $(".product-box__products").append(htmlString);
    }
});