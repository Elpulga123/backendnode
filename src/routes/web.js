import express from 'express';
import controllerFrontend from '../modal/controllers/frontendController';
import controller from '../modal/controllers';
import { validateRegister } from '../validator';
import passport from 'passport';
import { initPassportLocal } from '../modal/controllers/passportController/local';
// khởi tạo passport local

initPassportLocal();
let router = express.Router();


/* GET home page. */
export let initRoutesFrontend = (app) => {
  // FRONT-END
  router.get('/', controllerFrontend.homeController);
  router.get('/product/:id', controllerFrontend.getProductDetail);
  // cart 
  router.get('/carts', controllerFrontend.getAllCart);
  router.get('/cart/add_cart/:id', controllerFrontend.addToCart);
  router.get('/cart/delete_cart/:id', controllerFrontend.deleteItemCart);
  // payment
  router.get('/checkout', controllerFrontend.checkout);
  router.post('/checkout-02',controllerFrontend.checkoutStep2);
  router.get('/checkout-03', controllerFrontend.checkoutStep3);
  router.get('/checkout-04', controllerFrontend.checkoutStep4);
  router.get('/success', controllerFrontend.paymentSuccess);
  router.post('/add-cart', controllerFrontend.addCountToCart);

  return app.use('/', router);
}







