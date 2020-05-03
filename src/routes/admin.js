import express from 'express';
import controllerFrontend from '../modal/controllers/frontendController';
import controller from '../modal/controllers';
import { validateRegister } from '../validator';
import passport from 'passport';
import { initPassportLocal } from '../modal/controllers/passportController/local';

// khởi tạo passport local
initPassportLocal();
const router = express.Router();

// Backend 
// homepage 
router.get('/login', controller.checkloggedOut, controller.loginController);
// authencation page login method

router.post('/login', controller.checkloggedOut, passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login',
  failureFlash: 'Invalid username or password.',
  successFlash: 'Welcome !',
}));

// register action
router.get('/register', controller.getRegisterController);
router.post('/register', validateRegister, controller.getPostRegisterController);

router.get('/', controller.checkloggedIn, controller.homeController);
router.get('/logout', controller.checkloggedIn, controller.getLogout);
// sendmail return email to verify
router.get('/verify/:token', controller.verifyToken);

// userupdate data
router.put('/update-user/user', controller.checkloggedIn, controller.updateUserdata);
router.put('/update-avatar/user', controller.checkloggedIn, controller.updateUserAvatar);

// product
router.get('/products', controller.checkloggedIn, controller.getAllProduct);
// chuyển hướng sang trang thêm sản phẩm
router.get('/product/add_product', controller.checkloggedIn, controller.addProductGet);
router.post('/add_product', controller.checkloggedIn, controller.addProduct);
router.post('/add_product_image', controller.checkloggedIn, controller.addProductImage);

router.get('/product/delete_product/:id', controller.checkloggedIn, controller.deleteProduct);
router.get('/product/delete-product-image', controller.checkloggedIn, controller.deleteProductImage);
router.get('/product/edit_product/:id', controller.checkloggedIn, controller.editProduct);
router.post('/product/edit_product/:id', controller.checkloggedIn, controller.editProductPost);
router.put('/product/edit_product_image/:id', controller.checkloggedIn, controller.updateProductImage);
router.post('/product-add-edit/:id', controller.checkloggedIn, controller.editAddProductImage);


/* slider */
router.get('/sliders', controller.checkloggedIn, controller.getAllSliders);
router.post('/add_slider', controller.checkloggedIn, controller.addSlider);
router.get('/slider/edit_slider/:id', controller.checkloggedIn, controller.editSlider);
router.post('/slider/edit_slider/:id', controller.checkloggedIn, controller.editSliderPost);
router.get('/slider/delete_slider/:id', controller.checkloggedIn, controller.deleteSlider);

/* cart */
router.get('/carts', controller.checkloggedIn, controller.getAllCart);
export default router;

