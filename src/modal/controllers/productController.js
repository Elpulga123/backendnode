import service from '../../service';
import { app } from '../config/app';
import { TranProductSuccess } from '../../../lang/vi';// login authencation
import uuid4 from 'uuidv4';
import multer from 'multer';
import sharp from 'sharp';
import { Transuccess } from '../../../lang/vi';// login authencation
import fsExtras, { copySync } from 'fs-extra';
import fs from 'fs';
import { productsModel } from '../productModel';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // đưa đường dẫn chính xác để có thể update dữ liệu
        cb(null, app.directory_products);
    },
    filename: function (req, file, cb) {
        let match = app.avatar_type;
        if (match.indexOf(file.mimetype) === -1) {
            return cb(error, null);
        }
        // để tránh trùng tên thì cho thêm uuid và trùng thời gian thì dùng Date.Now();
        //let fileName = `${file.fieldname}-${uuid4()}-${Date.now()}-${file.originalname}`;
        let fileName = file.originalname;
        cb(null, fileName);
    }
})

var productUploadFile = multer({ storage: storage }).any('file', 10);
var productUpdateFile = multer({ storage: storage }).single('product-image', 1);

// Thêm thông tin sản phẩm
let addProduct = (req, res, next) => {

    let productItem = {};
    let successArr = [];

    productUploadFile(req, res, async (error) => {
        try {

            var image = req.body.image_path.split(",");
            productItem.image = image;
            productItem.name = req.body.product_name;
            productItem.price = req.body.product_price;
            productItem.count = req.body.product_count;
            productItem.brand = req.body.product_brand;
            productItem.describes = req.body.propduct_describes;
            productItem.status = true;

            // req.user._id được lưu ở session khi đăng nhập
            let addProducts = await service.addProductService(productItem);
            successArr.push(TranProductSuccess.createNewSuccess);
            req.flash('Success', successArr);
            return res.redirect('/admin');

        } catch (error) {
            console.log(error);
            return res.status(500).send('Lôi');
        }
    })
}

// Thêm hình ảnh sản phẩm
let addProductImage = (req, res, next) => {
    productUploadFile(req, res, (error) => {

        try {

            // thực hiện báo về cho protend;
            req.files.map(async (file) => {
                // đường dẫn lưu ảnh
                try {
                    await sharp(file.path).resize(290, 385).toBuffer(function (err, buffer) {
                        fs.writeFile(file.path, buffer, function (e) {
                        });
                    });
                } catch (e) {
                    console.error(e);
                }
            })

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }

    })
}



// thêm hình ảnh khi chỉnh sửa
let editAddProductImage = (req, res, next) => {
    productUploadFile(req, res, (error) => {
        try {
            // thực hiện báo về cho protend;
            req.files.map(async (file) => {
                // đường dẫn lưu ảnh
                try {
                    await sharp(file.path).resize(290, 385).toBuffer(function (err, buffer) {
                        fs.writeFile(file.path, buffer, function (e) {
                        });
                    });
                } catch (e) {
                    console.error(e);
                }
            })

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })
}


// chỉnh sửa thông tin sản phẩm
let editProduct = async (req, res, next) => {
    let successArr = [];

    try {
        let productEdit = await service.updateProductService(req.params.id);
        successArr.push(TranProductSuccess.editSuccess);
        req.flash('Success', successArr);
        res.render('main/product/edit-product', {
            title: 'Danh sách Sản phẩm',
            errors: req.flash('Errors'),
            success: req.flash('Success'),
            user: req.user,
            product: productEdit
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

// chuyển qua trang thêm sản phẩm   
let addProductGet = async (req, res, next) => {
    try {
        res.render('main/product/add_product', {
            title: 'Thêm sản phẩm',
            errors: req.flash('Errors'),
            success: req.flash('Success'),
            user: req.user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

// chỉnh sửa thông tin sản phẩm phía server
let editProductPost = (req, res, next) => {
    let productItem = {};
    productUploadFile(req, res, async (error) => {
        try {
            productItem.name = req.body.product_name;
            productItem.price = req.body.product_price;
            productItem.count = req.body.product_count;
            productItem.brand = req.body.product_brand;
            productItem.count = req.body.product_count;
            productItem.describes = req.body.propduct_describes;

            // tìm phần tử và cập nhật đường dẫn;
            let productEdit = await service.findProductByIdService(req.params.id);
            productItem.image = productEdit.image;

            if (req.body.image_path) {
                var image = req.body.image_path.split(",");
                for (var index = 0; index < image.length; index++) {
                    productItem.image.push(image[index]);
                }
            }

            if (req.body.product_count < 1) {
                productItem.status = false;
            }

            productItem.status = true;
            // nếu có thay đổi hình ảnh thì vào đây.
            productItem.updateAt = Date.now();
            // Cập nhật sư, cập nhật hình ảnh và đường dẫn.

            let productUpdate = await service.updateProductPost(req.params.id, productItem);
            return res.redirect('/admin/products');


        } catch (error) {
            console.log(error);
            return res.status(500).send('Lôi');
        }
    })
}

// thực hiện update hình ảnh đã được chọn
let updateProductImage = (req, res, next) => {
    productUpdateFile(req, res, async (error) => {
        try {
            if (req.file) {

                await sharp(req.file.path).resize(290, 385).toBuffer(function (err, buffer) {
                    fs.writeFile(req.file.path, buffer, function (e) {
                    });
                });
                // Cập nhật sư, cập nhật hình ảnh và đường dẫn.
                let oldproduct = await productsModel.findProductById(req.params.id);
                oldproduct.image[req.body.index] = req.file.filename;
                oldproduct.updateAt = Date.now();
                let userOldImage = oldproduct.image[req.body.index]; // Path to delete avatar update
                let userupdate = await service.updateProductImageService(req.params.id, oldproduct);
                await fsExtras.remove(`${app.directory_product}/${userOldImage}`);

                let result = {
                    message: Transuccess.product_updated,
                    imageSrc: req.file.filename
                }
                return res.status(200).send(result);

            } else {
                console.log('không có kết quả !');
            }
            return res.status(500).send(error);

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        // Everything went fine.
    })
}

let getAllProduct = async (req, res, next) => {

    try {
        let products = await service.getAllProducts();
        res.render('main/product/products', {
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

// Xóa cụ thể hình ảnh sản phẩm
let deleteProductImage = async (req, res, next) => {
    let successArr = [];
    try {

        let id = req.param('id')
        let index = req.param('index');

        let oldproduct = await service.findProductByIdService(id);
        oldproduct.image.splice(index, 1);
        let delete_image = oldproduct.image[index];

        let productUpdate = await service.updateProductImageService(id, oldproduct);
        await fsExtras.remove(`${app.directory_products}/${oldproduct.image[index]}`);



        successArr.push(TranProductSuccess.deleteProducts);
        req.flash('Success', successArr);
        return res.redirect('/admin/product/edit_product/' + id);


    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

// delete Products controller
let deleteProduct = async (req, res, next) => {
    let successArr = [];
    try {

        console.log(req.params.id);

        let productDelete = await service.deleteProductService(req.params.id);
        // successArr.push(TranProductSuccess.deleteProducts);
        // req.flash('Success', successArr);
        // return res.redirect('/admin');

    } catch (error) {
        console.log(error);
        return res.status(500).send('Lôi');
    }
}

module.exports = {
    addProduct,
    editProduct,
    editProductPost,
    deleteProduct,
    getAllProduct,
    addProductImage,
    updateProductImage,
    editAddProductImage,
    addProductGet,
    deleteProductImage
}