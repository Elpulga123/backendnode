import passport from 'passport';
import passportLocal from 'passport-local';
import { userModel } from '../../userModel';
import { Transuccess, Tranerrors } from '../../../../lang/vi';

let LocalStrategy = passportLocal.Strategy;
export let initPassportLocal = () => {
    passport.use(new LocalStrategy(
        {
            usernameFeild : 'username', // 2 trường này lấy từ giao diện người dùng
            passwordField : 'password',
            // lệnh này cho phép đưa req vào.
            passReqToCallback: true
        },
        async (req, username, password, done) => {
        try {
            let user = await userModel.findByEmail(username);
            if (!user) {
                return done(null, false, req.flash("Errors", Tranerrors.login_failed));
            }
            if(!user.local.isActive){
                return done(null, false, Tranerrors.account_notActive);
            }
            let checkpassword = await user.comparePassword(password);

            if (!checkpassword) {
                return done(null, false, req.flash("Errors", Tranerrors.login_failed));
            }
            // nếu tất cả ok thì trả vể user cho sesstion
            return done(null, user, req.flash(Transuccess.Login_success));
        } catch (error) {
            console.log(error);
            return done(null, false, req.flash("Errors", Tranerrors.server_error));
        }
    }
    
    ));

    // trường hợp xác thực thành công thì mã hóa đưa vào session.
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
         userModel.findUserById(id)
         .then(user => {
             return done(null, user);
        }).catch(error => {
             return done(error, null);
         })
    });
}

module.exports = {
    initPassportLocal
}