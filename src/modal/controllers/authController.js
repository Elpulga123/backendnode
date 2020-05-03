import { validationResult } from "express-validator";
import { register_service, veryfiAccount } from '../../service';
import { Transuccess, Tranerrors } from '../../../lang/vi';
// login authencation
let loginController = (req, res, next) => {
    res.render('auth/login/login', {
        title: 'Đăng nhập',
        errors: req.flash('Errors'),
        success: req.flash('Success')
    })
}
// Login authencation / end
// Register Authencation
let getRegisterController = (req, res, next) => {
    res.render('auth/register/register', {
        title: 'Đăng nhập',
        errors: req.flash('Errors'),
        success: req.flash('Success')
    })
}

let getPostRegisterController = async (req, res, next) => {
    // return lisr data form
    let validationError = validationResult(req);
    var arrayError = [],
        successArr = []; // đẩy lối về cho người dùng bên client server

    if (!validationError.isEmpty()) {
        // khi có lỗi
        let errors = validationError.mapped(); // return object
        const errorsArr = Object.values(errors);
        errorsArr.forEach((item) => {
            arrayError.push(item.msg); // add vào mảng lỗi
        })
        // đửa lỗi vào đưa vào Flash
        req.flash("Errors", arrayError);
        return res.redirect('/admin/register');
    }
    try {

        let createUserSuccess = await register_service(req.body.email, req.body.gender, req.body.password, req.protocol, req.get('host'));
        // đăng ký thành công thì trả về cho khách hàng 1 status
        successArr.push(createUserSuccess);
        console.log(createUserSuccess);
        req.flash('Success', successArr);
        return res.redirect('/admin/login');

    } catch (error) {
        arrayError.push(error);
        console.log(error);
        req.flash('Errors', arrayError);
        return res.redirect("/admin/register");
    }

}

let verifyToken = async (req, res, next) => {

    // khai báo mảng lỗi và thành công.
    var arrayError = [],
        successArr = []; // đẩy trạng thái thành công về cho người dùng bên client server
    try {
        let veriFyStatus = await veryfiAccount(req.params.token); // truyền đến service để thực hiện hành động với database.
        successArr.push(veriFyStatus); // thêm trạng thái vào cho mảng success hiển thị ra cho người dùng.
        req.flash('Success', successArr); // lưu vào sections
        return res.redirect('/admin/login');

    } catch (error) {
        arrayError.push(error);
        console.log(error);
        req.flash("Errors", arrayError);
        return res.redirect("/admin/login");
    }
}


let getLogout = (req, res, next) => {
    req.logout(); // hàm được hỗ trợ bởi passport
    req.flash('Success', Transuccess.logout_success);
    res.redirect('/admin/login');
}

let checkloggedIn = (req, res, next) => {
    // hàm Authenticated là hàm của passport.
    if (!req.isAuthenticated()) {
        return res.redirect("/admin/login");
    }
    next(); // hàm next() chuyển sang function tiếp theo.
}

let checkloggedOut = (req, res, next) => {
    // hàm Authenticated là hàm của passport.
    if (req.isAuthenticated()) {
        return res.redirect("/admin");
    }
    next();
}

module.exports = {
    loginController,
    getPostRegisterController,
    getRegisterController,
    verifyToken,
    getLogout,
    checkloggedIn,
    checkloggedOut
}