$.ajax({
    "url": "../products",
    "method": "GET"
}).done(res => {
    const jsonList = res.products.recordset;
    console.log(jsonList);

    for (let i = 0; i < jsonList.length; i++) {
        const htmlString = "<div class='product'><h3>" + jsonList[i].cName + "</h3><br><br>" + jsonList[i].cDescription.substring(0,50) + "...<br><br><a href='/product?id=" + jsonList[i].nProductId + "'>go to product</a></div>"
        $(".product-box__products").append(htmlString);
    }
});