import session from "express-session";
import connectMongo from 'connect-mongo';


let MongoStore = connectMongo(session);
let sessionStore = new MongoStore({
    url : `${process.env.DB_CONNECION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    autoReconnect : true, // tự động kết nối.
    autoRemove : "native" // tự động xóa dữ liệu trong mongo sau khi sestion kết thúc

})

// a sesstion need a store to save data sesstion
let configSesstion = (app) => {
    app.use(session({
        secret: 'keyboard cat',
        store : sessionStore,
        resave: false,
        saveUninitialized: true,
        cookie : {maxAge : 1000*60*60*24} // 1 ngày
    }))
}
module.exports = configSesstion;