
import { slidersModel } from '../modal/sliderModel';

let addSliderService = (item) => {
    return slidersModel.createNew(item);
}

let findSliderByIdService = (id) => {
    return slidersModel.findSliderById(id);
}

// lấy ra tất cả các sản phẩm
let getAllSliders = () => {
    return slidersModel.findSliders();
}

// update sản phẩm
let updateSliderService = (id) => {
    return slidersModel.findSliderById(id);
}

// xóa 1 sản phẩm
let deleteSliderService = (id) => {
    return slidersModel.removeId(id);
}

let updateSliderPost = (id, item) => {
    return slidersModel.UpdateSlider(id, item);
}

module.exports = {
    addSliderService,
    updateSliderService,
    updateSliderPost,
    getAllSliders,
    deleteSliderService,
    findSliderByIdService
}
