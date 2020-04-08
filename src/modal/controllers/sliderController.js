import service from '../../service';
import { app } from '../config/app';
import { TranProductSuccess } from '../../../lang/vi';// login authencation
import uuid4 from 'uuidv4';
import multer from 'multer';
import fsExtras from 'fs-extra';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // đưa đường dẫn chính xác để có thể update dữ liệu
        cb(null, app.directory_sliders);
    },
    filename: function (req, file, cb) {
        let match = app.avatar_type;
        if (match.indexOf(file.mimetype) === -1) {
            return cb(error, null);
        }
        // để tránh trùng tên thì cho thêm uuid và trùng thời gian thì dùng Date.Now();
        let fileName = `${file.fieldname}-${uuid4()}-${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
})

var sliderUploadFile = multer({ storage: storage }).single('slider-image');
// addproduct controller.
let addSlider = (req, res, next) => {

    let slider = {};
    let successArr = [];
    sliderUploadFile(req, res, async (error) => {

        try {
            slider.smallCaption = req.body.slider_smallcaption;
            slider.bigCaption = req.body.slider_bigcaption;

            // nếu có upload file ảnh lên thì vào đây
            if (req.file) {
                slider.image = req.file.filename;
            }
            // req.user._id được lưu ở session khi đăng nhập
            let addSliderImage = await service.addSliderService(slider);
            successArr.push(TranProductSuccess.createNewSuccess);
            req.flash('Success', successArr);
            return res.redirect('/admin/sliders');

        } catch (error) {
            console.log(error);
            return res.status(500).send('Lôi');
        }
        // Everything went fine.
    })
}

let editSlider = async (req, res, next) => {
    let successArr = [];
    try {
        let sliderEdit = await service.updateSliderService(req.params.id);
        successArr.push(TranProductSuccess.editSuccess);
        req.flash('Success', successArr);
        res.render('main/sliders/edit_slider', {
            title: 'Chỉnh sửa slider',
            errors: req.flash('Errors'),
            success: req.flash('Success'),
            user: req.user,
            slider: sliderEdit
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

let editSliderPost = (req, res, next) => {
    let sliderItem = {};
    sliderUploadFile(req, res, async (error) => {

        try {
            
            sliderItem.bigCaption = req.body.slider_bigCaption;
            sliderItem.smallCaption = req.body.slider_smallCaption;

            // nếu có thay đổi hình ảnh thì vào đây.
            if (req.file) {

                sliderItem.image = req.file.filename;
                sliderItem.updateAt = Date.now();

                // Cập nhật sư, cập nhật hình ảnh và đường dẫn.
                let oldProduct = await service.findSliderByIdService(req.params.id);
                let sliderOldImage = oldProduct.image; // Path to delete avatar update
                await fsExtras.remove(`${app.directory_sliders}/${sliderOldImage}`);
            }
            console.log(sliderItem)
            let sliderUpdate = await service.updateSliderPost(req.params.id, sliderItem);
            return res.redirect('/admin/sliders');

        } catch (error) {
            console.log(error);
            return res.status(500).send('Lôi');
        }
    })
}

let getAllSliders = async (req, res, next) => {
    try {
        let Sliders = await service.getAllSliders();
        res.render('main/sliders/sliders', {
            title: 'Danh sách Slider',
            errors: req.flash('Errors'),
            success: req.flash('Success'),
            user: req.user,
            Sliders: Sliders
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

// delete Products controller
let deleteSlider = async (req, res, next) => {
    let successArr = [];
    
    try {
        let sliderDelete = await service.deleteSliderService(req.params.id);
        successArr.push(TranProductSuccess.deleteProducts);
        req.flash('Success', successArr);
        return res.redirect('/admin/sliders');

    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

module.exports = {
    addSlider,
    getAllSliders,
    editSlider,
    editSliderPost,
    deleteSlider
}