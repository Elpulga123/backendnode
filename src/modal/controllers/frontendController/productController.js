import service from '../../../service';
import { app } from '../../config/app';
import { TranProductSuccess } from '../../../../lang/vi';// login authencation

let getAllProduct = async (req, res, next) => {
    
    try {
        let products = await service.getAllProducts();
        res.render('frontend/sections/', {
            title: 'Danh sách Sản phẩm',
            errors: req.flash('Errors'),
            success: req.flash('Success'),
            user: req.user,
            products: products
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

let getProductDetail = async (req, res, next) => {

    try {
        var carts = req.session.cartSess;
        let product = await service.getProductDetailService(req.params.id);
        res.render('frontend/sections/product/product_detail', {
            title: 'Chi tiết sản phẩm',
            product: product,
            carts : carts
            
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

module.exports = {

    getAllProduct,
    getProductDetail

}