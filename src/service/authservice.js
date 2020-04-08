import bcrypt from 'bcrypt';
import { userModel } from '../modal/userModel';
import uuidv4 from 'uuidv4';
import { Transuccess, Tranerrors, tranMail } from '../../lang/vi';
import { sendMailAdmin } from '../modal/config/mailer';
import nodeMailer from 'nodemailer';


const saltRounds = 10;
let register_service = (email, gender, password, protocol, host) => {
    // protocol to send the email protocol.
    return new Promise(async (resolve, reject) => {
        try {
            // kiểm tra trong server xem đã có email này đăng ký chưa
            let user_check_email_use = await userModel.findByEmail(email);
            if (user_check_email_use) {
                if (user_check_email_use.deleteAt != null) {
                    return reject(Tranerrors.accout_removed);
                } else if (!user_check_email_use.local.isActive) {
                    return reject(Tranerrors.accout_notActive);// kiểm tra tài khoản đã đăng ký nhưng chưa active.
                }
                return reject(Tranerrors.user_email_inuse);
            }
            // lấy thông tin user
            var salt = bcrypt.genSaltSync(saltRounds);
            let userItem = {
                userName: email.split('@')[0],
                gender: gender,
                email: email,
                local: {
                    email: email,
                    password: bcrypt.hashSync(password, salt),
                    verifyToken: uuidv4()
                }
            }
            // sau khi validation frontend thì chuyển sáng server
            // thêm user vào backend làm việc với Server
            let user = await userModel.createNew(userItem);
            // link verify cho email
            let linkVerify = `${protocol}://${host}/admin/verify/${user.local.verifyToken}`;
            let adminMailer = process.env.MAILER_EMAIL;
            let adminPassword = process.env.MAILER_PASSWORD;
            let adminHost = process.env.MAILER_HOST;
            let adminPort = process.env.MAILER_PORT;

            let transporter = nodeMailer.createTransport({
                host: adminHost,
                port: adminPort,
                secure: true, //ẻ use SSL - TLS.
                auth: {
                    user: adminMailer, // Điền Email của Admin.
                    pass: adminPassword // Password email của admin.
                },
                tls: {
                    // từ chối nhận diện
                    rejectUnauthorized: false
                }
            });

            let options = {
                from: email,
                to: email,
                subject: tranMail.subject,
                html: tranMail.template(linkVerify)
            }
            // Sendmail
            await transporter.sendMail(options)
                .then((success) => {
                    resolve(Transuccess.account_remind_active)
                })
                .catch((error) => {
                    // trường hợp xảy ra xác thực lỗi thì delete user đó
                    userModel.removeId(user._id);
                    reject(tranMail.send_failed);
                });
            // Senmail / end

            return resolve(Transuccess.user_created(user.local.email));

        } catch (error) {
            console.log('caught', error);
        }
    })
}


let veryfiAccount = (token) => {

    return new Promise(async (resolve, reject) => {
        try {
            
            let userVerify = await userModel.finByToken(token);
            if (!userVerify) {
                reject(Tranerrors.account_undefind);
            }
            await userModel.verifyToken(token);
            resolve(Transuccess.account_actived);
        } catch (error) {
            console.log('caught', error);
        }
    })
}


module.exports = {
    register_service,
    veryfiAccount
}