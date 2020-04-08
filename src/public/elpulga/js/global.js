// update user info change
function addtocart(url) {
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        type: 'GET',
        success: function (result) {
            $('.htc__qua').text(result.carttotal);
            alert(result);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function deleteItemcart(url) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (result) {
            $('.htc__qua').text(result.carttotal);
            alert(result);
        },
        error: function (error) {
            console.log(error);
        }
    })
}


function formatPrice() {
    // price Format for frontend
    const formatter = new Intl.NumberFormat('VND', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    });

    var priceFormats = $(".price-transform");
    priceFormats.each(function (index) {
        var price = parseInt($(this).text())
        $(this).text(formatter.format(price));
    });
}

function checkoutinfo123(data) {
    $.ajax({
        url: '/payment',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: data,
        cache: false,
        processData: false,
        success: function (result) {
            console.log(result.obj);
        },
        error: function (error) {

        }
    })
}



$(document).ready(function () {

    // cho hiển thị số sản phẩm lên giỏ hàng
    // product Action
    $('.get-price').on('click', function (e) {
        e.preventDefault();
        var url = $(this).attr('href');
        // truyền url vào cho ajax.
        addtocart(url);
    });

    // hàm formart tiền
    formatPrice();
    /* FORM CHECKOUT / START */

    // get form checkou info
  
    

    var formcheckout = new FormData();
    var cartinfo = {}
    function checkoutForm() {

        $('#profile-username').bind('change', function () {
            cartinfo.userName = $(this).val();
        })
        $('#profile-email').bind('change', function () {
            cartinfo.email = $(this).val();
        })
        $('#profile-phone').bind('change', function () {
            cartinfo.phone = $(this).val();
        })
        $('#profile-address').bind('change', function () {
            cartinfo.address = $(this).val();
        })
        $('#profile-gender-male').bind('click', function () {
            cartinfo.gender = $(this).val();
        })
        $('#profile-gender-female').bind('click', function () {
            cartinfo.gender = $(this).val();
        })
        
        //var x = checkoutinfo.serializeArray();
        var x = JSON.stringify(checkoutinfo.serializeArray());
        formcheckout.append('checkoutinfo', x);
        checkoutinfo123(formcheckout);
        console.log(option);
    }     
    // button payment click submit form.

    $('.payment__btn .active .test').on('click', function (e) {
        e.preventDefault();
        checkoutForm();
    })

    /* FORM CHECKOUT / END */


})