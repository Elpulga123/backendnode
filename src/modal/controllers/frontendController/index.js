import {homeController} from './homeController';
import {getProductDetail} from './productController';
import {getAllCart,
    addToCart,
    deleteItemCart,
    checkout,
    checkoutInfo,
    paymentSuccess,
    addCountToCart,
    checkoutStep2} from './cartController';

module.exports = {

    homeController,
    getProductDetail,

    getAllCart,
    addToCart,
    deleteItemCart,
    checkout,
    checkoutInfo,
    paymentSuccess,
    addCountToCart,
    checkoutStep2
}