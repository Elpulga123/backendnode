let tranvalidation_register = {
    email_incorrect: 'Vui lòng nhập email theo đúng cú pháp example@gmail.com',
    gender_incorrect: 'Vui lòng chọn giới tính',
    password_incorrect: "Password bao gồm số và chữ viết hoa và phải hơn 6 số !",
    password_confirm_incorrect: "password nhập lại phải giống với password bên trên !"
}

let Transuccess = {
    user_created: function (username) {
        return `Chào mừng ${username}, Đăng ký tài khoản thành công !`;
    },
    account_remind_active : 'Vui lòng vào email để kích hoạt tài khoản',
    account_actived : 'Kích hoạt tài khoản thành công, bạn có thể đăng nhập vào ứng dụng',
    logout_success : 'Đăng xuất thành công !',
    user_updated : 'Cập nhật thành công',


    product_updated : 'Cập nhật sản phẩm thành công',
}

let TranProductSuccess = {
    createNewSuccess : 'Thêm mới sản phẩm thành công !',
    deleteProducts : 'Xóa sản phẩm thành công !',
    editSuccess : 'Sửa sản phẩm thành công !'
}
let Tranerrors = {
    user_created_errors: 'Đăng ký lỗi !',
    user_email_inuse: 'Email này đã được sử dụng, vui lòng kiểm tra nếu chưa kích hoạt',
    account_removed: 'Tài khoản email này đã bị khóa và xóa khỏi hệ thống, vui lòng liên hệ bộ phận hỗ trợ.',
    account_notActive: 'Email này đã được đăng ký nhưng chưa kích hoạt, vui lòng kiểm tra email để kích hoạt tài khoản.',
    account_undefind : "Token không tồn tại !",
    login_failed : 'Mật khẩu hoặc tài khoản không đúng',
    server_error : 'Server lỗi !',
    Login_success : 'Đăng nhập thành công !'
}

let tranMail = {
    subject: "Funny chat : Xác nhận tài khoản !",
    template: (linkverify) => {
        return `<h2> Bạn nhận được email này và đã đăng ký tài khoản trên ứng dụng Funny chat. </h2>
        <h3> Vui lòng click vào liên kết bên dưới để kích hoạt tài khoản. </h3>
        <h3> <a href="${linkverify}" target=""blank> ${linkverify} </h3>
        <p> Nếu tin rằng email này là nhầm lẫn, hãy bỏ qua nó ! </p>`
    },
    send_failed: "Có lỗi, vui lòng liên hệ vơi bộ phận hỗ trợ để được giúp đỡ !"
}

module.exports = {
    tranvalidation_register,
    Transuccess,
    Tranerrors,
    tranMail,
    TranProductSuccess
}

