import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import {initRoutesBackend, initRoutesFrontend} from './src/routes/web';
import configViewEngine from './src/modal/config/viewEngine';
import connectDB from './src/modal/config/connect_DB';
import connectFlash from 'connect-flash';
import configSesstion from './src/modal/config/sesstion';
import dotenv from 'dotenv';
import passport from 'passport';
import admin from './src/routes/admin';


// env config Global
dotenv.config();

var app = express();
// sesstion config
configSesstion(app);
// viewengine setup
configViewEngine(app);
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(connectFlash());
// config session
configSesstion(app);
// khai báo xử dụng passport
app.use(passport.initialize())
app.use(passport.session());

//initRoutes(app);
initRoutesFrontend(app);
app.use('/admin', admin);
app.use(function(req, res, next){
  res.status(404).render('frontend/sections/404.ejs');
});

//initRoutes end;


//connect to DB
connectDB().then(() => {
  console.log('kết nối database thành công !')
}).catch(error => console.log(error));


app.listen(process.env.PORT, function () {
  console.log(`Server is running on...${process.env.PORT}`);
})

module.exports = app;
