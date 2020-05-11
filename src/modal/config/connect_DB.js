import mongoose from 'mongoose';
import blueBird from 'bluebird';
import dotenv from 'dotenv';

dotenv.config();

let connectDb = () => {
    mongoose.Promise = blueBird;
    let URL = `${process.env.DB_CONNECION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    mongoose.set('useFindAndModify', false);
    return mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology : true});
};
module.exports = connectDb;