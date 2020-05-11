import service from '../../../service';
import Cart from '../../config/cart';
import { paymentConfigure } from '../../config/paypal';
import paypal from 'paypal-rest-sdk';

// cấu hình paypal.
paymentConfigure;


let getAllCart = async (req, res, next) => {

    try {
        var carts = req.session.cartSess;
        console.log(carts.totalPrice);
        var stringCarts = JSON.stringify(carts);
        res.render('frontend/sections/cart/cart', {
            title: 'giỏ hàng',
            carts: carts,
            stringCarts: stringCarts
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

// shopping cart add
let addToCart = async (req, res, next) => {

    try {
        var item_send = {};
        var id = req.params.id;
        var cart = new Cart(req.session.cartSess ? req.session.cartSess : {});
        let productAddToCart = await service.findProductByIdService(req.params.id);
        // thêm item mới vào cart
        cart.add(productAddToCart, id);
        req.session.cartSess = cart;
        item_send.carttotal = cart.quanity;
        item_send.nameProduct = productAddToCart.name;
        item_send.imageProduct = productAddToCart.image;

        // sau khi lưu vào session thành công thì trả về cho client bằng ajax
        let result = {
            productName: item_send.nameProduct
        }

        return res.status(200).send(result);

    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

// FORM FRONTEND ADD MORR QUANTITY FOR CART
let addCountToCart = (req, res, next) => {

    try {
        let cartModel = {};
        var item_send = {};
        let { count } = req.body,
            id = req.body.id;
        var cart_02 = new Cart(req.session.cartSess ? req.session.cartSess : {});
        cart_02.addCount(count, id);
        req.session.cartSess = cart_02;

        let result = {
            totalCart: cart_02.quanity,
            itemTotal: cart_02.items[id].price
        }
        return res.status(200).send(result);

        //cartModel.items = cart.items;

        // req.user._id được lưu ở session khi đăng nhập
        //let addCartService = await service.addCartService(cartModel);
        //console.log(typeof addCartService);

    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

// shopping cart add
let deleteItemCart = async (req, res, next) => {
    try {
        var item_send = {};
        var id = req.params.id;
        var cart = new Cart(req.session.cartSess ? req.session.cartSess : {});
        let productAddToCart = await service.findProductByIdService(req.params.id);
        // xóa item mới vào cart
        cart.delete(productAddToCart, id);
        req.session.cartSess = cart;
        // sau khi lưu vào session thành công thì trả về cho client bằng ajax
        res.redirect('/carts');

    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

// thực hiện chuyển link đến đường dẫn thanh toán.
let checkout = (req, res, next) => {

    var carts = req.session.cartSess;
    var stringCarts = JSON.stringify(carts);
    res.render('frontend/sections/cart/checkout', {
        title: 'Thông tin thanh toán',
        carts: carts,
        stringCarts: stringCarts
    });

}

// lấy thông tin từ form của khách hàng
let checkoutInfo = async (req, res, next) => {

    const objs = req.body; // req.body = [Object: null prototype] { title: 'product' }
    console.log(objs);
    let result = {
        obj: objs
    }

    // const CartItem = {};
    // CartItem.info = req.body;
    // CartItem.items = req.session.cartSess;

    // let addCarts = await service.addCartService(CartItem).then((val) => {
    // }).catch((reason) => {
    //     throw reason;
    // });


    // let animal_names = obj.map((animal, index) => {
    //     return animal.name
    // })
    
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/success",
            "cancel_url": "http://localhost:5000/cancel" 
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Sox Hat",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Hat for the best team ever"
        }]
    };
    // phương thức này trả về một đối tượng các thông tin đơn hàng mà client đưa lên
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                     res.redirect(payment.links[i].href);
                }
            }
        }
    });

    
    if (req.body) {
        res.send(result);
    }
}

let paymentSuccess = (req, res, next) => {
    // lấy được ID khi payment trả về POST thông tin
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send(' Thanh toán thành công ! ');
        }
    });
}

let paymentCancel = function (req, ré, next) {
    res.send('cancel');
}



module.exports = {
    getAllCart,
    addToCart,
    deleteItemCart,
    checkout,
    checkoutInfo,
    paymentSuccess,
    addCountToCart
}