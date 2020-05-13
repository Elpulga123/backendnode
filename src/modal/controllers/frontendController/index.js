import {homeController} from './homeController';
import {getProductDetail} from './productController';
import {getAllCart,
    addToCart,
    deleteItemCart,
    checkout,
    checkoutStep3,
    paymentSuccess,
    addCountToCart,
    checkoutStep2,
    checkoutStep4} from './cartController';

module.exports = {

    homeController,
    getProductDetail,

    getAllCart,
    addToCart,
    deleteItemCart,
    checkout,
    checkoutStep3,
    paymentSuccess,
    addCountToCart,
    checkoutStep2,
    checkoutStep4
}