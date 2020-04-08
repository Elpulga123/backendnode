import { validationResult } from "express-validator";
import userService from '../../service';
import { app } from '../config/app';
import { Transuccess } from '../../../lang/vi';// login authencation
import uuid4 from 'uuidv4';
import multer from 'multer';
import fsExtras from 'fs-extra';
import {userModel} from '../userModel';


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // đưa đường dẫn chính xác để có thể update dữ liệu
        cb(null, app.directory_auth);
    },
    filename: function (req, file, cb) {
        let match = app.avatar_type;
         if(match.indexOf(file.mimetype) === -1){
             return cb(error, null);
         }
        // để tránh trùng tên thì cho thêm uuid và trùng thời gian thì dùng Date.Now();
        let fileName = `${file.fieldname}-${uuid4()}-${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
})

// hàm
var avatarUploadFile = multer({ storage: storage }).single('avatar');

let updateUserAvatar = (req, res, next) => {
    avatarUploadFile(req, res,  async(error) => {
        try {
            if (req.file) {
                let userUpdate = {
                    avatar : req.file.filename,
                    updateAt : Date.now()
                }
                // Cập nhật sư, cập nhật hình ảnh và đường dẫn.
                let olduser = await userModel.findUserById(req.user._id);
                let userOldAvatar = olduser.avatar; // Path to delete avatar update
                let userupdate = await userService.updateUserService(req.user._id, userUpdate);
                await fsExtras.remove(`${app.directory_auth}/${userOldAvatar}`);

                let result = {
                    message: Transuccess.user_updated,
                    imageSrc : req.file.filename
                }
                   
                return res.status(200).send(result);
            }
            return res.status(500).send(error);

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        // Everything went fine.
    })
}

let updateUserdata = async (req, res, next) => {
    try {
        let userItem = req.body;
        //req.user._id được lưu ở session khi đăng nhập
        let userupdate = await userService.updateUserService(req.user._id, userItem);
        let result = {
            message: Transuccess.user_updated
        }
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
module.exports = {
    updateUserdata,
    updateUserAvatar
}