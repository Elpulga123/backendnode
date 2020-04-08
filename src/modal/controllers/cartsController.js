import service from '../../service';
import { app } from '../config/app';
import { TranProductSuccess } from '../../../lang/vi';// login authencation
import Cart from '../config/cart';
import currencyFormatter from 'currency-formatter';

let getAllCart = async (req, res, next) => {
    
    try {
        //var carts = req.session.cartSess;
        res.render('main/carts/cart-list', {
            title: 'giỏ hàng',
            carts : carts,
            products : []
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

module.exports = {
    getAllCart
}