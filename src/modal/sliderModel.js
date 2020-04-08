import mongoose from 'mongoose';

let Schema = mongoose.Schema;
var sliderSchema = new Schema({
    bigCaption: String,
    smallCaption: String,
    link : String,
    image: { type: String, default: 'avatar-4.jpg' },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    deletaAt: { type: Date, default: Date.now }
});

sliderSchema.statics = {
    // sử dụng phương thức statics của mongodb
    // có 2 cách : dùng thuộc tính của Schema.statics = {} hoặc call.Shema.static().
    // định nghĩa các hàm overide cú pháp
    createNew(item) {
        return this.create(item); // phương thức này tự động mongoose.promise trả vể 1 resovle.
    },
    findSliders(){
        return this.find();
    },
    findSliderById(id) {
        return this.findById(id).exec();
    },
    removeId(id) {
        return this.findOneAndDelete(id).exec();
    },
    UpdateSlider(id, item) {
        return this.findByIdAndUpdate(id, item).exec();
    }
}

const slidersModel = mongoose.model('sliders', sliderSchema);
export { slidersModel }
