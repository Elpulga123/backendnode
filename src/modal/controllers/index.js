import homeController from './homeController';
import {
    loginController, 
    getPostRegisterController,
    getRegisterController,
    verifyToken,
    getLogout,
    checkloggedIn,
    checkloggedOut,} from './authController';
import {
    updateUserdata,
    updateUserAvatar,} from './userController';
import {addProduct,
    deleteProduct,
    editProduct,
    editProductPost,
    getAllProduct,
    addProductImage,
    updateProductImage,
    editAddProductImage,
    addProductGet,
    deleteProductImage

} from './productController';
import {addSlider,
    getAllSliders,
    editSlider,
    editSliderPost,
    deleteSlider} from './sliderController';


    import {getAllCart} from './cartsController';


module.exports = {
    homeController,
    loginController,
    getPostRegisterController,
    getRegisterController,
    verifyToken,getLogout,
    getLogout,
    checkloggedIn,
    checkloggedOut,


    updateUserdata,
    updateUserAvatar,


    // product
    addProduct,
    editProduct,
    deleteProduct,
    editProductPost,
    getAllProduct,
    addProductImage,
    updateProductImage,
    editAddProductImage,
    addProductGet,
    deleteProductImage,


    addSlider,
    getAllSliders,
    editSlider,
    editSliderPost,
    deleteSlider,


    // carts
    getAllCart
}