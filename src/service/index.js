import { register_service, veryfiAccount } from './authservice';
import { updateUserService } from './userService';



import {
    addProductService,
    getAllProducts,
    updateProductService,
    deleteProductService,
    updateProductPost,
    findProductByIdService,
    updateProductImageService,


    getProductDetailService,
} from './productService';

import {
    getAllSliders,
    addSliderService,
    updateSliderService,
    updateSliderPost,
    findSliderByIdService,
    deleteSliderService
} from './sliderService';

import { addCartService } from './cartService';


module.exports = {

    register_service,
    veryfiAccount,
    updateUserService,

    addProductService,
    getAllProducts,
    updateProductService,
    updateProductPost,
    deleteProductService,
    findProductByIdService,


    getAllSliders,
    addSliderService,
    updateSliderService,
    updateSliderPost,
    findSliderByIdService,
    deleteSliderService,
    updateProductImageService,



    //frontend
    getProductDetailService,


    // cartservice
    addCartService


}
