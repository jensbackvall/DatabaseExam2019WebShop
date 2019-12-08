console.log('parameters please!');
// Get the search string from the url parameters
const urlParams = new URLSearchParams(window.location.search);
const thisSearch = urlParams.get('search');
console.log('parameter search: ', thisSearch);

$.ajax({
    "url": "../search?search=" + thisSearch,
    "method": "GET"
}).done(res => {
    console.log('parameter search: ', thisSearch);
    const jsonList = res.products.recordset;
    console.log('LIST OF PRODUCTS: ', jsonList);

    for (let i = 0; i < jsonList.length; i++) {
        const htmlString = "<div class='product'><h3>" + jsonList[i].cName + "</h3>" + jsonList[i].cDescription.substring(0,85) + "...<br><br>price: DKK " + jsonList[i].nUnitPrice + "<br><br><br><a href='/productview?id=" + jsonList[i].nProductId + "'>go to product</a></div>"
        $(".product-box__products").append(htmlString);
    }
});