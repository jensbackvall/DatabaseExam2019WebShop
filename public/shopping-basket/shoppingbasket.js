$( document ).ready(function() {

    let userId = window.localStorage.getItem('userid');
    const jsonFormObj = {userid :userId};
    console.log('USER ID: ', userId);

    const productsInCart = JSON.parse(window.localStorage.getItem('productsInCart'));
    console.log('PRODUCTS IN CART: ', productsInCart);
    let numberOfProductsInCart = 0;

    let productsJsonArray = [];

    for (let key in productsInCart['Name']) {
        if(productsInCart['Name'].hasOwnProperty(key))
        numberOfProductsInCart++;
    };

    console.log(numberOfProductsInCart);
    let productsIdArray = Object.keys(productsInCart['Name']);
    console.log(productsIdArray);
    let totalPrice = 0;

    for (let i = 0; i < numberOfProductsInCart; i++) {
        
        const productColumn_html = "<div>" + productsInCart['Name'][productsIdArray[i]].substring(0,15) + "...</div>";

        const priceColumn_html = "<div>DKK " + productsInCart['Price'][productsIdArray[i]] + "</div>";

        const quantityColumn_html = "<div>" + productsInCart['Quantity'][productsIdArray[i]] + "</div>";

        const totalPriceForProduct = (productsInCart['Price'][productsIdArray[i]] * productsInCart['Quantity'][productsIdArray[i]]);

        const totalPriceColumn_html = "<div>DKK " + totalPriceForProduct + "</div>";

        totalPrice = totalPrice + totalPriceForProduct;

        $(".productNameColumn").append(productColumn_html);
        $(".productPriceColumn").append(priceColumn_html);
        $(".productQuantityColumn").append(quantityColumn_html);
        $(".productTotalPriceColumn").append(totalPriceColumn_html);
        
        if (i === numberOfProductsInCart - 1) {
            $(".productQuantityColumn").append("<br>TOTAL:");
            $(".productTotalPriceColumn").append("<br>DKK " + totalPrice.toFixed(2));
            $(".productQuantityColumn").append("<br><br>VAT:");
            $(".productTotalPriceColumn").append("<br><br>DKK " + (totalPrice * 0.25).toFixed(2));
            $(".productQuantityColumn").append("<br><br>PRICE + VAT:");
            const totalPriceInclVAT = totalPrice + (totalPrice * 0.25);
            $(".productTotalPriceColumn").append("<br><br>DKK " + totalPriceInclVAT.toFixed(2));
        }

        let productLine = {"productId": productsIdArray[i], "quantity": productsInCart['Quantity'][productsIdArray[i]], "unitPrice": productsInCart['Price'][productsIdArray[i]]}
        productsJsonArray.push(productLine);

    }





    

$.ajax({
    url: "/creditcards",
    type: 'POST',
    data: jsonFormObj,
    dataType: 'json'
}).done(res => {
    const jsonList = res.creditcards.recordset;
    console.log(jsonList);

    for (let i = 0; i < jsonList.length; i++) {
        const htmlString = "<option value='" + jsonList[i].nCreditCardId + "'>ending with " + jsonList[i].cCardNumber.substring(12,16) + " belonging to: " + jsonList[i].cCardHolder + "</option>";
        $("#creditCardField").append(htmlString);
    }
});


$(".purchasing-button").click((event) => {
    console.log("Inside purchasing-button");
    event.preventDefault();
    let creditcardid = $("#creditCardField :selected").val();
    let totalprice = totalPrice;
    let totalvat = totalPrice * 0.25;
    let productsData = JSON.stringify(productsJsonArray);
    const jsonFormObj = {'creditcardid': creditcardid, 'totalprice': totalprice, 'totalvat': totalvat, 'productsdata': productsData};
    console.log(jsonFormObj); 
    $.ajax({
        url: '/checkout',
        type: 'POST',
        data: jsonFormObj,
        dataType: 'json'
    }).done(function(data){
        console.log('LOOK AT THIS DATA!: ', data);
        if (data) {
            console.log('GO TO PURCHASE COMPLETED!');
            window.localStorage.removeItem('productsInCart');
            window.location.replace('/purchase-completed');
        }
    })
});


    
});

