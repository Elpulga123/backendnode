// update user info change
function addtocart(url) {
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        type: 'GET',
        success: function (result) {
            $('.htc__qua').text(result.carttotal);
            alertify.success('Thêm vào giỏ hàng thành công' + result.productName);
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

function formatPrice(text) {
    // price Format for frontend
    var formatter = new Intl.NumberFormat('VND', {
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
        url: '/checkout-02',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: data,
        cache: false,
        processData: false,
        success: function (result) {
            if(result){
                window.location.href = result.redirect;
            }
        },
        error: function (error) {
            alert(error);
        }
    })
}

function cartAddMoreItem(data) {
    $.ajax({
        url: '/add-cart',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: data,
        cache: false,
        processData: false,
        success: function (result) {
            addMoreProduct(result.itemTotal);
        },
        error: function (error) {
            alert(error);
        }
    })
}

function addMoreProduct(price) {
    $('.product-quantity-price').on('change', function () {
        var id = $(this).prev().val(),
        itemsCart = {},
        carttotal = $('.cart__price .price-transform').text();
        cartsItem = $('.item');
        cartsItem.each(function (index, value) {

            var id_ = $(this).find($('.variantID'));
            id_v = id_.val();
            if (id_v == id) {

                var count = $(this).find($('.product-quantity-price')),
                originalPriceCollection = $(this).find($('.product-price')),
                originalPriceTransform = originalPriceCollection.find($('.price-transform')),
                originalPrice = originalPriceTransform.attr('data-price');
                totlalPriceCollections = $(this).find($('.product-subtotal'));
                totalPrice = parseInt(originalPrice) * count.val();
                
                itemsCart.id = id;
                itemsCart.count = parseInt(count.val());
                cartAddMoreItem(JSON.stringify(itemsCart));
                
                var priceTransfrom = totlalPriceCollections.find($('.price-transform'));
                var formatter = new Intl.NumberFormat('VND', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 0
                });
                priceTransfrom.text(formatter.format(totalPrice));
            }
        })
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

    // FORMAT CURRENCY
    formatPrice();
    var priceFormats = $('.price-cart');
    var formatter = new Intl.NumberFormat('VND', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    });
    priceFormats.each(function (index) {
        var price = parseInt($(this).text())
        $(this).text(formatter.format(price));
    });

    /* FORM CHECKOUT / START */

    var formcheckout = new FormData();
    var cartinfo = {}

    function checkoutForm() {
        var checkoutinfo = $('#checkoutinfo');
        var x = checkoutinfo.serializeArray();
        x.forEach(function (value, index) {
            cartinfo[value.name] = value.value;
        })
        checkoutinfo123(JSON.stringify(cartinfo));
    }

    // button payment click submit form.
    $('.payment__btn .active .test').on('click', function (e) {
        e.preventDefault();
        checkoutForm();
    })
    addMoreProduct();

    /* FORM CHECKOUT / END */

})