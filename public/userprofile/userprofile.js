$( document ).ready(function() {

    const currentUser = window.localStorage.getItem('userid');
    console.log(currentUser);

    $.ajax({
        "url": "../getuser?id=" + currentUser,
        "method": "GET"
    }).done(res => {
        const userjson = res.user;
        console.log(userjson);

        const html_string = "<div>Name: " + userjson.cName + "<br><br>Surname: " + userjson.cSurname + "<br><br>Address: " + userjson.cAddress + "<br><br>Zip Code: " + userjson.cZipCode + "<br><br>City: " + userjson.cCityName + "<br><br>Telephone: " + userjson.cPhoneNumber + "<br><br>Email: " + userjson.cEmail + "<br><br>Username: " + userjson.cUsername + "<br><br>Password: " + userjson.cPassword + "</div>";

        $('.profile-information').append(html_string);
    });

    const jsonFormObj = {userid: currentUser};

    $.ajax({
        url: "/creditcards",
        type: 'POST',
        data: jsonFormObj,
        dataType: 'json'
    }).done(res => {
        const jsonList = res.creditcards.recordset;
        console.log(jsonList);
    
        for (let i = 0; i < jsonList.length; i++) {
            const htmlString = "<div class='singlecreditcard' idvalue='" + jsonList[i].nCreditCardId + "'>Name: " + jsonList[i].cCardHolder + "<br><br>Credit Card Number: " + jsonList[i].cCardNumber + "<br><br>Expiration Date: " + jsonList[i].cExpiringDate + "</div><button type='submit' class='deletebutton' id='deletebutton" + jsonList[i].nCreditCardId + "'>DELETE THIS CARD</button><hr><script>$('#deletebutton" + jsonList[i].nCreditCardId + "' ).click((event) => { event.preventDefault(); const jsonFormObject = {'creditcardid': " + jsonList[i].nCreditCardId + "}; console.log(jsonFormObject); $.ajax({ url: '/deletecreditcard', type: 'POST', data: jsonFormObject, dataType: 'json' }).done(function(data){ console.log(data); location.reload(); })});</script>";
            $(".creditcard-information").append(htmlString);
        }
    });

});