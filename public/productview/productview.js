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
    const comments = res.product.recordsets[1];
    console.log(comments);

    const htmlString = "<div id='productinfo' data-value='" + thisProduct.nUnitPrice + "' name-value='" + thisProduct.cName + "'><h3>" + thisProduct.cName + "</h3><br><br>" + thisProduct.cDescription + "<br><br>price: DKK " + thisProduct.nUnitPrice + "</div>";

    $(".product").append(htmlString);

    let width = thisProduct.nAverageRating * 22.5;

    $(".stars-inner").width(width);

    if (comments.length < 1) {
        $(".comment-box").append("<div>This product has not received any comments yet. If you like it or have experience using it, why not be the first to comment?</div>");
    };

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        console.log(comment);
        if (comment.cComment !== "") {
            const html_comment = "<div class='comment'>" + comment.cComment + "</div>";
            $(".comment-box").append(html_comment);
        } 
    }        
});


