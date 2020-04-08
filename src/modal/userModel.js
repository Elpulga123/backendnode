import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
let Schema = mongoose.Schema;
var UserSchema = new Schema({
    userName: String,
    gender: { type: String, default: 'male' },
    phone: { type: Number, default: null },
    address: { type: String, default: null },
    avatar: { type: String, default: 'avatar-4.jpg' },
    major : {type : String, default : 'Other'},
    role: { type: String, default: "user" },
    local: {
        email: { type: String, trim: true },
        password: String,
        isActive: { type: Boolean, default: false },
        verifyToken: String
    },
    facebook: {
        uid: String,
        tokenId: String,
        email: { type: String, trim: true }
    },
    google: {
        uid: String,
        tokenId: String,
        email: { type: String, trim: true }
    },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    deletaAt: { type: Date, default: Date.now }
});


UserSchema.statics = {
    // sử dụng phương thức statics của mongodb
    // có 2 cách : dùng thuộc tính của Schema.statics = {} hoặc call.Shema.static().
    // định nghĩa các hàm overide cú pháp
    createNew(item) {
        return this.create(item); // phương thức này tự động mongoose.promise trả vể 1 resovle.
    },
    findUserById(id){
        return this.findById(id).exec();
      },
    findByEmail(email) {
        return this.findOne({ "local.email": email }).exec();
    }, 
    removeId(id){
        return this.findOneAndRemove(id).exec();
    },
    finByToken(token){
        return this.findOne({"local.verifyToken": token}).exec();
    },
    verifyToken(token){
        return this.findOneAndUpdate(
        {"local.verifyToken" : token},
        {"local.isActive" : true, "local.verifyToken" : null})
        .exec();
    },
    UpdateUser(id, item){
        return this.findByIdAndUpdate(id, item).exec();
    }
}
UserSchema.methods = {
    comparePassword(password){
        return bcrypt.compare(password, this.local.password);
    }
}

const userModel = mongoose.model('users', UserSchema);
export { userModel }