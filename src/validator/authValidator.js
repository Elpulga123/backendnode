import {check} from 'express-validator';
import {tranvalidation_register} from '../../lang/vi';

let validateRegister = [
    check('email', tranvalidation_register.email_incorrect).isEmail().trim(),
    check('gender', tranvalidation_register.gender_incorrect).isIn(["male", "female"]),
    check('password', tranvalidation_register.password_incorrect).isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/),
    check('password_confirmation', tranvalidation_register.password_confirm_incorrect).custom((value, { req }) => { return value == req.body.password }),
]

module.exports = {
    validateRegister
}
 