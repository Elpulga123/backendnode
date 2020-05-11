import mongoose from 'mongoose';

let Schema = mongoose.Schema;
var CartsSchema = new Schema({
    name: String,
    info: {type:{}, default:{}},
    items: { type: {}, default: {} },
    describes: String,
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    deletaAt: { type: Date, default: Date.now }
});

CartsSchema.statics = {
    // sử dụng phương thức statics của mongodb
    // có 2 cách : dùng thuộc tính của Schema.statics = {} hoặc call.Shema.static().
    // định nghĩa các hàm overide cú pháp
    createNew(item) {
        return this.create(item); // phương thức này tự động mongoose.promise trả vể 1 resovle.
    },
    findProducts() {
        return this.find();
    },
    findProductById(id) {
        return this.findById(id).exec();
    },
    removeId(id) {
        return this.findOneAndDelete(id).exec();
    },
    UpdateProduct(id, item) {
        return this.findByIdAndUpdate(id, item).exec();
    }
}

const cartsModel = mongoose.model('Carts', CartsSchema);
export { cartsModel }
