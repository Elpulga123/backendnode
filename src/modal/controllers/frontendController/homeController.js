import service from '../../../service';

let homeController = async (req, res, next) => {
    
    try {
        // thông tin giỏ hàng của khách hàng
        var carts = req.session.cartSess;
        // Lấy tất cả sản phẩm và hiển thị ra table
        let sliders = await service.getAllSliders();
        let products = await service.getAllProducts();

        res.render('frontend/main', {
            title: 'Trang chủ',
            products : products,
            sliders : sliders,
            carts : carts
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }

}
module.exports = {
    homeController,
}