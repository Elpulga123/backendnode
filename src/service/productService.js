
import { productsModel } from '../modal/productModel';

let addProductService = (item) => {
    return productsModel.createNew(item);
}

let findProductByIdService = (id) => {
    return productsModel.findProductById(id);
}

// lấy ra tất cả các sản phẩm
let getAllProducts = () => {
    return productsModel.findProducts();
}

// update sản phẩm
let updateProductService = (id) => {
    return productsModel.findProductById(id);
}

// xóa 1 sản phẩm
let deleteProductService = (id) => {
    return productsModel.removeId(id);
}

let updateProductPost = (id, item) => {
    return productsModel.UpdateProduct(id, item);
}

let getProductDetailService = (id) => {
    return productsModel.findProductById(id);
}

let updateProductImageService = (id, item) => {
    // promise trả về 
    return productsModel.UpdateProduct(id, item);
}

module.exports = {
    addProductService,
    updateProductService,
    updateProductPost,
    getAllProducts,
    deleteProductService,
    findProductByIdService,
    updateProductImageService,


    getProductDetailService,
    
}
