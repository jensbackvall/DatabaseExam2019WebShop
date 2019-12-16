$( document ).ready(function() {

    let userId = window.localStorage.getItem('userid');
    const jsonFormObj = {userid :userId};
    console.log('USER ID: ', userId);

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
        $("#ratingField").append(htmlString);
    }
});
    
});

