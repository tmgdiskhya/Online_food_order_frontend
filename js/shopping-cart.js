window.onload = async function () {
    try {
        const cartUrl = "http://localhost:3000/orders/showtocart/";
        // const instrumenturl = 
        const cartTable = document.getElementById("cartTable")
        const data = await fetch(cartUrl + localStorage.getItem("userId") + "/false");
        const json = await data.json();
        let txt = "";
        if (json.length == 0) {
            txt += '<tr><td>No Data</td><td>No Data</td><td>No Data</td><td>No Data</td><td>No Data</td></tr>'
            cartTable.innerHTML = txt;
            alert("You don't have any items in your cart")
            this.document.location.href = './shop.html'
        }
        else {
            for (var i = 0; i < json.length; i++) {
                const instrument = await fetch("http://localhost:3000/instruments/instruments/getInstrumentByID/" + json[i].Instrumentid)
                const instrumentJson = await instrument.json()
                txt += '<tr>'
                txt += '<td class="cart-pic first-row"><img src="http://localhost:3000/' + instrumentJson.photo + '" alt=""></td>'
                txt += '<td class="cart-title first-row">'
                txt += '<h5>' + instrumentJson.name + '</h5> </td>'
                txt += '<td class="p-price first-row" id="price">Rs.' + instrumentJson.price + '</td>'
                txt += '<td class="qua-col first-row">'
                txt += '<div class="quantity">'
                txt += '<div class="pro-qty">'
                txt += '<input type="text" value="' + json[i].qty + '" id="quantity"></div></div></td>'
                txt += '<td class="total-price first-row" id="total" onclick = "calculate(' + instrumentJson.price + ')">Rs.' + Number(instrumentJson.price * json[i].qty) + '</td>'
                txt += "<td class='close-td first-row'><i class='ti-close' onclick='deleteFromCart(`" + json[i]._id + "`)'></i></td>"
                txt += "<td class='close-td first-row'><i class='icon_bag_alt' onclick='buyItem(`" + json[i]._id + "`)'></i><br/>Buy</td>"
                cartTable.innerHTML = txt
            }
        }


    }
    catch (error) {
        alert(error)
    }

}
