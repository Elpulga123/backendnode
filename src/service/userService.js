import {userModel} from '../modal/userModel';

// update user  infomation.
let updateUserService = (id, item) => {
    // promise trả về 
    return userModel.UpdateUser(id, item);
}
export {updateUserService}