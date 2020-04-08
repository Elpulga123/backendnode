import service from '../../service';

let homeController = async(req, res, next) => {
    try {
        // Lấy tất cả sản phẩm và hiển thị ra table
        let products = await service.getAllProducts();
        res.render('main/home/home', {
            title: 'Trang chủ',
            errors: req.flash('Errors'),
            success: req.flash('Success'),
            user: req.user,
            products: products
        })  
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }

}
export default homeController;