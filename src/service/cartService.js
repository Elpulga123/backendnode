import { cartsModel } from '../modal/cartsModel';
let addCartService = (item) => {
    return cartsModel.createNew(item);
}
export {addCartService}