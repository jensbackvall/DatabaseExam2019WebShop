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

    const htmlString = "<div><h3>" + thisProduct.cName + "</h3><br><br>" + thisProduct.cDescription + "<br><br>price: DKK " + thisProduct.nUnitPrice + "</div>"
    $(".product").append(htmlString);


/*

For testing

    const ratings = {
        hotel_a : 2.8,
        hotel_b : 3.3,
        hotel_c : 1.9,
        hotel_d : 4.3,
        hotel_e : 4.74
      };

    const starTotal = 5;
 
    
  for(const rating in ratings) {  
    
    const starPercentage = (ratings[rating] / starTotal) * 100;
    
    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
    
    document.querySelector(`.${rating}.stars-inner`).style.width = starPercentageRounded; // ${rating}
  }
 
*/

  document.querySelector(`.${thisProduct.nAverageRating}.stars-inner`).style.width = starPercentageRounded; // ${rating} 
});
