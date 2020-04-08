import {homeController} from './homeController';
import {getProductDetail} from './productController';
import {getAllCart,
    addToCart,
    deleteItemCart,
    checkout,
    checkoutInfo,
    paymentSuccess} from './cartController';

module.exports = {

    homeController,
    getProductDetail,

    getAllCart,
    addToCart,
    deleteItemCart,
    checkout,
    checkoutInfo,
    paymentSuccess
}